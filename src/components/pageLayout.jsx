import React from "react"
import Layout from './layout'

export default function PageLayout({ children, title, breadcrumbs, showSearch }) {
  return (
    <Layout showSearch={showSearch}>
      {title && (
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between w-full">
              {title}
            </div>
          </div>
        </header>
      )}
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </Layout>
  )
}
