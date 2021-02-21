---
title: Converting Markdown Files
publishDate: 2021-02-21
---

Recently, I've found an acceptable workflow for converting a markdown file to a non-markdown-fashioned document.

I've been using markdown format for writing documents lately. I use heading level one for title and level two for "the top-level sections". One problem is that sometimes I need to convert the document to a non-markdown-fashioned format like Google Doc. I tried rendering the markdown file in styled HTML and then copy-pasting the result in Google Doc directly. The result looks OK, but the major problem is that the heading levels are off by one, and I have to manually change them.

Then I found `pandoc`. It is not rarely known per se, but I found a very useful option called `--shift-heading-level-by=-1`. This solves my problem mentioned above exactly. All heading levels are shifted by one, and the heading level one used as the title in my markdown document is removed.

Now my workflow looks like this. I write in markdown format, use `pandoc` to convert it to raw HTML format with headings shifted by one, and finally copy-paste the HTML from browser to Google Doc. Google Doc can recognize and match most of the HTML tags to its built-in styles, except for the code style. This is totally acceptable for me before I encounter better solutions.
