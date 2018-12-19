---
title: Turn It Off and On Again
publishDate: 2018-12-18
---

Turning it off and on again can solve numerous problems. Here is an on-going collection of such issues.

# SDL2
[As mentioned previously](/posts/sdl2-renderer-error/), SDL2 may give some errors after updating the display driver without a reboot.

# VPN
Updating VPN-related packages without a reboot may give errors like:

``` bash
mkdir: cannot create directory '/var/run/vpnc': Permission denied
```

Or

``` bash
Failed to open tun device: No such device
```

# Monitor
Recently, I've also encountered a weird issue on the ASUS MX279H monitor. It just turned on with a blank black screen, turned off immediately, and then repeated. I tried manually turning it off and on with the touch power button, but it didn't help. Finally, I had to unplug the power cord and re-plug it again. This time the monitor went back to normal.
