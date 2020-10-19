module.exports = {
  "globDirectory": "build/",
  "globPatterns": [
    "**/*.css",
    "index.html",
    "js/*.js",
    "img/*.jpg",
    "img/icons/*.png",
    "pages/offline.html",
    "pages/404.html",
    "pages/fallback.html"
  ],
  "swSrc": "src/sw.js",
  "swDest": "build/sw.js",
  "globIgnores": [
    "../workbox-config.js"
  ]
};