---
title: Reviving an Old MP3 Player
publishDate: 2019-12-31
---

I've finally had the chance to jot down my adventure in reviving a very old MP3 player.

The player is made by Philips. I think the model number is something like SA2SPK02S/93. It is almost 10 years old, so by the time I tried to turn it on, nothing appeared on the screen. Not surprised at all.

Apparently the battery is already depleted and possibly over-discharged. It has a USB port for charging, so I connected it to my desktop machine. It appeared to be charging, and showed full battery really quickly. I disconnected it and then tried to turn it on, but it went into a weird boot loop. It showed that the battery was low, and then refused to do anything else. I also tried to charge it over a long period of time, but it didn't help.

I was about to give up before I got curious about its management software, Philips Songbird. Technically, this MP3 player can function very well on its own. I was just curious on what the management software was for. After fighting with some compatibility issues, I finally got the software running, and there was a firmware update option. No new firmware available. Not surprised at all, either. However, I could reinstall the existing firmware. I immediately gave it a try because why not?

That turned out to be the correct solution. After reinstalling the firmware, my desktop machine recognized the device, and charging was back to normal. Sometime later I gave the MP3 player a spin, and it worked well. Nice.

My guess is that somehow the internal battery level checker, hardware or software, had some errors. The MP3 player thought that it was fully charged, but actually only 2% or so. The boot process was disrupted due to low battery, which caused all kinds of weird issues. Finally, reinstalling the firmware calibrated the batter level checker or something, and made all problems go away.

I actually did this quite a while ago. Now, at the time of writing this post, the battery of that MP3 player is depleted again. Interestingly, this time everything works. The device is recognized by my desktop immediately, and charging seems fine. Maybe my guess above is not that bad.

To sum it up, reinstalling the firmware might be helpful when dealing with a dead battery. This probably doesn't work every time, but it's worth a try.
