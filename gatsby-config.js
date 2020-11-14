let env = process.env.NODE_ENV || 'development';
require('dotenv').config({path: `./.env.${env}`});
module.exports = {
  siteMetadata: {
    title: `OpenJustice.be // upload // alpha`,
    description: `Upload interface - alpha version`,
    author: `@pieterjan_m`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "query",
        fieldName: "api",
        //url: `http://localhost:5000/gql`,
         url: `https://anon-api.openjustice.be/gql`,
        //url: `${process.env.GATSBY_API_URL}/gql`,
        refetchInterval: 60,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#2d4059`,
        theme_color: `#2d4059`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    "gatsby-plugin-use-query-params",
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Major Mono Display`,
            variants: [`400`]
          },
          {
            family: `Roboto Mono`,
            variants: [`400`, `700`]
          },
          {
            family: `Roboto`,
            variants: [`thin`, `light`]
          },
        ],
      },
    },
  ],
}
