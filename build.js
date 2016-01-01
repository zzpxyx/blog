var metalsmith=require('metalsmith'),
    markdown=require('metalsmith-markdown-remarkable'),
    permalinks=require('metalsmith-permalinks');

metalsmith(__dirname)
    .use(markdown())
    .use(permalinks())
    .build(function(err){
        if (err) throw err;
    });
