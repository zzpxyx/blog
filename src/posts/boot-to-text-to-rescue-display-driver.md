---
title: Boot to Text to Rescue Display Driver
publishDate: 2024-07-06
---

I troubleshooted a display driver issue the other day. Here are some notes in case I see it again in the future.

The other day, the monitor turned off after I booted the machine to Arch Linux. My immediate thought was that the graphics card died as that happened to me before. However, I tried typing in my password to log in, and the hard disk light did flash happily, indicating that the system was working. It was just the monitor that somehow went offline. OK, time to unplug the monitor and plug it again. Didn't help. What about rebooting? Same blank screen. Was it a hardware issue or not? I rebooted into Windows and it worked, so definitely not hardware issues. At that time, I was pretty sure that the cause was a system upgrade on kernel and the display driver, but the question was how to fix them. I even tried blind typing commands without the monitor, but it was a bit too hard.

Now it was time to do some serious rescuing. I thought I knew how to boot into the text mode, but apparently I had long forgotten it. After some internet searching, I found a way to do that. It was as simple as adding a `3` for the boot parameter in GRUB, at the line that had `vmlinuz`, after other parameters like `rw quiet`. It essentially meant to boot into the runlevel 3, which had networking but not the graphical user interface.

With a fully working text console, I could [downgrade packages](/posts/downgrading-kernel/). I first downgraded the Linux kernel. After rebooting, I could see the desktop, but the wallpaper didn't show up. Weird. Then I downgraded the nVidia display driver (both `nvidia` and `nvidia-utils` packages), and this time everything went back to normal.

I also found that I was not the only one affected. Apparently, there were some issues about the 555 version of the display driver.

Later, I realized that I could just SSH into the machine after blind logging in. It would have made this a lot simpler. This is the other reason why I need to write this post.
