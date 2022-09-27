import * as React from "react"
import { Link } from "gatsby"
import kebabCase from "lodash/kebabCase"
import JobLayout from "../components/jobLayout"
import { WithSearch, Results, PagingInfo, ResultsPerPage, Paging, Facet, Sorting } from "@elastic/react-search-ui"
import { CalendarIcon, Squares2X2Icon, UsersIcon, ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid'
import SortControl from "../components/sortControl"
import CheckboxFacet from "../components/checkboxFacet"

const sortOptions = [
  {
    name: "Relevance",
    value: "",
    direction: "",
  },
  {
    name: "Salary (High to Low)",
    value: "salary_range_to",
    direction: "desc",
  },
  {
    name: "Salary (Low to High)",
    value: "salary_range_from",
    direction: "asc",
  },
]

export default function SearchPage() {
  return (
    <JobLayout>
      <WithSearch mapContextToProps={({ wasSearched }) => ({ wasSearched })}>
        {({ wasSearched }) => {
          return (
            <div className="grid grid-cols-3 gap-20">
              <div>
                {wasSearched && <Sorting label={"Sort by"} sortOptions={sortOptions} view={(props) => <SortControl {...props} />} />}
                <Facet key={"1"} field={"category.keyword"} label={"Category"}view={(props) => <CheckboxFacet {...props} />} />
                <Facet key={"2"} field={"agency.keyword"} label={"Agency"} showSearch={true} view={(props) => <CheckboxFacet {...props} />} />
                <Facet key={"3"} field={"division_work_unit.keyword"} label={"Divison"} view={(props) => <CheckboxFacet {...props} />} />
              </div>
              <div className="col-span-2">
                <Results
                  shouldTrackClickThrough={true}
                  view={({ children }) => (
                    <div className="overflow-hidden bg-white shadow sm:rounded-md">
                      {wasSearched && (
                        <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
                          <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                            <div className="ml-4 mt-2">
                              <PagingInfo
                                view={({ searchTerm, start, end, totalResults }) => (
                                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                                    Showing <strong>{start} - {end}</strong> of {totalResults} results {searchTerm && <>for <span className="font-semibold">{searchTerm}</span></>}
                                  </h3>
                                )}
                              />
                            </div>
                            <div className="ml-4 mt-2 flex-shrink-0">
                              <ResultsPerPage
                                view={({ options, onChange, value }) => (
                                  <div className="flex items-center gap-2">
                                    <label htmlFor="show" className="text-sm font-medium text-gray-700">
                                      Show
                                    </label>
                                    <select
                                      id="show"
                                      name="show"
                                      className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                      defaultValue={value}
                                    >
                                      {options.map(value => (
                                        <option key={value} value={value}>
                                          {value}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                )}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      <ul className="divide-y divide-gray-200">
                        {children}
                      </ul>
                    </div>
                  )}
                  resultView={({ result, onClickLink }) => {
                    console.log(result)
                    return (
                      <li key={result.job_id.raw}>
                        <Link to={`/jobs/${kebabCase(result.business_title.raw)}-${result.job_id.raw}`} className="block hover:bg-gray-50">
                          <div className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                              <p className="truncate text-md font-medium text-indigo-600" dangerouslySetInnerHTML={{ __html: result.business_title.snippet || result.business_title.raw }} />
                            </div>
                            <div className="mt-2 sm:flex sm:justify-between">
                              <div className>
                                <p className="flex items-center text-sm text-gray-500">
                                  <UsersIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                  {result.agency.raw}
                                </p>
                                {result.category.raw.length > 0 && <p className="w-full mt-2 flex items-center text-sm text-gray-500">
                                  <Squares2X2Icon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                  <span>
                                    <span className="truncate">{result.category.raw.join(", ")}</span>
                                  </span>
                                </p>}
                                <p className="mt-2 flex items-center text-sm text-gray-500">
                                  <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                  Posted <time dateTime={result.posting_date.raw}>{result.posting_date.raw}</time>
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </li>
                    )

                  }}
                />
                <Paging
                  view={({ current, onChange, resultsPerPage, totalPages }) => {
                    return (
                      <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
                        <div className="-mt-px flex w-0 flex-1">
                          <a
                            href="#"
                            className="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                          >
                            <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                            Previous
                          </a>
                        </div>
                        <div className="hidden md:-mt-px md:flex">
                          <a
                            href="#"
                            className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                          >
                            1
                          </a>
                          {/* Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" */}
                          <a
                            href="#"
                            className="inline-flex items-center border-t-2 border-indigo-500 px-4 pt-4 text-sm font-medium text-indigo-600"
                            aria-current="page"
                          >
                            2
                          </a>
                          <a
                            href="#"
                            className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                          >
                            3
                          </a>
                          <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
                            ...
                          </span>
                          <a
                            href="#"
                            className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                          >
                            8
                          </a>
                          <a
                            href="#"
                            className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                          >
                            9
                          </a>
                          <a
                            href="#"
                            className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                          >
                            10
                          </a>
                        </div>
                        <div className="-mt-px flex w-0 flex-1 justify-end">
                          <a
                            href="#"
                            className="inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                          >
                            Next
                            <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                          </a>
                        </div>
                      </nav>
                    )
                  }}
                />
              </div>
            </div>
          )
        }}
      </WithSearch>
    </JobLayout>
  )
}


