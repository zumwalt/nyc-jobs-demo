import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { PagingInfo } from '@elastic/react-search-ui'

import { usePagination, DOTS } from '../utils/usePagination'

export default function Pagination(props) {
  const {
    current: currentPage,
    totalPages,
    resultsPerPage,
    setCurrent,
    totalResults
  } = props

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrent(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrent(currentPage + 1)
    }
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const PaginationNav = () => {
    const pages = usePagination({
      currentPage,
      totalResults,
      resultsPerPage
    })

    return (
      <>
        <button
          disabled={totalPages === 1}
          onClick={() => handlePreviousPage()}
          className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        {pages.map((page) => <PaginationButton key={page} page={page} currentPage={currentPage} setCurrent={setCurrent} />)}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handleNextPage()}
          className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
          <span className="sr-only">Next</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </>
    )
  }

  const PaginationButton = ({ page, onClick }) => {
    const divider = page === DOTS
    return (
      <button
        onClick={divider ? null : () => setCurrent(page)}
        className={classNames(
          currentPage === page ? 'bg-indigo-50 border-indigo-500 text-indigo-600 z-10' : 'border-gray-300 text-gray-500 hover:bg-gray-50',
          'relative inline-flex items-center border text-sm font-medium bg-white px-4 py-2 focus:z-20'
        )}
      >
        {page}
      </button>
    )
  }

  return (
    <div className="sticky b-0 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          disabled={totalPages === 1}
          onClick={() => handlePreviousPage()}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handleNextPage()}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <PagingInfo
            view={({ start, end }) => (
              <p className="text-sm text-gray-700">
                Showing <strong>{start} - {end}</strong> of {totalResults} results
              </p>
            )}
          />
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            {<PaginationNav />}
          </nav>
        </div>
      </div>
    </div>
  )
}
