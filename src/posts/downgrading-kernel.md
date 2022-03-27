---
title: Downgrading Arch Linux Kernel
publishDate: 2022-03-27
---

Yesterday, I had to match the kernel and the display driver versions when downgrading the Arch Linux kernel. Now I'm jotting it down as a memo.

I did a system upgrade yesterday on my Arch Linux install. The kernel was updated to version 5.16.16. After rebooting the machine, I noticed that the WiFi connection kept dropping and reconnecting, and it was very hard for me to open any website. I looked it up on my phone and found that there was [this bug](https://bugzilla.kernel.org/show_bug.cgi?id=215703) in recent kernel changes. Versions 5.16.14 and below seem unaffected.

After downgrading the `linux` package to 5.16.14, I couldn't see the graphical login screen. This is not a surprise for me. I've seen this during my previous kernel upgrading, and reinstalling the nVidia display driver worked. I did that, but this time it didn't work. Now I'm a bit surprised. I vaguely remember that the kernel version and the display driver version need to be "compatible", although the exact reason has always been a puzzle for me. Let me downgrade `nvidia-*` packages to an arbitrary previous version. Uh, no luck.

I tried looking at various logs, but I couldn't find a proper workaround. Now it's time to roll back to the exact versions before the system upgrade. I looked at the pacman log at `/var/log/pacman.log`, and wrote down the versions for packages `linux`, `nvidia`, `nvidia-utils`, and `nvidia-settings`. Then I used `downgrade` to install those exact versions. It's nice that `downgrade` can use local cached packages, and it also shows which versions were installed previously. This time it finally worked.

As a side note, I think the DKMS version of the nVidia display driver _may not_ have this "compatible version" issue. That said, I switched away from it a long time ago, and I forgot why.
