/* eslint-disable no-undef */
module.exports = {
  plugins: [
    'gatsby-plugin-top-layout',
    'gatsby-theme-material-ui',
    // 'gatsby-plugin-mui-emotion',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-resolve-src',
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
    title: 'Eric\'s personal website',
  },
};
