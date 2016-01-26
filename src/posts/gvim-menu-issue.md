---
title: gVim Menu Issue Solved
publishDate: 2016-01-20
layout: post.hbs
---

Something has been wrong with my gVim's menus for quite some time. Finally, I found a workaround yesterday.

I'm not sure when and how the problem occurred, but one day I found that most of my gVim's menus were "missing". Technically they were there, but all characters in the menu captions and items were missing. There were two strange things though. One was that the Solarized theme menu was displaying correctly. The other was that all menu items were showing the corresponding gVim commands correctly.

After searching around on the Internet and some trial and error, I finally found a workaround. Let's take a step back and rethink about those two strange things. Actually they were saying that only *some* characters in menu captions and items were missing. In my case, all those Chinese characters were not showing up. Now it's more clear that something might be wrong with the menu language. After manually setting the menu language to Chinese using the following line in my .vimrc, the problem was solved.

``` vim
set langmenu="zh_CN.UTF-8"
```

I call this a workaround since I'm still not sure what caused this issue.

By the way, I'm using Arch Linux with Xfce. It seems that this gVim menu issue only happens in certain cases, like mine.
