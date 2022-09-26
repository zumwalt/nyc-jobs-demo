import * as React from "react"
import { graphql, Link } from "gatsby"

import JobLayout from "../components/jobLayout"
import GridList from "../components/gridList"

export default function AgenciesPage({ data }) {
  const agencies = data.allAgenciesJson.edges

  const PageTitle = () => (
    <>
      <div className="flex items-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mr-4">NYC Government Agencies</h1>
      </div>
    </>
  )

  return (
    <JobLayout title={<PageTitle />} pageTitle="Agencies">
      <GridList path="agency" items={agencies} />
    </JobLayout>
  )
}

export const query = graphql`
  query {
    allAgenciesJson {
      edges {
        node {
          name
          slug
        }
      }
    }
  }`