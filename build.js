var metalsmith=require('metalsmith'),
    markdown=require('metalsmith-markdown-remarkable'),
    permalinks=require('metalsmith-permalinks'),
    collections=require('metalsmith-collections'),
    layouts=require('metalsmith-layouts');

metalsmith(__dirname)
    .use(collections({
        posts:{
            pattern:'posts/*.md',
            sortBy:'publishDate',
            reverse:true
        }
    }))
    .use(markdown())
    .use(layouts('handlebars'))
    .use(permalinks())
    .build(function(err){
        if (err) throw err;
    });
