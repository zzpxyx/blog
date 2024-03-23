---
title: Be Aware of Pre-Configuration in VPS
publishDate: 2023-06-10
---

Be aware of the pre-configuration that may happen on a virtual private server (VPS) instance.

Recently, the tipping point has come for me to set up my own RSS aggregator. I've paid for a cheap VPS to host a [FreshRSS](https://www.freshrss.org/) instance. I just spun up a Docker container for FreshRSS, and I was immediately faced with some network issues. I used the technique in [this post](/posts/quick-file-transfor-in-private-network/) to confirm that the host machine and the firewall were working as expected, so I was totally puzzled.

Eventually, I came to [this post](https://forums.docker.com/t/docker-bridge-networking-does-not-work-in-ubuntu-22-04/136326) where folks were talking about Docker network and some network pre-configuration. It applies to my situation as well. Essentially, my VPS provider uses `cloud-init` to pre-configure `netplan`, which in turn is in charge of configuring network settings on Ubuntu 22.04 LTS during the boot. My limited understanding here is that the settings it generates forces all network interfaces to go through DHCP, which affects Docker's default bridge networking. As mentioned in that post, one solution is to only force the network interfaces with names like `en*`, so Docker's `docker0` won't be included.

Following the lead, I also found some other pre-configured settings here and there on the host. I guess that's the norm for VPS now. The lesson learned here is that if I don't know why some behavior is unexpected on a VPS host I should check if it's pre-configured in some way.
