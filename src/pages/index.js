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

export const Head = () => <title>Home Page</title>
