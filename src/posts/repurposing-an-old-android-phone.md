---
title: Repurposing an Old Android Phone
publishDate: 2024-03-03
---

Recently, I've repurposed an old Android phone as a tiny home server.

I have a Nexus 5 that still functions well. For various reasons I didn't trade it in over all these years, and the trade-in value for it has long gone down to zero. It has always been my emergency phone in the case that my current main device is broken. I haven't found a better use for it until now, when I need a tiny home server to record the footage from an IP security camera. I mean, a Raspberry Pi and the like would be a perfect fit, but why not give it a try on Nexus 5?

Note that some steps I did in this blog post may not be the best practices from the security perspective. I only need some computing power within my private home network, so it's a tradeoff that makes sense in my use case.

First things first, I did a factory reset on the Nexus 5 to restore the stock 6.0.1 firmware. I didn't sign in any Google account as I figured I wouldn't need any Google service or software update. This lead to an interesting problem where the Chrome browser version was too low to render some webpages including the release page on GitHub. I still needed a newish browser anyway, so I downloaded the Firefox APK from the official [Firefox for Android repo](https://github.com/mozilla-mobile/firefox-android) by looking up the direct download link from another (more modern) device and manually typing it in the Nexus 5's Chrome. I used the armeabi-v7a build, and it worked nicely.

I've heard different suggestions on the phone battery, especially on the case like mine where I would plug the phone in all day long. I decided to follow the suggestion to limit the battery level to around 75%. To that end, I installed [Magisk](https://github.com/topjohnwu/Magisk), rooted the device following Magisk documentation, and installed the [Advanced Charging Controller (ACC) module](https://github.com/VR-25/acc) inside the Magisk app. I didn't bother tweaking the parameters for ACC. Maybe some other time.

Now it's time for the main course. The key for repurposing the device is [Termux](https://github.com/termux/termux-app), which is a terminal emulator that supports extensible packages. As mentioned in its README, Termux actually dropped the support for Android 5 and 6 previously, but then later added it back without support. I gave it a try and it worked perfectly. The nicest thing in my opinion was that the Termux app could keep running even after the screen was locked. For my use case, I needed FFmpeg and cron job support. I installed the former via:

```bash
pkg install ffmpeg
```

Understandably, the FFmpeg version was not the latest and greatest, but the version there, 4.2.1, was good enough.

Termux had built-in support for cron jobs. I just needed to use the old syntax:

```bash
busybox crontab -e
busybox crond
```

Now I had everything I needed to record the footage. It worked but with some issues. That will be a different story next time.

For what it's worth, Termux on Android 6 also has Node.js versions 12 and 13, as well as Python versions 2.7 and 3.8.
