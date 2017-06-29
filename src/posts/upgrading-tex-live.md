---
title: Upgrading Tex Live
publishDate: 2017-06-29
---

Here is a memo for upgrading Tex Live.

It is the time of the year again -- upgrading Tex Live. Until we have a true rolling-released Tex Live, upgrading it will always mean reinstalling it. Below are some tips and pointers hoping to make the process less painful. Note that the memo is based on my personal preferences, so please take with a grain of salt.

# Uninstall
First things first. `tlmgr` can actually handle the uninstallation with just one line:

```bash
tlmgr uninstall
```

There may be some leftover folders here and there, but it shouldn't affect the reinstalling process.

# Install
Download the [install script](https://www.tug.org/texlive/acquire-netinstall.html) `install-tl` and execute it. Personally, I would start with the medium scheme and drop unwanted collections like various languages and utilities. I should keep LuaTex. Also remember to use letter size by default.

# Post-install
At the end of the script, it will mention that some environment variables contain the string "tex". That is expected since uninstalling Tex Live will not change the environment variables. Simply update the paths in `~/.bashrc` to contain the correct Tex Live version.

# Additional Packages
I also need some additional packages: `fontawesome`, `gillius`, `titlesec`, and `enumitem`. They can be installed via:

```bash
tlmgr install <package>
```

# Test
Test the newly installed Tex Live through previously typeset documents. Make sure that there is no error and the output should be almost identical as before.
