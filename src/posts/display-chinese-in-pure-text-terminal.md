---
title: Display Chinese in Pure Text Terminal
publishDate: 2018-12-17
---

Fbterm is the old tool I newly found for displaying Chinese characters in pure text terminal.

I had some display driver issues the other day and I couldn't launch the graphical interface on my desktop machine. I had to work under the pure text terminal. It doesn't support double width characters like Chinese, which happens to be my default displaying language. As a result, some command outputs just showed gibberish diamond characters. I had to change the language environment variable temporarily so that the output was switched to English. Out of curiosity, I started looking for a solution for displaying Chinese characters in pure text terminal.

After some searching and testing, I finally got [Fbterm](https://code.google.com/archive/p/fbterm/). It is also mentioned in the [Arch Linux wiki](https://wiki.archlinux.org/index.php/Fbterm). Basically, it is another terminal emulator that "supports double width scripts like Chinese, Japanese, etc". Simply start it via the command `fbterm` in the pure text terminal, and Chinese characters should display correctly. For me, this is enough, so I didn't try adding Chinese input methods under Fbterm. I think it's technically possible.

Note one caveat though. The development for Fbterm has stopped a long time ago. I just use it occasionally, and I'd say that it is still pretty good at its own job.
