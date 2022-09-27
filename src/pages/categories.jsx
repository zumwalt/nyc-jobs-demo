import * as React from "react"
import { graphql, Script } from "gatsby"

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

export function Head({ data }) {
  const categories = data.allCategoriesJson.edges
  let categoriesList = []
  categories.map(({ node }) => categoriesList.push(`"${node.name}"`))

  return (
    <>
      <title>All Job Categories | NYC Jobs</title>
      <Script
        id="analytics"
        src={'./analytics.js'}
        data-dsn={process.env.GATSBY_ELASTIC_BA_DSN}
        defer
      />
      <meta class="elastic" name="page_type" content="category_index" />
      <meta class="elastic" name="page_data" content={`[${categoriesList}]`} />
    </>
  )
}