import React from "react"
import { ArrowUpLeftIcon } from '@heroicons/react/20/solid'
import { FaceFrownIcon  } from '@heroicons/react/24/outline'

const popularQueries = [
  'designer',
  'developer',
  'engineer',
  'social worker',
  'attorney'
]

export default function NoResults({ searchTerm, setSearchTerm }) {
  return (
    <div>
      <div className="flex-shrink-0 pt-8">
        <FaceFrownIcon className="mx-auto h-24 w-24 text-blue-600" aria-hidden="true" />
      </div>
      <div className="mx-auto max-w-xl py-8">
        <div className="text-center">
          <p className="text-base font-semibold text-blue-600">Bummer</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            We couldn't find any results for "{searchTerm}"
          </h1>
        </div>
        <div className="mt-12">
          <h2 className="text-base font-semibold text-gray-500">Popular searches</h2>
          <ul className="mt-4 divide-y divide-gray-200 border-t border-b border-gray-200">
            {popularQueries.map((query, queryIdx) => (
              <li key={queryIdx} className="relative flex items-start space-x-4 py-6">
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-medium text-gray-900">
                    <span className="rounded-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2">
                      <button className="focus:outline-none" onClick={() => setSearchTerm(query)}>
                        <span className="absolute inset-0" aria-hidden="true" />
                        {query}
                      </button>
                    </span>
                  </h3>
                </div>
                <div className="flex-shrink-0 self-center">
                  <ArrowUpLeftIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <a href="/" className="text-base font-medium text-blue-600 hover:text-blue-500">
              Or go back home
              <span aria-hidden="true"> &rarr</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
