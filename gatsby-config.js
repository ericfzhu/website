/* eslint-disable no-undef */
module.exports = {
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-resolve-src`,
    `gatsby-theme-material-ui`,
    {
      resolve: `gatsby-theme-material-ui`,
      options: {
        webFontsConfig: {
          fonts: {
            google: [
              {
                family: `Handlee`,
              }
            ]
          }
        }
      }
    },
  ],
  siteMetadata: {
    title: 'Eric Zhu | Personal website',
    description: 'Eric is a software engineer and data scientist based in Sydney',
    siteUrl: 'https://www.ericfzhu.com',
    image: '/preview.png'
  },
};
