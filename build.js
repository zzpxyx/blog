var metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdownit'),
    permalinks = require('metalsmith-permalinks'),
    collections = require('metalsmith-collections'),
    layouts = require('metalsmith-layouts'),
    excerpts = require('metalsmith-excerpts'),
    feed = require('metalsmith-feed'),
    typeset = require('metalsmith-typeset'),
    archive = require('metalsmith-archive'),
    pagination = require('metalsmith-pagination'),
    handlebars = require('handlebars'),
    moment = require('moment');

handlebars.registerHelper('formatDate', function(date) {
    return moment.utc(date).format('YYYY-MM-DD');
});

handlebars.registerHelper('shortenPath', function(path) {
    var pos = path.lastIndexOf('index.html');
    return path.substring(0, pos);
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
    .use(permalinks({
        relative: false
    }))
    .use(archive())
    .use(feed({
        collection: 'posts'
    }))
    .use(excerpts())
    .use(pagination({
        'collections.posts': {
            perPage: 4,
            layout: 'index.hbs',
            first: 'index.html',
            path: 'page/:num/index.html'
        }
    }))
    .use(layouts({
        'engine': 'handlebars',
        'partials': 'layouts/partials'
    }))
    .build(function(err) {
        if (err) throw err;
    });
