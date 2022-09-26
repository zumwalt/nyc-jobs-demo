var _ = require('lodash');

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allJobsJson {
        edges {
          node {
            job_id
            business_title
          }
        }
      }
      allAgenciesJson {
        edges {
          node {
            slug
            name
          }
        }
      }
      allCategoriesJson {
        edges {
          node {
            slug
            name
          }
        }
      }
    }
  `)

  data.allJobsJson.edges.forEach(edge => {
    const slug = `${_.kebabCase(edge.node.business_title)}-${edge.node.job_id}`
    actions.createPage({
      path: `jobs/${slug}`,
      component: require.resolve(`./src/templates/job.jsx`),
      context: { id: edge.node.job_id },
    })
  })

  data.allAgenciesJson.edges.forEach(edge => {
    actions.createPage({
      path: `agency/${edge.node.slug}`,
      component: require.resolve(`./src/templates/agency.jsx`),
      context: { slug: edge.node.slug, name: edge.node.name },
    })
  })

  data.allCategoriesJson.edges.forEach(edge => {
    actions.createPage({
      path: `category/${edge.node.slug}`,
      component: require.resolve(`./src/templates/category.jsx`),
      context: { slug: edge.node.slug, name: edge.node.name },
    })
  })
}