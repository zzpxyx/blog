---
title: SDL2 Renderer Error
publishDate: 2017-09-05
---

Long story short, remember to reboot after updating the graphics driver, especially before doing development in SDL2.

I have an SDL2 demo program that worked well yesterday, but it suddenly stops working today. `SDL_GetError()` shows an error of "Couldn't find matching render driver" in `SDL_CreateRenderer()`. Online searching shows some suggestions about checking the graphics driver. I didn't make any change in my graphics driver today, did I? Well, let's see. `pacman` log shows that I did update the nVIDIA driver package. After rebooting, the demo program works again. I'm not sure why but updating the driver package makes SDL2 think that I don't have a proper driver that supports hardware acceleration, although I'm using my window manager and other stuff just fine. Maybe this is a special one-time case, but I'll just jot it down here for memo.
