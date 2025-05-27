---
title: Use Correct USB Port
publishDate: 2025-05-26
---

This is a memo to myself that I should use the correct USB port for a USB 3.0 flash drive.

The other day I plugged a USB 3.0 flash drive into the USB port on the front panel of my desktop. It didn't mount. Instead, it gave an error that looked like `device descriptor read/64, error -110`. I didn't know how I acquired this knowledge but my first thoughts were about insufficient USB power supply. I switched the flash drive to one of the back USB ports, which are directly from the motherboard. It didn't solve the issue. Weird.

I did some searching on the internet and the most relevant content was [this post](https://forum.zorin.com/t/usb-descriptor-read-64-error-32/4718/2), which also suggested power issues. I tried a different back USB port, and it worked this time. I suddenly remembered that on the back there are a mixture of USB 2.0 and USB 3.0 ports, and I should probably use the USB 3.0 port.

The issue is solved for now, but I don't know the root cause. This exact flash drive used to work on the front panel USB port in Linux, and in Windows it has always worked without issues no matter where it is plugged in. I'm not sure what has changed.
