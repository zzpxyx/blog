---
title: Switching to Arch Linux TeX Live
publishDate: 2020-01-05
updateDate: 2023-06-19
---

I've just switched my TeX Live distribution from the official one to the one on the Arch Linux repository.

I was just updating the packages routinely on Arch Linux, and I noticed that Texmaker now requires `texlive-core`, which in turn requires `texlive-bin`. This was problematic for me since I had already installed the official TeX Live distribution. This not only took more disk space, but also broke the functionality. For example, I was no longer able to compile my resume. My guess was that the new install somehow affected the TeX Live file tree and some style files were considered missing.

Up to this point, I had two options. I could uninstall Texmaker and its TeX Live dependencies, then reinstall Texmaker from another source and use it with the existing official TeX Live distribution on my machine. Alternatively, I could uninstall the official distribution and switch to the Arch Linux packaged version of TeX Live. Either option should work. I was just curious about the latter option, so I chose to give it a try. In addition, I had already changed my resume template to [my custom one](https://github.com/zzpxyx/two-column-resume) long time ago, and it no longer needed unofficial fonts or stuff, so switching to another TeX Live distribution would only require installing missing CTAN packages.

First of all, I uninstalled the official distribution by:

```shell
tlmgr uninstall --all
```

There were some errors about write permission, but I did some quick check and the errors seemed benign. Then I installed `texlive-latexextra` for some commonly used LaTeX packages. After that, I tried to compile my resume and saw that some fonts were missing as expected. A quick search showed that I should install `texlive-fontsextra`. It would take over 1 GB of disk space since it included tons of fonts. I'm not a fan of this, so I chose to use [tllocalmgr](https://wiki.archlinux.org/index.php/TeX_Live#tllocalmgr) to manually install missing CTAN packages. After some trial and error, I ended up with installing these CTAN packages: `raleway`, `mweights`, `droid`, `fontawesome`, and `ly1`. However, no PDF file was generated at the end of compile, and Texmaker didn't report any obvious error. The log did show that some fonts were missing. `tllocalmgr` mentioned that I should check its log and modify the `updmap.cfg` file as needed. After some trial and error again, I found that I would need to add the font maps like below for the fonts mentioned in the `tllocalmgr` log file.

```shell
updmap-sys --enable Map=Raleway.map
updmap-sys --enable Map=droidsans.map
updmap-sys --enable Map=droidsansmono.map
updmap-sys --enable Map=droidserif.map
updmap-sys --enable Map=fontawesome.map
```

I'm still a newbie for TeX Live, so what I did here may not be the best practice. After that, the compile worked and generated a PDF file.

I used [diff-pdf-visually](https://pypi.org/project/diff-pdf-visually/) to compare the two PDF files from the two TeX Live distributions, and the tool reported no visual difference. I would take this as a sign of victory. If I'm understanding it correctly, I would no long need to upgrade TeX Live like [my previous post](../upgrading-tex-live).

**Updates on 2023-06-19:** The TeX Live packages on Arch Linux have been [reorganized](https://archlinux.org/news/tex-live-package-reorganization/), and `tllocalmgr` no longer works. At this time, I'm using the `tlmgr` fix in the [ArchWiki](https://wiki.archlinux.org/title/TeX_Live#tlmgr) for installing additional packages from CTAN.
