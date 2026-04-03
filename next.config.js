module.exports = {
  basePath: "", // Ensures the app is served from the /test subdirectory
  assetPrefix: "", // Ensures assets are served from the /test subdirectory
  trailingSlash: true, // Ensures paths end with a trailing slash for GitHub Pages compatibility
  output: "export", // Enables static export
  images: {
    unoptimized: true, // Required for static export (no Image Optimization)
  },
};
