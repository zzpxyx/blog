---
title: iframe Border Issue Solved
publishDate: 2016-02-05
layout: post.hbs
---

iOS Safari renders the iframe tag with an old-fashioned border even though I set the display property to "none" on that iframe tag. It took me a while to realize what was missing.

I was using the CSS reset technique to make browsers render my pages as consistent as possible. I was just resetting the properties margin, border, padding, and font for all the tags I used. Guess what. I forgot the iframe tag there. The border disappeared immediately after resetting the iframe tag.

I'm not sure the internal mechanisms though. Maybe my case was special and I didn't realize other contributing factors. Nonetheless, you could try this if you run out of ideas in dealing with similar issues.
