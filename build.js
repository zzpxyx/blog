var metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown-remarkable'),
    permalinks = require('metalsmith-permalinks'),
    collections = require('metalsmith-collections'),
    layouts = require('metalsmith-layouts'),
    excerpts = require('metalsmith-excerpts'),
    handlebars = require('handlebars'),
    moment = require('moment');

handlebars.registerHelper('formatDate', function(date) {
    return moment.utc(date).format('YYYY-MM-DD');
});

metalsmith(__dirname)
    .use(collections({
        posts: {
            pattern: 'posts/*.md',
            sortBy: 'publishDate',
            reverse: true
        }
    }))
    .use(markdown())
    .use(excerpts())
    .use(permalinks())
    .use(layouts({
        'engine': 'handlebars',
        'partials': 'layouts/partials'
    }))
    .build(function(err) {
        if (err) throw err;
    });
