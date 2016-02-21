---
title: Inline SVG with Flex Layout
publishDate: 2016-02-08
---

Be careful in setting the width or height to "auto" when using inline SVG in HTML.

I was using an inline SVG for the logo. I set the height to be a fixed value, and the width to be "auto" hoping that it would scale properly. I was also using the flex layout with "justify-content" set to "space-between". My intention was to put the logo at the left-most position within the header and the navigation bar at right-most. However, different browsers render this differently. If I'm remembering it correctly, Chrome and Firefox behaved correctly while Safari and IE had some issues. In Safari and IE, the width of the logo was much larger. It looked like the logo was taking up the space that was originally the separator since the width was set to "auto".

It's simple to solve this issue. Just don't use "auto" and manually set the correct width.

As always, I'm new to web design and I probably saw this issue due to some bad design practice.
