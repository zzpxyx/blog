---
title: Repurposing a 2014 MacBook Air
publishDate: 2026-04-05
---

Recently, I've managed to repurpose an old 2014 MacBook Air into a Linux home server.

I have a 2014 MacBook Air whose battery performance has deteriorated and the last available macOS version feels very sluggish on it. Its official trade-in value has gone down to zero. However, it is still a functioning computer, so I want to repurpose it as a home server to beef up [my home computing power](/posts/repurposing-an-old-android-phone/).

**An obliged warning first.** It is very dangerous to keep a lithium-ion battery plugged in all the time especially if the battery is old. The battery could swell or even explode. I could afford this because I'm watching the MacBook Air closely with periodic battery checks.

At first I tried to use the MacBook Air as is for a home server. The macOS 11 Big Sur is slow for daily GUI-based tasks, but it is not that bad if I just SSH into it. The major blocks are the security concerns and the limited software repos. I'm afraid of security issues in old macOS versions even though I only plan to use the server internally. Homebrew no longer has pre-built packages for this macOS version. Also, I'm interested in trying Linux on a MacBook, so I wiped the macOS and started from scratch.

I joined the bandwagon and chose Ubuntu Server 24.04.4 LTS as the distro. The installation process was fine overall with a few bumpy spots. First, I used KDE ISO Image Writer to create a bootable installation media. I ran into a "last block not fully written" error. [This post](https://www.reddit.com/r/kde/comments/1gh2hst/comment/luv6na7) provided the correct solution. In short, I should not mount the USB device. Second, the 2014 MacBook Air needed a proprietary Broadcom WiFi driver. I chose "set up network later" in the installation wizard but it was so hard getting a WiFi connection later on. I gave up eventually after intense trial and error, and restarted the installation wizard with a USB WiFi dongle. Third, it took me a while to understand what was going on in the disk partition step.

The machine was usable immediately after the installation finished. Ubuntu Server has some sane defaults like disabling the root account by default. This saved quite a bit of initial system administration work. I did some enhancements nonetheless as documented below.

**Limit charging threshold for the battery.** I installed the `tlp` package and used [this patch](https://github.com/c---/applesmc-next) to limit the charging threshold to 50%. Better to be cautious about batteries.

**Switch to the internal network adapter.** I installed the `bcmwl-kernel-source` package for the internal WiFi adapter. Then I created a new WiFi config file with the same structure as the old one `/etc/netplan/50-cloud-init.yaml` which contained the configuration for the USB WiFi dongle used during installation. After that, I removed the old config file.

**Keep it awake.** I made the following drop-in config for logind. Now, closing the lid won't trigger hibernation.

```ini
[Login]
HandleLidSwitch=ignore
HandleLidSwitchExternalPower=ignore
```

**Shut down the screen.** I added the following kernel parameter in `/etc/default/grub` to shut down the screen after 30 seconds of inactivity.

```ini
GRUB_CMDLINE_LINUX_DEFAULT="consoleblank=30"
```

**Use certificates for SSH.** I chose password authentication during the installation process for simplicity, but I wanted to change that post install. To do this, I removed the default `/etc/ssh/sshd_config.d/50-cloud-init.conf` and used the following drop-in config instead.

```text
PasswordAuthentication no
```

Now, the MacBook Air is functioning as a Linux home server. I tried Jellyfin and it worked very well. I migrated my [security camera setup](/posts/sharing-security-camera-view/). It is a long story and I'll share more some other day.

I even used a watt meter to gauge its power consumption. The average power is about 8W. The Android phone server is about 1W, give or take. The MacBook Air server is definitely not ideal compared to modern hardware, but it is indeed cost-effective compared to buying new.
