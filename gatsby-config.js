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
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Eric Zhu',
        short_name: 'Eric Zhu',
        start_url: '/',
        background_color: `#545454`,
        theme_color: `#545454`,
        display: 'standalone',
        icon: 'src/images/cat light.png',
        theme_color_in_head: false,
      }
    },
    `gatsby-plugin-offline`,
  ],
  siteMetadata: {
    title: 'Eric Zhu | Personal website',
    description: 'Eric is a software engineer and data scientist based in Sydney occasionally dabbling in frontends and neural networks.',
    siteUrl: 'https://www.ericfzhu.com',
    image: '/preview.png'
  },
};
