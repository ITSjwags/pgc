module.exports = {
  siteMetadata: {
    title: 'pgc',
    siteUrl: 'https://www.pineconegolfclub.netlify.app',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    // {
    //   resolve: "gatsby-plugin-google-analytics",
    //   options: {
    //     trackingId: "TODO: add tracking id",
    //   },
    // },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Pinecone Golf Club',
        short_name: 'PGC',
        start_url: '/',
        background_color: '#f7f0eb',
        theme_color: '#a2466c',
        display: 'standalone',
        icon: 'src/images/icon.png',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
  ],
}
