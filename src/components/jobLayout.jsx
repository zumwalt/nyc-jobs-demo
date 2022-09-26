import React from "react"
import Layout from "./layout"
import Helmet from "react-helmet"
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'

export default function JobLayout({ children, title, breadcrumbs }) {
  return (
    <Layout>
      <Helmet htmlAttributes={{ class: 'h-full bg-gray-100' }} bodyAttributes={{ class: 'h-full' }} />
      <header className="bg-white shadow">
        {breadcrumbs && (
          <div className="mx-auto max-w-7xl pt-6 px-4 sm:px-6 lg:px-8">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-4">
                <li>
                  <div>
                    <a href="/" className="text-gray-600 hover:text-blue-700">
                      <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                      <span className="sr-only">Home</span>
                    </a>
                  </div>
                </li>
                {breadcrumbs.map((page) => (
                  <li key={page.name}>
                    <div className="flex items-center">
                      <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-300" aria-hidden="true" />
                      {page.current ? (
                        <span className="ml-4 text-sm font-medium text-gray-400" aria-current="page">
                          {page.name}
                        </span>
                      ) : (
                        <a href={page.href} className="ml-4 text-sm font-medium text-gray-600 hover:text-blue-700">
                          {page.name}
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        )}
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between w-full">
            {title}
          </div>

        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </Layout>
  )
}
