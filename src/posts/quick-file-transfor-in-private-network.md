---
title: Quick File Transfer in Private Network
publishDate: 2022-10-17
---

Recently, I've realized a quick way to transfer some files within a private network.

Occasionally, I need to transfer some files from a MacBook to a Linux/Windows desktop. They are in the same private network. I always used a USB flash drive, and it worked just fine. The other day, I suddenly realized that a simple HTTP server could help since its directory listing is probably turned on by default. In other words, I can start an HTTP server at a certain directory on the MacBook, and then I can browser that directory's content using the MacBook's IP address in the desktop's browser. The fastest way I could think of starting such an HTTP server was to use the Python built-in one:

```bash
python3 -m http.server
```

It worked pretty well. If I need to transfer multiple files, I can always compress them into a single file first so that I don't have to download them one by one.

The same idea can be applied to other languages and runtime environments as long as there is an easy-to-start HTTP server and it can access local files.
