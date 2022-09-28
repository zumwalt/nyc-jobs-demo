import React from "react"
import { Link } from "gatsby"
import kebabCase from "lodash/kebabCase"
import { WithSearch, SearchBox, Results, PagingInfo, ResultsPerPage, Paging, Facet, Sorting } from "@elastic/react-search-ui"
import { CalendarIcon, Squares2X2Icon, UsersIcon } from '@heroicons/react/20/solid'

import JobLayout from "../components/jobLayout"
import SortControl from "../components/sortControl"
import CheckboxFacet from "../components/checkboxFacet"
import JobTypeFacet from "../components/jobTypeFacet"
import SearchInput from "../components/searchInput"
import NoResults from "../components/noResults"
import Pagination from "../components/pagination"
import { niceDate } from "../utils/helpers"

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
    <JobLayout
      title={
        <div className="w-full">
          <SearchBox
            className="w-full"
            autocompleteSuggestions={false}
            searchAsYouType={true}
            inputView={(props) => <SearchInput getInputProps={props.getInputProps} />}
          />
        </div>
      }
      showSearch={false}
    >
      <WithSearch mapContextToProps={({ wasSearched, setSearchTerm, totalResults, searchTerm, setCurrent }) => ({ wasSearched, setSearchTerm, totalResults, searchTerm, setCurrent })}>
        {({ wasSearched, setSearchTerm, totalResults, searchTerm, setCurrent }) => {
          return (
            <>
              {wasSearched && totalResults === 0 && <NoResults searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
              {totalResults > 0 && (
                <div className="grid grid-cols-3 gap-x-20">
                  <div>
                    {wasSearched && <Sorting label={"Sort by"} sortOptions={sortOptions} view={(props) => <SortControl {...props} />} />}
                    <Facet key={"4"} field={"full_time_part_time_indicator.keyword"} label={"Job Type"} view={(props) => <JobTypeFacet {...props} />} />
                    <Facet key={"1"} field={"category.keyword"} label={"Category"} showSearch={true} view={(props) => <CheckboxFacet {...props} />} />
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
                                        Showing {totalResults > end && <><strong>{start} - {end}</strong> of </>}{totalResults} results {searchTerm && <>for <span className="font-bold">{searchTerm}</span></>}
                                      </h3>
                                    )}
                                  />
                                </div>
                                <div className="ml-4 mt-2 flex-shrink-0">
                                  <ResultsPerPage
                                    view={(props) => {
                                      const { options, onChange, value } = props
                                      return (
                                        <div className="flex items-center gap-2">
                                          <label htmlFor="show" className="text-sm font-medium text-gray-700">
                                            Show
                                          </label>
                                          <select
                                            id="show"
                                            name="show"
                                            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                            defaultValue={value}
                                            onChange={(e) => onChange(e.target.value)}
                                          >
                                            {options.map(value => (
                                              <option key={value} value={value}>
                                                {value}
                                              </option>
                                            ))}
                                          </select>
                                        </div>
                                      )
                                    }}
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
                        return (
                          <li key={result.job_id.raw}>
                            <Link to={`/jobs/${kebabCase(result.business_title.raw)}-${result.job_id.raw}`} className="block hover:bg-gray-50">
                              <div className="px-4 py-4 sm:px-6">
                                <div className="flex items-center justify-between">
                                  <p className="truncate text-xl font-medium text-blue-600" dangerouslySetInnerHTML={{ __html: result.business_title.snippet || result.business_title.raw }} />
                                </div>
                                <div className="mt-2 sm:flex sm:justify-between">
                                  <div>
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
                                      Posted&nbsp<time dateTime={result.posting_date.raw}>{niceDate(result.posting_date.raw)}</time>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </li>
                        )
                      }}
                    />
                    <Paging view={(props) => props.totalPages > 1 && <Pagination totalResults={totalResults} setCurrent={setCurrent} {...props} />} />
                  </div>
                </div>
              )}
            </>
          )
        }}
      </WithSearch>
    </JobLayout>
  )
}

export function Head() {
  return (
    <>
      <title>Search Jobs | NYC Jobs</title>
      
    </>
  )
}