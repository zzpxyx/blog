---
title: Icon Size in Xfce 4 Window Buttons
publishDate: 2017-04-08
---

I've just figured out how to change the icon size for Xfce 4 window buttons in task list.

I'm using the Arc Darker theme. I've configured the task list to only show window buttons so that they take less space in the top-right corner of the screen and play well with the title bar when a window is maximized. I always feel that the icons in the window buttons are too small.

The key to solve this problem is to figure out which style is applied to the window buttons. I know little about GTK themes, so here is my guessing and observations through trial and error.

For the Arc Darker theme, the base theme file on my Arch Linux is

```bash
/usr/share/themes/Arc-Darker/gtk-2.0/gtkrc
```

Looking at the content of the file, it includes other theme files. One of them is `panel.rc`, which seems promising.

At the end of `panel.rc`, there is a line that says

```html
widget "*XfceTasklist*" style "panelbuttons"
```

I think this is what we need. Looking at the `panelButtons` style in the same file, `xthickness` is set to 4. I'm not exactly sure what this property means, but it seems that it is used for calculating various padding spaces. I change it to 2, and the icons immediately appear larger after switching to another theme and back. The smaller that value is, the larger the icons will be.

This solution has many drawbacks. For example, the modification may be overridden if I update the Arc theme package. For now, that's good enough for me.
