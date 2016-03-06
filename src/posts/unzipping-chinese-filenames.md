---
title: Unzipping Chinese Filenames
publishDate: 2016-03-06
---

Unzipping a zip archive that has Chinese filenames inside is tricky. I haven't been able to find a perfect solution for quite a long time. Instead, I have to use a workaround. Recently, I came cross [this post](https://linuxtoy.org/archives/wrong-handling-of-chinese-coded-filename-in-fileroller-unzip.html) which confirms my findings.

Let's talk about the issue first. Suppose I compress a file with a Chinese filename into a zip archive on the Windows platform. Now I want to extract that file on Linux. The `unzip` tool used to work perfectly with the `-O` option, but one day I found that the option was gone. Without that option, the extracted file will have a human unreadable filename.

The issue is caused by encoding for sure. The workaround is simple. Just find any unzipping utility that supports specifying encoding. To me, the best workaround would be [Unarchiver (unar)](http://unarchiver.c3.cx/commandline) which I found in AUR previously. It worked well even without specifying encoding. The post mentioned at the beginning confirms this. In addition, the comments under that post also suggests a patched version of `unzip`, namely `unzip-iconv`, which adds back the `-O` option.
