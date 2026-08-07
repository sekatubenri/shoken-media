import { getAllArticles } from '@/lib/articles'
import Link from 'next/link'
import ArticleCard from '@/components/ArticleCard'

const CATEGORIES = [
  { key: 'shoken', label: '証券口座', icon: '📈', desc: 'おすすめ証券口座を比較', color: 'from-green-500 to-emerald-600' },
  { key: 'fx', label: 'FX・外国為替', icon: '💱', desc: 'FX会社・スプレッド比較', color: 'from-blue-500 to-indigo-600' },
  { key: 'nisa', label: 'NISA・投資信託', icon: '🏦', desc: '非課税で資産を増やす', color: 'from-purple-500 to-violet-600' },
  { key: 'beginner', label: '投資初心者', icon: '🌱', desc: 'ゼロから始める投資', color: 'from-orange-500 to-amber-500' },
]

export default function Home() {
  const articles = getAllArticles()

  return (
    <div>
      <section className="bg-gradient-to-b from-green-700 to-green-800 text-white py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            証券・FX口座を比較して、<br className="md:hidden" />賢く資産運用しよう。
          </h1>
          <p className="text-green-100 text-lg md:text-xl max-w-2xl mx-auto">
            証券口座・FX・NISA・投資信託の比較情報を完全網羅。<br className="hidden md:block" />
            初心者でも安心して資産運用を始められます。
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.key}
              href={`/category/${cat.key}`}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all text-center group"
            >
              <div className={`bg-gradient-to-br ${cat.color} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3`}>
                <span className="text-xl">{cat.icon}</span>
              </div>
              <h3 className="font-bold text-sm text-gray-900 group-hover:text-green-700 transition-colors">{cat.label}</h3>
              <p className="text-xs text-gray-400 mt-1">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <span className="w-1 h-6 bg-green-700 rounded-full"></span>
          最新記事
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </div>
  )
}
