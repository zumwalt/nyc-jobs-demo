import React from "react"

export default function CrawlerMetaTags({ pageType, data }) {
  
  return (
    <>
      <meta className="elastic" name="page_type" content={pageType} />
      {Object.keys(data).map((key, keyIdx) => (
        <meta className="elastic" key={keyIdx} name={key} content={data[key]} />
      ))}
    </>
  )
}