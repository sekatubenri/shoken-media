import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://shoken-select.com'),
  title: {
    default: '証券・FX比較ナビ｜証券口座・FX口座の徹底比較ガイド',
    template: '%s｜証券・FX比較ナビ',
  },
  description: '証券口座・FX口座を徹底比較。初心者向けの口座開設ガイド、NISA・投資信託の始め方まで、資産運用に必要な情報を完全網羅。',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: '証券・FX比較ナビ',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-gray-50 text-gray-900 antialiased min-h-screen flex flex-col">
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9320888355424356" crossOrigin="anonymous" strategy="afterInteractive" />
        <header className="border-b border-gray-200 sticky top-0 bg-white z-50 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <span className="bg-green-700 text-white text-sm font-bold px-2.5 py-1 rounded">証券</span>
              <span className="text-xl font-bold text-gray-900">FX比較ナビ</span>
            </a>
            <nav className="hidden md:flex gap-1 text-sm">
              <a href="/category/shoken" className="px-3 py-2 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-700 transition-colors">証券口座</a>
              <a href="/category/fx" className="px-3 py-2 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-700 transition-colors">FX</a>
              <a href="/category/nisa" className="px-3 py-2 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-700 transition-colors">NISA・投資信託</a>
              <a href="/category/beginner" className="px-3 py-2 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-700 transition-colors">投資初心者</a>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-5xl mx-auto px-4 py-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="bg-green-700 text-white text-xs font-bold px-2 py-0.5 rounded">証券</span>
                <span className="text-sm font-bold text-gray-900">FX比較ナビ</span>
              </div>
              <nav className="flex gap-6 text-xs text-gray-400">
                <a href="/category/shoken" className="hover:text-gray-600">証券口座</a>
                <a href="/category/fx" className="hover:text-gray-600">FX</a>
                <a href="/category/nisa" className="hover:text-gray-600">NISA</a>
              </nav>
            </div>
            <nav className="flex justify-center gap-6 text-xs text-gray-400 mt-4">
              <a href="/privacy" className="hover:text-gray-600">プライバシーポリシー</a>
              <a href="/contact" className="hover:text-gray-600">お問い合わせ</a>
            </nav>
            <p className="text-center text-xs text-gray-300 mt-4">© 2026 証券・FX比較ナビ All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
