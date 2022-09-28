import React from "react"
import Helmet from "react-helmet"
import { graphql, Script } from "gatsby"

import CrawlerMetaTags from "../components/crawlerMetaTag"
import JobLayout from "../components/jobLayout"
import JobsList from "../components/jobsList"

export default function CategoryPage({ data }) {
  const category = data.category
  const jobs = data.jobs

  const breadcrumbs = [
    { name: 'Agency', href: `/categories/`, current: false },
    { name: category?.name, href: `/category/${category.slug}`, current: true },
  ]

  const PageTitle = () => (
    <div className="flex items-center">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mr-4">{category.name}</h1>
    </div>
  )

  return (
    <JobLayout title={<PageTitle />} breadcrumbs={breadcrumbs}>
      <Helmet>
        <title>{category.name} | NYC Jobs</title>
      </Helmet>
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Open Positions</h2>
          <span className="text-s text-gray-500">{jobs.edges.length} openings</span>
        </div>
        <JobsList jobs={jobs} />
      </div>
    </JobLayout>
  )
}

export const query = graphql`
  query($slug: String!, $name: [String]) {
    category: categoriesJson(slug: { eq: $slug }) {
      name
      slug
    }
    jobs: allJobsJson(filter: {category: {in: $name}}) {
      edges {
        node {
          business_title
          agency
          job_id
          posting_date
          work_location
        }
      }
    }
  }`

export function Head({ data }) {
  const category = data.category
  return (
    <>
      <title>{category.name} Jobs | NYC Jobs</title>
      <script
        id="analytics"
        src={process.env.GATSBY_ELASTIC_BA_SCRIPT}
        data-dsn={process.env.GATSBY_ELASTIC_BA_DSN}
        defer
      />
      <CrawlerMetaTags pageType="index_page" data={category} />
    </>
  )
}