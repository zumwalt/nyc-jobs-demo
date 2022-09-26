import * as React from "react"
import { graphql } from "gatsby"

import JobLayout from "../components/jobLayout"
import GridList from "../components/gridList"

export default function CategoriesPage({ data }) {
  const categories = data.allCategoriesJson.edges

  const PageTitle = () => (
    <>
      <div className="flex items-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mr-4">Categories</h1>
      </div>
    </>
  )

  return (
    <JobLayout title={<PageTitle />} pageTitle="Categories">
      <GridList path="category" items={categories} />
    </JobLayout>
  )
}

export const query = graphql`
  query {
    allCategoriesJson {
      edges {
        node {
          name
          slug
        }
      }
    }
  }`
