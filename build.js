var metalsmith = require("metalsmith"),
  markdown = require("metalsmith-markdownit"),
  permalinks = require("metalsmith-permalinks"),
  collections = require("metalsmith-collections"),
  layouts = require("metalsmith-layouts"),
  excerpts = require("metalsmith-excerpts"),
  feed = require("metalsmith-feed"),
  typeset = require("metalsmith-typeset"),
  archive = require("metalsmith-archive"),
  pagination = require("metalsmith-pagination"),
  filemetadata = require("metalsmith-filemetadata"),
  pagetitles = require("metalsmith-page-titles"),
  handlebars = require("handlebars"),
  moment = require("moment"),
  hljs = require("highlight.js"),
  discoverPartials = require("metalsmith-discover-partials");

handlebars.registerHelper("formatDate", function(date) {
  return moment.utc(date).format("YYYY-MM-DD");
});

handlebars.registerHelper("shortenPath", function(path) {
  var pos = path.lastIndexOf("index.html");
  return path.substring(0, pos);
});

metalsmith(__dirname)
  .metadata({
    site: {
      title: "zzpxyx",
      url: "www.zzpxyx.com"
    }
  })
  .use(
    filemetadata([
      {
        pattern: "posts/*.md",
        metadata: {
          layout: "post.hbs"
        }
      }
    ])
  )
  .use(pagetitles())
  .use(
    collections({
      posts: {
        pattern: "posts/*.md",
        sortBy: "publishDate",
        reverse: true
      }
    })
  )
  .use(
    markdown({
      highlight: function(str, lang) {
        return (
          '<pre><code class="hljs">' +
          hljs.highlight(lang, str, true).value +
          "</code></pre>"
        );
      }
    })
  )
  .use(
    permalinks({
      relative: false
    })
  )
  .use(
    feed({
      collection: "posts"
    })
  )
  .use(
    typeset({
      disable: ["ligatures"]
    })
  )
  .use(archive())
  .use(excerpts())
  .use(
    pagination({
      "collections.posts": {
        perPage: 4,
        layout: "index.hbs",
        first: "index.html",
        path: "page/:num/index.html"
      }
    })
  )
  .use(
    discoverPartials({
      directory: "layouts/partials"
    })
  )
  .use(layouts())
  .build(function(err) {
    if (err) throw err;
  });
