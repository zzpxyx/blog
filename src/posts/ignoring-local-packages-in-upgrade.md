---
title: Ignoring Local Packages in Upgrade
publishDate: 2020-08-18
---

I've just found a way to ignore local packages when upgrading packages using Yay in Arch Linux.

I use Yay for managing packages on Arch Linux. As mentioned in [this post](https://www.zzpxyx.com/posts/switching-to-arch-linux-tex-live/), I use `tllocalmgr` to manually install some CTAN packages, mostly fonts. The consequence is that these packages only exist on my local machine. Every time I upgrade packages in Yay, it will prompt me that those packages don't have corresponding AUR packages. That isn't necessarily a bad thing, but I just want to hide it.

I came across [this issue](https://github.com/Jguer/yay/issues/780) the other day. This afternoon, I finally decided to give it a try. All I did was to uncomment the `IgnorePkg` setting in `/etc/pacman.conf`, and added a package name pattern, so that it looked like this:

```properties
IgnorePkg = texlive-local-*
```

It worked like a charm. Now, Yay no longer prompts missing AUR packages. Fortunately, we don't have official or AUR packages staring with `texlive-local-` at the moment.

This post is more like a memo to me as I know one day I will wonder where or how I did this.
