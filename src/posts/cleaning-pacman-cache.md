---
title: Cleaning pacman Cache
publishDate: 2016-06-15
---

I just learned how to clean pacman's package cache.

I came across this [wiki page](https://wiki.archlinux.org/index.php/pacman#Cleaning_the_package_cache) when I was struggling with disk space the other day. It was then that I learned that pacman would keep *all* versions of downloaded packages, no matter whether the package is installed or not. Cleaning the cache is easy:

``` bash
paccache -r
```

This will remove all cached versions except the most recent 3. There are more aggressive options as well mentioned in that wiki page, such as:

``` bash
pacman -Sc
```

This will keep only the latest version for currently installed packages. Older versions and uninstalled packages will be removed. Of course, this is not recommended. However, as a fun fact, I used that command to regain over 22GB disk space.
