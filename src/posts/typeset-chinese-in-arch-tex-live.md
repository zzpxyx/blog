---
title: Typeset Chinese in Arch TeX Live
publishDate: 2024-04-22
updateDate: 2024-05-07
---

I've changed my TeX Live setup again to accommodate typesetting Chinese.

Recently, I wanted to typeset a Chinese document. It has been years since the last time I did that. Not surprisingly, pdfLaTex still doesn't support CJK characters out of the box. I remembered using XeLaTeX with the CTeX package back then, so I tried to do the same this time. As mentioned in my [previous post](/posts/switching-to-arch-linux-tex-live/), I use the modified `tlmgr` to manage one-off TeX packages. However, using it to install the CTeX package gave me some critical errors about not being able to install binary files in `tlmgr` user mode. Apparently, it's time to put an end to this.

I'd like to clarify my goals here. First of all, I'd like to be able to typeset Chinese. In addition, I still want to compile my resume, which uses some extra fonts. After some trial and error, here is how I achieved both goals.

I started with the minimum number of Arch TeX Live packages. If I'm missing one of those, I will see errors like font not loadable or missing style files. This time I've decided to bite the bullet and install the huge extra font package since I'm all in Arch TeX Live packages. Here is the list that worked for me:

- `textlive-langchinese`, which pulls in some additional Arch TeX Live packages like `texlive-bin` and `texlive-basic`.
- `texlive-latex`, for solving the missing `expl3` issue.
- `texlive-latexrecommended`, for getting the `fontspec` package.
- `texlive-latexextra`, for getting the `titlesec` package.
- `texlive-fontsrecommended`, for getting basic fonts like Latin Modern.
- `texlive-fontsextra`, for getting the extra fonts like Raleway.

As part of the transition, I no longer need to use the modified `tlmgr` so I removed the alias that specified the user mode for it.

Now, on one hand, I can use XeLaTeX plus the CTeX package to typeset a Chinese document. On the other hand, I can use pdfLaTeX to compile my resume. It's beyond my knowledge why I can't use XeLaTeX to build my resume. I guess it's because different TeX engines require different setups for fonts, but what do I know?

**Updates on 2024-05-07:** Now, I recall something. The extra fonts like Raleway in the Arch TeX Live package didn't work out of the box in my case. It seemed to be caused by something in the user texmf tree from my previous install. I deleted `~/texmf` completely, and the issue was resolved. Maybe I also ran `sudo updmap-sys --syncwithtrees`? Just in case it helps.
