import { getArticlesByCategory, getCategoryLabel } from '@/lib/articles'
import Link from 'next/link'
import type { Metadata } from 'next'
import ArticleCard from '@/components/ArticleCard'

type Props = { params: Promise<{ category: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const label = getCategoryLabel(category)
  return {
    title: `${label}の記事一覧`,
    description: `${label}に関する記事一覧。証券・FX投資に役立つ情報を掲載。`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const label = getCategoryLabel(category)
  const articles = getArticlesByCategory(category)

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
        <span className="w-1 h-6 bg-green-700 rounded-full"></span>
        {label}
      </h1>

      {articles.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">記事はまだありません。</p>
          <Link href="/" className="text-green-700 text-sm mt-4 inline-block hover:underline">← トップに戻る</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}

      <div className="mt-10">
        <Link href="/" className="text-green-700 text-sm font-medium hover:underline">← トップに戻る</Link>
      </div>
    </div>
  )
}
