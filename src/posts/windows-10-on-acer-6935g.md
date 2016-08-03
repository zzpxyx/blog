---
title: Windows 10 on Acer 6935G
publishDate: 2016-08-02
---

Finally, I managed to upgrade to Windows 10 for my *8-year-old* laptop. I know, I know, I'm asking for trouble.

It all started with an error message last year. Nowadays, I seldom use the laptop as I have a much more powerful desktop (which is, well, nearly 5 years old). But when I do, I upgrade the operating system. I thought that it would be a piece of cake like upgrading to Windows 10 on my desktop machine, so I was shocked to see an error message saying that my laptop CPU was not supported. No, no, no, little upgrade assistant, my Acer 6935G has Intel Core 2 Duo P8600 processor, which has all the features you want. PAE, check. SSE2, check. NX, check. What else do you need? I searched all over the Internet, but I didn't find too much useful information, which was not a surprise considering the age of my laptop.

Frankly speaking, I was not very fascinated with Windows 10. Had I stopped right here, I would have much less trouble. However, I simply didn't (or couldn't). To me, this was a challenging puzzle and I really enjoyed trying to solve it.

One piece of information did give me some inspiration, but it was also a trap, well, kind of. It said that NX could have been disabled by BIOS, and it might require a BIOS update or hack to see the hidden options. I was not surprised at all to see that my "up-to-date" BIOS didn't have that option. Let's try BIOS hack, I thought.

I was lucky to find an old [unlocked version](https://www.bios-mods.com/forum/Thread-UNLOCKED-ACER-6935G) of my BIOS. I was excited to see the hidden menu for advanced options, but I didn't see an option for NX. As a side finding, I saw the option for VT-x. I turned it on, but [SecurAble](https://www.grc.com/securable.htm) still showed "NO" for hardware virtualization. It seemed that the hidden menu was uncovered, but that option for VT-x was not working for some reason.

I kept looking for other unlocked versions, but I didn't find any suitable one. I even flashed a wrong image of BIOS. Guess what? My laptop turned into a brick. Not surprised at all. Long story short: I had to tear apart the laptop, desolder the BIOS chip, re-program it, re-solder it, and then reassemble the laptop. Lessons learned: never flash a BIOS image if its size is different than the official one.

A year passed by quickly. Recently, I came across [this post](https://marcan.st/2009/06/enabling-intel-vt-on-the-aspire-8930g/). It is talking about enabling VT-x on Acer 8930G, which is a model very similar to my 6935G. I thought that a success in enabling VT-x would be a good step towards NX, so I gave it a try. Basically, I dumped out the runtime BIOS using an Ubuntu Live USB stick, used the script in that post to patch the image, and then flash it back (with size checking first, of course). This time SecurAble reports "YES" for VT-x. Nice. Let's see if we can turn on NX.

By the way, I launched Windows 10 upgrade program whenever I made some changes, but it always failed. Up till then, I had no luck.

I didn't expect it when I came upon [this post](https://www.reddit.com/r/windows/comments/39ckik/cpu_not_compatible_with_windows_10_upgrade/cttcked) during Internet searching. The post mentions a Windows system setting that turns *off* NX. Guess which one? Surprise! It's the DEP setting! I had seen that setting for a million times, but I never realized that it would affect NX. I was astonished to see that Windows 10 started to upgrade without errors after this. What? Why? No! Yes!

Actually, that DEP setting might be the *only* step I need. Anyway, I did it.

Hopefully from my story, you can get some inspiration. Or amusement.
