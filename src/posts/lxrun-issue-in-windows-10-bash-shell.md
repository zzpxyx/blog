---
title: LxRun Issue in Windows 10 Bash Shell
publishDate: 2016-08-03
---

I've just found a workaround for an issue of setting the default user in Windows 10 Bash shell.

During installation of Windows 10 Bash shell, there is a step to set or create the default user. It's equivalent to executing the following command:

```Bash
LxRun.exe /setdefaultuser <username>
```

If the Temp folder is not accessible, either because of privilege or unsupported file systems like RAM disk, an error message will appear:

```Bash
/bin/bash: /mnt/d/TEMP/uid.txt: No such file or directory
```

Or

```Bash
/bin/bash: /mnt/c/WINDOWS/TEMP/uid.txt: No such file or directory
```

The first error message appears when my Temp folder is on a RAM disk, and the second appears when I'm using the system-level Temp folder (`C:\Windows\Temp`).

The workaround is fairly simple. Just move the Temp folder to somewhere accessible, such as `%USERPROFILE%\AppData\Local\Temp`.

By the way, I've submitted an [issue](https://github.com/Microsoft/BashOnWindows/issues/752) for this on GitHub.
