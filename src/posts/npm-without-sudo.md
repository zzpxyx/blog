---
title: npm Without Sudo
publishDate: 2017-12-05
---

Recently, I have to reinstall npm. It's a good time to jot down how to install npm locally so that no sudo is required when using npm.

The whole story begins with this [issue](https://github.com/npm/npm/issues/19019). Basically, on my machine, npm 5.5.1 crashes every time when I try to update or install packages for Node.js 9.2.0. The solution is to uninstall npm and reinstall it with a higher version like 5.6.0.

It's debatable whether npm should be installed locally in the user home directory or at the system level. Personally, I prefer not using sudo for npm.

Here is the main [reference](https://stackoverflow.com/questions/10081293/install-npm-into-home-directory-with-distribution-nodejs-package-ubuntu/13021677#13021677) on how to do this. For me, I did the following steps:

1. Add `prefix=~/.npm-packages` to `~/.npmrc`.
2. Add the following lines to `~/.xprofile`:
    ```bash
    # Tell npm about the packages:
    export NPM_PACKAGES="$HOME/.npm-packages"
    # Tell Node.js about the packages:
    export NODE_PATH="$NPM_PACKAGES/lib/node_modules"
    export PATH="$NPM_PACKAGES/bin:$PATH"
    export MANPATH="$NPM_PACKAGES/share/man:$MANPATH"
    ```
3. Reboot so that the new environment variables take effect.
4. Download the npm module from [here](https://docs.npmjs.com/getting-started/installing-node).
5. Install npm using the normal way: `./configure`, `make`, and `make install`.

Note that the environment variable settings and where to put them are specific to my machine. You might have to change them to fit in your system.
