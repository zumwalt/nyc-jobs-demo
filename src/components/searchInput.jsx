import React, { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'

export default function SearchInput({ getInputProps }) {
  const [inputFocused, setInputFocused] = useState(false)

  return (
    <>
      <div className="sui-search-box__wrapper w-full">
        <div className="relative mt-1 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <MagnifyingGlassIcon className={`h-6 w-6 ${inputFocused ? `text-blue-600` : `text-gray-400`}`} aria-hidden="true" />
          </div>
          <input
            type="text"
            {...getInputProps({
              className: "block w-full rounded-md border-gray-300 p-4 pl-14 focus:border-blue-500 focus:ring-blue-500",
              placeholder: "Search NYC Jobs...",
              onFocus: () => setInputFocused(true),
              onBlur: () => setInputFocused(false)
            })}
          />
        </div>
      </div>
    </>
  )
}