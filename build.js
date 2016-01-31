var metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown-remarkable'),
    permalinks = require('metalsmith-permalinks'),
    collections = require('metalsmith-collections'),
    layouts = require('metalsmith-layouts'),
    excerpts = require('metalsmith-excerpts'),
    feed = require('metalsmith-feed'),
    handlebars = require('handlebars'),
    moment = require('moment');

handlebars.registerHelper('formatDate', function(date) {
    return moment.utc(date).format('YYYY-MM-DD');
});

metalsmith(__dirname)
    .metadata({
        site: {
            title: 'zzpxyx',
            url: 'www.zzpxyx.com'
        }
    })
    .use(collections({
        posts: {
            pattern: 'posts/*.md',
            sortBy: 'publishDate',
            reverse: true
        }
    }))
    .use(markdown())
    .use(permalinks())
    .use(feed({
        collection: 'posts'
    }))
    .use(excerpts())
    .use(layouts({
        'engine': 'handlebars',
        'partials': 'layouts/partials'
    }))
    .build(function(err) {
        if (err) throw err;
    });
