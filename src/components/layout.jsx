import React, { Fragment } from "react"
import { navigate, Script, Link } from "gatsby"
import styled from "@emotion/styled"
import Helmet from "react-helmet"
import kebabCase from "lodash/kebabCase"
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

import Logo from "../components/logo"
import Footer from "../components/footer"

import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector"
import { SearchProvider, WithSearch, SearchBox } from "@elastic/react-search-ui"

const connector = new ElasticsearchAPIConnector({
  cloud: {
    id: process.env.GATSBY_ELASTIC_CLOUD_ID
  },
  apiKey: process.env.GATSBY_ELASTIC_API_KEY,
  index: process.env.GATSBY_ELASTIC_INDEX_NAME
})

const config = {
  searchQuery: {
    search_fields: {
      business_title: {
        weight: 3
      },
    },
    result_fields: {
      business_title: {
        snippet: {},
        raw: {}
      },
      agency: {
        snippet: {}
      },
      job_id: {
        raw: {}
      },
      posting_date: {
        raw: {}
      },
      category: {
        raw: {}
      }
    },
    disjunctiveFacets: ["category.keyword","agency.keyword","division_work_unit.keyword"],
    facets: {
      "category.keyword": { type: "value" },
      "agency.keyword": { type: "value" },
      "divison_work_unit.keyword": { type: "value" }
    }
  },
  autocompleteQuery: {
    results: {
      resultsPerPage: 5,
      search_fields: {
        "business_title.suggest": {
          weight: 3
        }
      },
      result_fields: {
        business_title: {
          snippet: {
            size: 100,
            fallback: true
          },
          raw: {}
        },
        job_id: {
          raw: {}
        }
      }
    },
    // suggestions: {
    //   types: {
    //     results: { fields: ["movie_completion"] }
    //   },
    //   size: 4
    // }
  },
  apiConnector: connector,
  alwaysSearchOnInitialLoad: true
}

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const navigation = [
  { name: 'Agencies', href: '/agencies/', current: false },
  { name: 'Categories', href: '/categories/', current: false },
]

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const AutocompleteItem = styled(Link)`
  em {
    font-style: normal;
    font-weight: 600;
  }
`

export default function Layout({ children, title, breadcrumbs, showSearch }) {
  return (
    <SearchProvider config={config}>
      <Script 
        id="analytics" 
        src={process.env.GATSBY_ELASTIC_BA_SCRIPT} 
        data-dsn={process.env.GATSBY_ELASTIC_BA_DSN}
        defer
      />
      <Helmet htmlAttributes={{ class: 'h-full bg-white' }} bodyAttributes={{ class: 'h-full' }}>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
      </Helmet>
      <WithSearch mapContextToProps={({ wasSearched }) => ({ wasSearched })}>
        {({ wasSearched }) => (
          <>
            <div className="min-h-full">
              <Disclosure as="nav" className="bg-blue-800">
                {({ open }) => (
                  <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                      <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center w-full">
                          <div className="flex-shrink-0">
                            <a href="/" className="flex items-center">
                              <Logo />
                              <span className="text-white text-3xl ml-4">Jobs</span>
                            </a>
                          </div>
                          <div className="hidden md:block">
                            <div className="ml-6 flex items-baseline space-x-2">
                              {navigation.map((item) => (
                                <a
                                  key={item.name}
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? 'bg-blue-600 text-white'
                                      : 'text-white hover:bg-blue-700 hover:text-white',
                                    'px-3 py-2 rounded-md text-sm font-medium'
                                  )}
                                  aria-current={item.current ? 'page' : undefined}
                                >
                                  {item.name}
                                </a>
                              ))}
                            </div>
                          </div>
                          <div className="ml-4 w-full">
                            <SearchBox
                              className="w-full"
                              autocompleteMinimumCharacters={3}
                              autocompleteResults={{
                                linkTarget: "_blank",
                                sectionTitle: "Results",
                                titleField: "business_title",
                                urlField: "url",
                                shouldTrackClickThrough: true
                              }}
                              autocompleteSuggestions={true}
                              debounceLength={0}
                              onSubmit={(query) => {
                                navigate(`/search/?q=${query}`)
                              }}
                              inputView={({ getAutocomplete, getInputProps }) => (
                                <>
                                  <div className="sui-search-box__wrapper w-full">
                                    <div className="relative mt-1 rounded-md shadow-sm">
                                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                      </div>
                                      <input type="text"
                                        {...getInputProps({
                                          className: "block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
                                          placeholder: "Search NYC Jobs...",
                                        })}
                                      />
                                      {getAutocomplete()}
                                    </div>
                                  </div>
                                </>
                              )}
                              autocompleteView={({ autocompletedResults, getItemProps }) => {
                                return (
                                  <div className="absolute top-[110%] left-0 right-0 overflow-hidden rounded-lg bg-white shadow-2xl z-50">
                                    <div className="px-6 py-4">
                                      <h2 className="text-xs font-medium mb-2 text-gray-500 uppercase tracking-widest">Results</h2>
                                      {autocompletedResults.map((result, i) => {
                                        return (
                                          <AutocompleteItem
                                            to={`/jobs/${kebabCase(result.business_title.raw)}-${result.job_id.raw}`}
                                            {...getItemProps({
                                              key: result.job_id.raw,
                                              item: result,
                                              className: "block p-2 -mx-2 rounded hover:text-blue-600 hover:bg-blue-100"
                                            })}
                                          >
                                            <span dangerouslySetInnerHTML={{ __html: result.business_title.snippet || result.business_title.raw }} />
                                          </AutocompleteItem>
                                        )
                                      })}
                                    </div>
                                  </div>
                                )
                              }}
                            />
                          </div>
                        </div>
                        <div className="hidden md:block">
                          <div className="ml-4 flex items-center md:ml-6">
                            {/* Profile dropdown */}
                            <Menu as="div" className="relative ml-3 flex-shrink-0">
                              <div>
                                <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                  <span className="sr-only">Open user menu</span>
                                  <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                                </Menu.Button>
                              </div>
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                  {userNavigation.map((item) => (
                                    <Menu.Item key={item.name}>
                                      {({ active }) => (
                                        <a
                                          href={item.href}
                                          className={classNames(
                                            active ? 'bg-gray-100' : '',
                                            'block px-4 py-2 text-sm text-gray-700'
                                          )}
                                        >
                                          {item.name}
                                        </a>
                                      )}
                                    </Menu.Item>
                                  ))}
                                </Menu.Items>
                              </Transition>
                            </Menu>
                          </div>
                        </div>
                        <div className="-mr-2 flex md:hidden">
                          {/* Mobile menu button */}
                          <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open main menu</span>
                            {open ? (
                              <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                            )}
                          </Disclosure.Button>
                        </div>
                      </div>
                    </div>

                    <Disclosure.Panel className="md:hidden">
                      <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                        {navigation.map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className={classNames(
                              item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'block px-3 py-2 rounded-md text-base font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </div>
                      <div className="border-t border-gray-700 pt-4 pb-3">
                        <div className="flex items-center px-5">
                          <div className="flex-shrink-0">
                            <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                          </div>
                          <div className="ml-3">
                            <div className="text-base font-medium leading-none text-white">{user.name}</div>
                            <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                          </div>
                          <button
                            type="button"
                            className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          >
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                        <div className="mt-3 space-y-1 px-2">
                          {userNavigation.map((item) => (
                            <Disclosure.Button
                              key={item.name}
                              as="a"
                              href={item.href}
                              className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                            >
                              {item.name}
                            </Disclosure.Button>
                          ))}
                        </div>
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              {children}
              <Footer />
            </div>
          </>
        )}
      </WithSearch>
    </SearchProvider>
  )
}

Layout.defaultProps = {
  showSearch: true,
}