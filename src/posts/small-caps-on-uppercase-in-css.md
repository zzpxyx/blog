---
title: Small Caps on Uppercase in CSS
publishDate: 2016-02-17
layout: post.hbs
---

I just found out how to apply small caps to uppercase letters using CSS.

As a newbie in web design and typography, I was trying to apply small caps to abbreviations in the texts. I knew the following code:

``` CSS
.small-caps {
    font-variant: small-caps;
}
```

However, it didn't work for the abbreviations which are all uppercase letters. I thought it was caused by the font since I could apply small caps to the navigation bar, but changing the font for the texts was not helpful. After some digging around I found that I need to transform the uppercase letters into lowercase first. In other words, I need:

``` CSS
.small-caps {
    text-transform: lowercase;
    font-variant: small-caps;
}
```

By the way, I didn't use small caps on abbreviations in the end. It felt unnatural. I think the best option would be using a native small caps font instead, but a matching one has to be found first.
