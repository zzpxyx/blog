---
title: Rclone in Termux on Android 6
publishDate: 2025-05-25
---

Recently, I've had a couple of lessons learned when running Rclone in Termux on Android 6.

A bit of background story. I've been using an old Android phone as a tiny home server as mentioned in [my previous post](/posts/repurposing-an-old-android-phone/). It has been running an old version of Rclone in Termux to [share a security camera view](/posts/sharing-security-camera-view/). Recently, something has changed on my cloud provider and Rclone gives an error about authentication when uploading files. I went on a journey of fixing the issues.

I need to test the most recent version of Rclone (version 1.69.2 at the time of investigation) as the issue is reported to have already been fixed. I was looking for an Android build of Rclone, but I couldn't find any that worked on Android 6. It took me quite a while before I realized that Termux not only is a terminal emulator but also installs a base Linux environment. In other words, I actually have an ARMv7 Linux-like system on the Nexus 5. I could just install the [ARMv7 build of Rclone](https://rclone.org/downloads/) and it may work. In fact, it worked perfectly (well, read on).

The next issue is about DNS resolver. Rclone thinks that it is running on an Linux system so it sends DNS requests to port 53. In Termux for Android 6, the commonly used DNS resolver like dnsmasq is not in the Termux package repo. I wanted to edit `/etc/resolv.conf` but it wasn't straightforward on an Android phone. After researching for quite a while, I found that Termux has its own `resolv.conf`, just not under the `/etc` folder. Then I learned that Termux [has differences from Linux](https://wiki.termux.com/wiki/Differences_from_Linux). In my case, it's missing the Filesystem Hierarchy Standard (all files and directories are under the root directory). Apparently, there is this magic command `termux-chroot` that can mimic the classic Linux file system layout as mentioned in that Termux wiki page.

The final issue is about SSL certificates. Up to this point, I could run Rclone with the option `--no-check-certificate` to bypass some x509 certificate error, but it was not safe to do so. I tried to upgrade the `ca-certificate` package in Termux and even manually installed certificates in the Android system, but it didn't help. After another long period of researching, I found that Termux has certificates installed in a different location. I just needed to point Rclone to them using `--ca-cert=/etc/tls/cert.pem`. It worked immediately.

It was quite a long run figuring out all the issues, but it was good learning experience. We'll see how far this tiny home server can go.
