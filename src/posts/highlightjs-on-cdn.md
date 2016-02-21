---
title: highlight.js on CDN
publishDate: 2016-01-26
---

[highlight.js](https://highlightjs.org/) is a popular library for syntax highlighting. I just figured out how to use its CDN version.

According to the [download instructions](https://highlightjs.org/download/), there is a hosted version of highlight.js. It is a prebuilt version with 23 commonly used languages. I was trying to highlight Vim script, which was not included. After searching on the Internet, I found it on [cdnjs](https://cdnjs.com/libraries/highlight.js/). Every supporting language was listed, so I downloaded the one for Vim script (languages/vim.min.js) immediately and started testing. It was not working because "hljs" was not defined.

It took me a while to realize the structure of those js files. The one I downloaded for Vim script was merely an addon. In other words, I still needed the file highlight.min.js as a base. After referencing both of them, Vim script highlighting finally worked.
