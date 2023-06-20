---
title: Text Replacement for Small Screens
publishDate: 2023-06-20
---

I've found that using text replacement is an acceptable way to write code on small mobile screens.

Recently, I had to write some code on a small phone screen. Typing code on such screens is a pain since symbols are hard to find and auto-corrections always get in the way. On Android, the problem may be mitigated by a good keyboard such as [Hacker's Keyboard](https://github.com/klausw/hackerskeyboard), but I couldn't find its alternatives on iOS.

Then I realized that I could use text replacement. Different platforms may call it differently, but essentially the idea is to expand a "shortcut" into a relatively long phrase automatically upon typing. On iOS 16 it's under `Settings > General > Keyboard > Text Replacement`. For starters, some shortcuts for Java code could be:

- `fori -> for (int i=0;i<n;i++) {`
- `intmax -> Integer.MAX_VALUE`
- `sysout -> System.out.println(`

In this way, I can speed up typing code with the native iOS keyboard. It's not perfect for sure, but it did improve my coding experience on a small screen.

In general, I think text replacement is an underrated feature. I'm also using [Espanso](https://espanso.org/) to save some typing on non-mobile platforms.
