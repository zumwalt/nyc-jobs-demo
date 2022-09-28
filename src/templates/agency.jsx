import React from "react"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import CrawlerMetaTags from "../components/crawlerMetaTag"

import JobLayout from "../components/jobLayout"
import JobsList from "../components/jobsList"

export default function AgencyPage({ data }) {
  const agency = data.agency
  const jobs = data.jobs

  const breadcrumbs = [
    { name: 'Agency', href: `/agencies/`, current: false },
    { name: agency?.name, href: `/agency/${agency.slug}`, current: true },
  ]

  const PageTitle = () => (
    <div className="flex items-center">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mr-4">{agency.name}</h1>
    </div>
  )

  return (
    <JobLayout title={<PageTitle />} breadcrumbs={breadcrumbs}>
      <Helmet>
        <title>{agency.name} | NYC Jobs</title>
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
  query($slug: String!, $name: String!) {
    agency: agenciesJson(slug: { eq: $slug }) {
      name
      slug
    }
    jobs: allJobsJson(filter: {agency: {eq: $name}}) {
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
  const agency = data.agency
  return (
    <>
      <title>{agency.name} Jobs | NYC Jobs</title>
      
      <CrawlerMetaTags pageType="index_page" data={agency} />
    </>
  )
}