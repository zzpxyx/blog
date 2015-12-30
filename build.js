var Metalsmith=require('metalsmith'),
    Markdown=require('metalsmith-markdown-remarkable');

Metalsmith(__dirname)
    .use(Markdown())
    .build(function(err){
        if (err) throw err;
    });
