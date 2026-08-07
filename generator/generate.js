const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SITE = {
  name: '証券・FX比較ナビ',
  url: 'https://shoken-select.com',
};

const AFFILIATE_TOP = `
<div style="background:#f0fdf4;border:2px solid #16a34a;border-radius:8px;padding:16px;margin:24px 0;">
  <p style="font-weight:bold;color:#14532d;margin:0 0 8px;">【PR】おすすめ証券・FX口座を今すぐ比較</p>
  <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;">
    <li style="color:#374151;font-size:14px;">※ 現在アフィリエイトリンクを準備中です。最新の比較情報は各証券会社・FX会社の公式サイトをご確認ください。</li>
  </ul>
</div>`;

const AFFILIATE_BOTTOM = `
<div style="background:#fffbeb;border:2px solid #d97706;border-radius:8px;padding:16px;margin:24px 0;">
  <p style="font-weight:bold;color:#92400e;margin:0 0 12px;">📚 投資・資産運用の参考書籍</p>
  <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;">
    <li><a href="https://www.amazon.co.jp/dp/4296115626?linkCode=ll2&tag=mirainikibouw-22&ref_=as_li_ss_tl" rel="nofollow" target="_blank" style="color:#1d4ed8;text-decoration:underline;">▶ 本当の自由を手に入れるお金の大学【Amazon】</a></li>
    <li><a href="https://www.amazon.co.jp/dp/4478114161?linkCode=ll2&tag=mirainikibouw-22&ref_=as_li_ss_tl" rel="nofollow" target="_blank" style="color:#1d4ed8;text-decoration:underline;">▶ バカでも稼げる「米国株」高配当投資【Amazon】</a></li>
  </ul>
</div>`;

async function generateArticle() {
  const topicsPath = path.join(__dirname, '..', 'unused-topics.json');
  const contentDir = path.join(__dirname, '..', 'content');

  fs.mkdirSync(contentDir, { recursive: true });
  const topics = JSON.parse(fs.readFileSync(topicsPath, 'utf-8'));
  const existingFiles = new Set(fs.readdirSync(contentDir));

  const topic = topics.find(t => !existingFiles.has(t.filename));
  if (!topic) {
    console.log('全トピック生成完了');
    process.exit(0);
  }

  console.log(`生成中: ${topic.title}`);

  const today = new Date().toISOString().split('T')[0];

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 6000,
    messages: [{
      role: 'user',
      content: `あなたは証券・FX比較メディア「${SITE.name}」の専門ライターです。
SEOに最適化された記事を生成してください。

トピック: ${topic.title}
カテゴリ: ${topic.category}

以下のJSON形式のみで出力してください（前後に余分なテキスト不要）:
{
  "title": "タイトル（SEO最適化、40〜60文字、年や具体的な数字を含める）",
  "description": "メタディスクリプション（120文字以内、検索意図に合わせる）",
  "category": "${topic.category}",
  "date": "${today}",
  "content": "HTMLコンテンツ"
}

contentの要件:
- 1500文字程度のHTML本文（簡潔にまとめること）
- h2見出しを3〜5個
- ul/liリスト、tableを活用
- 具体的な数値・手数料・スペックを含める
- JSON文字列として正しくエスケープ（"は\\"、改行は\\n）
- 必ずJSON全体を完結させること（途中で切れないこと）`
    }],
  });

  const text = message.content[0].text.trim();
  console.log('レスポンス先頭200文字:', text.slice(0, 200));

  const cleaned = text.replace(/```json\s*/g, '').replace(/```\s*/g, '');
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    console.error('全レスポンス:', text);
    throw new Error('レスポンスにJSONが見つかりません');
  }

  const article = JSON.parse(jsonMatch[0]);

  if (article.content.includes('<h2')) {
    article.content = article.content.replace('<h2', AFFILIATE_TOP + '<h2');
  } else {
    article.content = AFFILIATE_TOP + article.content;
  }
  article.content = article.content + AFFILIATE_BOTTOM;

  fs.writeFileSync(
    path.join(contentDir, topic.filename),
    JSON.stringify(article, null, 2)
  );

  const remaining = topics.filter(t => t.filename !== topic.filename);
  fs.writeFileSync(topicsPath, JSON.stringify(remaining, null, 2));

  console.log(`完了: ${topic.filename}`);
}

async function run() {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      await generateArticle();
      break;
    } catch (err) {
      console.error(`試行${attempt}回目失敗: ${err.message}`);
      if (attempt === 3) {
        console.error('3回失敗。このトピックをスキップします。');
        process.exit(0);
      }
      await new Promise(r => setTimeout(r, 3000));
    }
  }
}
run();
