import React from "react"
import { MagnifyingGlassIcon, UserPlusIcon } from "@heroicons/react/20/solid"

export default function Hero() {
  return (
    <div className="relative">
      <div className="mx-auto max-w-7xl">
        <div className="relative shadow-2xl sm:overflow-hidden sm:rounded-2xl">
          <div className="absolute inset-0">
            <img
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1582719514131-46fd18bbd113?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
              alt="People working on laptops"
            />
            <div className="absolute inset-0 bg-blue-700 mix-blend-multiply" />
          </div>
          <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
            <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="block text-white">Make a difference</span>
              <span className="block text-blue-200">& build a career</span>
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-center text-xl text-blue-200 sm:max-w-3xl">
              New York City's government is filled with opportunities for talented people who want to improve their communities and make an important difference in the lives of their fellow New Yorkers.
            </p>
            <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
              <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                <a
                  href="/search"
                  className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-blue-700 shadow-sm hover:bg-blue-50 sm:px-8"
                >
                  <MagnifyingGlassIcon className="-ml-1 mr-3 h-5 w-5 text-blue-400" aria-hidden="true" />
                  Search NYC jobs
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center rounded-md border border-transparent bg-blue-500 bg-opacity-60 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-opacity-70 sm:px-8"
                >
                  <UserPlusIcon className="-ml-1 mr-3 h-5 w-5 text-blue-200" aria-hidden="true" />
                  Build your profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
