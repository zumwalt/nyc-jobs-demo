import * as React from "react"

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
      
    </>
  )
}