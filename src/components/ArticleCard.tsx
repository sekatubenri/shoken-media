import Link from 'next/link'
import type { Article } from '@/lib/articles'

const CATEGORY_STYLES: Record<string, { bg: string; icon: string; iconBg: string }> = {
  shoken: { bg: 'from-green-600 to-emerald-700', icon: '📈', iconBg: 'bg-white/20' },
  fx: { bg: 'from-blue-600 to-indigo-700', icon: '💱', iconBg: 'bg-white/20' },
  nisa: { bg: 'from-purple-600 to-violet-700', icon: '🏦', iconBg: 'bg-white/20' },
  beginner: { bg: 'from-orange-500 to-amber-600', icon: '🌱', iconBg: 'bg-white/20' },
}

export default function ArticleCard({ article }: { article: Article }) {
  const style = CATEGORY_STYLES[article.category] || CATEGORY_STYLES.shoken

  return (
    <Link
      href={`/article/${article.slug}`}
      className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className={`bg-gradient-to-br ${style.bg} h-40 flex flex-col items-center justify-center p-4 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-6 -translate-x-6" />
        <div className={`${style.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center mb-2`}>
          <span className="text-3xl">{style.icon}</span>
        </div>
        <span className="text-white/90 text-xs font-medium">{article.categoryLabel}</span>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-gray-900 text-sm leading-relaxed mb-3 line-clamp-3 group-hover:text-green-700 transition-colors">
          {article.title}
        </h3>
        <p className="text-xs text-gray-400">{article.date}</p>
      </div>
    </Link>
  )
}
