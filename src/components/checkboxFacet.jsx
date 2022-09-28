import React from 'react'
import kebabCase from 'lodash/kebabCase'
import { PlusIcon, FunnelIcon } from '@heroicons/react/20/solid'
import pluralize from 'pluralize'

export default function CheckboxFacet(props) {
  const { 
    label, 
    options, 
    showMore, 
    onMoreClick, 
    showSearch, 
    onSearch,
    onRemove,
    onSelect
  } = props

  return (
    <>
      <fieldset className="mb-8">
        <legend className="text-lg font-medium text-gray-900">{label}</legend>
        {showSearch && 
          <div className="mt-5 mb-2">
            <label htmlFor="email" className="sr-only">
              Filter {pluralize(label)}
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FunnelIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                name="filter"
                id="filter"
                className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder={`Filter ${pluralize(label)}...`}
                onChange={(e) => {
                  onSearch(e.target.value)
                }}
              />
            </div>
          </div>
        }
        <div className="mt-4 divide-y divide-gray-200 border-t border-gray-200">
          {options.map((option, optionIdx) => (
            <div key={optionIdx} className="relative flex items-start py-4">
              <div className="ml-3 flex h-5 items-center">
                <input
                  id={`option-${kebabCase(label)}-${optionIdx}`}
                  name={`option-${kebabCase(label)}-${optionIdx}`}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  checked={option.selected}
                  onChange={() => (option.selected ? onRemove(option.value) : onSelect(option.value))}
                />
              </div>
              <div className="min-w-0 flex-1 text-sm flex items-center justify-between">
                <label htmlFor={`option-${optionIdx}`} className="w-full pl-3 select-none font-medium text-gray-700">
                  {option.value}
                </label>
                <span className="text-gray-400 font-sm">{option.count}</span>
              </div>
              
            </div>
          ))}
        </div>
        {showMore &&
          <button
            type="button"
            className="mt-2 w-full gap-2 flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={onMoreClick}
          >
            <PlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            Show More
          </button>
        }
      </fieldset>
    </>
  )
}