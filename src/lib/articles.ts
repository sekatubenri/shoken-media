import fs from 'fs'
import path from 'path'

export type Article = {
  slug: string
  title: string
  description: string
  category: string
  categoryLabel: string
  date: string
  content: string
}

const CATEGORY_LABELS: Record<string, string> = {
  shoken: '証券口座',
  fx: 'FX・外国為替',
  nisa: 'NISA・投資信託',
  beginner: '投資初心者',
}

export function getArticle(slug: string): Article | null {
  const filePath = path.join(process.cwd(), 'content', `${slug}.json`)
  if (!fs.existsSync(filePath)) return null
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  return { ...data, slug, categoryLabel: CATEGORY_LABELS[data.category] || data.category }
}

export function getAllArticles(): Article[] {
  const dir = path.join(process.cwd(), 'content')
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => getArticle(f.replace('.json', ''))!)
    .sort((a, b) => (b.date > a.date ? 1 : -1))
}

export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter(a => a.category === category)
}

export function getCategoryLabel(category: string): string {
  return CATEGORY_LABELS[category] || category
}
