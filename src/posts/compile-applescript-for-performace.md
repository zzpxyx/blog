---
title: Compile AppleScript for Performance
publishDate: 2020-01-25
---

Recently, I've found that compiling an AppleScript file may help with its performance.

I have this arguably weird workflow on a Mac where I can press Command+2 and Command+3 to switch to specific applications. I didn't find any open source solution for it, so I had to create some custom AppleScripts and bind them to global hotkeys in Karabiner-Elements. The setup worked for me until I upgraded to macOS Catalina, where the performance of the scripts was noticeably degraded. I had to wait for a few seconds before the application switching to the foreground.

I have to use the command `osascript` to run my custom AppleScript when the designated hotkey is triggered. I was reading its manual for some inspirations, and I actually found one at the bottom of the man page: `osacompile`, which can compile AppleScripts. I gave it a try using `osacompile -x` which is said to save the resulting script as execute only.  It didn't let me down. The execution performance of my script was improved drastically.

This is not the end of the story though. I've noticed that although the performance is improved in general, it doesn't eliminate the problem. Sometimes I still have to wait for a while for the script to finish. My guess is that something about AppleScript is changed in macOS Catalina, like the script interpretor or the built-in script functions. Maybe something about intercepting keyboard inputs is also changed so that Karabiner-Elements is slowed down.

That said, the general idea here may be helpful in certain cases. Maybe the next time when I'm dealing with scripts, I'll remember to check if there is a way to compile them.
