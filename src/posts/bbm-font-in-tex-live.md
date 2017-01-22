---
title: bbm Font in TeX Live
publishDate: 2017-01-22
---

As a newbie in LaTeX, I just found that bbm and bbm-macros packages should be installed together.

I was trying to compile a LaTeX document using a customized TeX Live 2016. There was an error message about missing `bbm.sty`. Naively, I thought installing the bbm package would solve the problem. I tried, but the same error message appeared again.

After searching around, I got a hint about the bbm-macros package. I gave it a try by simply installing it, and it worked perfectly. It seems that the bbm package includes the fonts, and the bbm-macros package is for LaTeX support.

Another lesson learned is about the search options in TeX Live Manager. I was using the following line to search for bbm-related packages after installing the bbm package, and the result only showed bbm.

```bash
tlmgr search bbm
```

Later I learned that this would only search for the *installed* packages. To also search for uninstalled packages, I should have used this:

```bash
tlmgr search bbm --global
```
