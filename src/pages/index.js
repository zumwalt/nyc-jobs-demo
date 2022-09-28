import * as React from "react"
import { Script } from "gatsby"

import PageLayout from "../components/pageLayout"
import Hero from "../components/hero"

const IndexPage = () => {
  return (
    <PageLayout pageTitle="Home Page">
      <Hero />
    </PageLayout>
  )
}

export default IndexPage

export function Head() {
  return (
    <>
      <title>NYC Jobs</title>
      <script
        id="analytics"
        src={'/analytics.js'}
        data-dsn={process.env.GATSBY_ELASTIC_BA_DSN}
        defer
      />
    </>
  )
}