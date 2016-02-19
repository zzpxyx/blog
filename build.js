var metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdownit'),
    permalinks = require('metalsmith-permalinks'),
    collections = require('metalsmith-collections'),
    layouts = require('metalsmith-layouts'),
    excerpts = require('metalsmith-excerpts'),
    feed = require('metalsmith-feed'),
    typeset = require('metalsmith-typeset'),
    archive = require('metalsmith-archive'),
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
    .use(typeset({
        disable: ['ligatures']
    }))
    .use(permalinks())
    .use(archive())
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
