import React from "react"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import { ExclamationTriangleIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid"
import kebabCase from "lodash/kebabCase"

import JobLayout from "../components/jobLayout"

export default function JobPage({ data }) {
  const job = data.jobsJson
  console.log(job)

  const breadcrumbs = [
    job?.agency && { name: job.agency, href: `/agency/${kebabCase(job.agency)}`, current: false },
    { name: job?.business_title, href: '#', current: true },
  ]

  var moneyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const PageTitle = () => (
    <>
      <div className="flex items-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mr-4">{job.business_title}</h1>
        {job?.salary_frequency === 'Annual' ? (
          <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-0.5 text-sm font-medium text-blue-800">
            Salaried
          </span>
        ) : (
          <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-0.5 text-sm font-medium text-yellow-800">
            Hourly
          </span>
        )}
        {job?.posting_type && (
          <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800 ml-2">
            {job.posting_type}
          </span>
        )}
      </div>
      <button
        type="button"
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-base font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Apply Now <ArrowTopRightOnSquareIcon className="ml-2 h-4 w-4" aria-hidden="true" />
      </button>
    </>
  )

  const Attribute = ({ name, value }) => (
    <div className="py-4 px-6">
      <dt className="text-sm font-medium text-gray-500">{name}</dt>
      <dd className="mt-1 text-sm text-gray-900">{value}</dd>
    </div>
  )

  const FormattedText = ({ heading, content }) => {
    const clean_content = content.replace(/â/g, "'")
    const content_array = clean_content.split('â¢')
    return (
      <div>
        {heading && (
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-gray-900">{heading}</h3>
          </div>
        )}
        <p className="leading-relaxed">{content_array[0]}</p>
        {content_array.length > 1 && (
          <ul className="list-disc mt-4 pl-4">
            {content_array.slice(1).map((item, index) => <li key={index} className="mb-2">{item}</li>)}
          </ul>
        )}
      </div>
    )
  }

  const ExternalAlert = () => (
    <div className="rounded-md bg-yellow-50 border-yellow-300 border-solid border-2 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">This position is external</h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>
              Hiring for this position is managed by an external agency. Please visit the link below to apply.
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <JobLayout title={<PageTitle />} breadcrumbs={breadcrumbs}>
      <Helmet>
        <title>{job.business_title} Job Posting | NYC Jobs</title>
      </Helmet>
      <div className="grid grid-cols-3 gap-20">
        <div className="col-span-2">
          <div className="flex flex-col gap-y-8">
            {job?.posting_type === 'External' && <ExternalAlert />}
            {job?.job_description && <FormattedText heading="Job Description" content={job.job_description} />}
            {job?.minimum_qual_requirements && <FormattedText heading="Minimum Qualifications" content={job.minimum_qual_requirements} />}
            {job?.residency_requirement && <FormattedText heading="Residency Requirement" content={job.residency_requirement} />}
            {job?.preferred_skills && <FormattedText heading="Preferred Skills" content={job.preferred_skills} />}
            {job?.additional_information && <FormattedText heading="Additional Information" content={job.additional_information} />}
            {job?.to_apply && <FormattedText heading="How to Apply" content={job.to_apply} />}
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div className="overflow-hidden bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Pay Details</h3>
              {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p> */}
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                {job?.salary_frequency && <Attribute name="Pay Frequency" value={job.salary_frequency} />}
                {job?.salary_frequency === 'Annual' ? (
                  <Attribute name="Salary Range" value={`${moneyFormatter.format(job.salary_range_from)} - ${moneyFormatter.format(job.salary_range_to)}`} />
                ) : (
                  <Attribute name="Hourly Rate" value={
                    job.salary_range_from === job.salary_range_to ? 
                      `${moneyFormatter.format(job.salary_range_from)} per hour` : 
                      `${moneyFormatter.format(job.salary_range_from)} - ${moneyFormatter.format(job.salary_range_to)} per hour`
                  } />
                )}
              </dl>
            </div>
          </div>
          <div className="overflow-hidden bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Job Details</h3>
              {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p> */}
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                {job?.job_category && <Attribute name="Job Category" value={job.job_category} />}
                {job?.agency && <Attribute name="Agency" value={job.agency} />}
                {job?.division_work_unit && <Attribute name="Division" value={job.division_work_unit} />}
                {job?.career_level && <Attribute name="Career Level" value={job.career_level} />}
                {job?.work_location && <Attribute name="Work Location" value={job.work_location} />}
                {job?.posting_updated && <Attribute name="Posting last updated" value={new Date(job.posting_updated).toLocaleDateString('en-us', {year: "numeric", month: "long", day: "numeric"})} />}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </JobLayout>
  )
}

export const query = graphql`
  query($id: String!) {
    jobsJson(job_id: { eq: $id }) {
      business_title
      additional_information
      agency
      career_level
      category
      civil_service_title
      division_work_unit
      full_time_part_time_indicator
      hours_shift
      job_category
      job_description
      job_id
      minimum_qual_requirements
      of_positions
      post_until
      posting_date
      posting_type
      posting_updated
      preferred_skills
      process_date
      residency_requirement
      salary_frequency
      salary_range_from
      salary_range_to
      title_classification
      to_apply
      work_location
      work_location_1
    }
  }`