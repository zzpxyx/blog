---
title: My Mac Productivity Setup
publishDate: 2021-07-07
---

Here is my productivity setup on a Mac. It is just a personal memo, not an endorsement or an advertisement.

### Tools and Apps

Here is a brief list of some productivity tools. Further sections will discuss combining them to achieve powerful workflows and setups.

- [Gmail Desktop](https://github.com/timche/gmail-desktop): a third-party Gmail client.
- [Rectangle](https://github.com/rxhanson/Rectangle): resize windows using keyboard shortcuts.
- [Karabiner-Elements](https://github.com/pqrs-org/Karabiner-Elements): keyboard customization, especially useful for remapping keys and define global hotkeys.
- [SwiftBar](https://github.com/swiftbar/SwiftBar): menu bar customization tool, similar to [BitBar](https://github.com/matryer/xbar).
- [SensibleSideButtons](https://github.com/archagon/sensible-side-buttons): enable system-wide navigation for mouse side buttons.
- [FSNotes](https://github.com/glushchenko/fsnotes): notes manager, similar to [Notational Velocity](https://notational.net/) and [nvALT](https://brettterpstra.com/projects/nvalt/).
- [Dozer](https://github.com/Mortennn/Dozer): hide menu bar icons.
- [Clipy](https://github.com/Clipy/Clipy): clipboard manager.
- [Mos](https://github.com/Caldis/Mos): smooth scrolling.
- [Itsycal](https://github.com/sfsam/Itsycal): menu bar calendar.

### Notes and Todo List (and CPU Temperature)

I use FSNotes for all my notes, including a special text file named `Todo.txt`. This file is a list of my todo tasks. I've written a simple SwiftBar plugin to show the number of lines in that file, indicating how many tasks are unfinished. If the plugin refreshes every 15 seconds, why not let it collect other data as well? So the actual plugin I use also captures the CPU temperature through [iStats](https://github.com/Chris911/iStats). The plugin looks like this:

```bash
#!/bin/bash

export GEM_HOME=~/.gem
temp=$(printf "%.0f" `$GEM_HOME/bin/istats cpu temp --value-only`)
speed=$($GEM_HOME/bin/istats fan speed --no-graphs --no-labels | head -n 1)

unread=`awk 'END{print NR}' ~/path/to/Todo.txt`
if [ $unread -gt 0 ]
then
    todo=":checkmark.square: $unread"
else
    todo=":checkmark.seal:"
fi

echo -e ":cpu: $temp\xc2\xb0C    $todo"
echo "---"
echo $speed
```

Note that those colon-wrapped words like `:checkmark.square:` are referring to [SF Symbols](https://developer.apple.com/sf-symbols/), as mentioned in SwiftBar [documentation](https://github.com/swiftbar/SwiftBar#parameters).

### Global Hotkeys

I like to define some global hotkeys so that I can switch to specific applications quickly. For example, I want to press Command+3 to switch to Gmail Desktop. I didn't find a good open source app to set global hotkeys on a Mac, so I used AppleScript and Karabiner-Elements as a workaround.

First of all, I use the following script to show and hide a specific application. Note that it will launch the application if it's not already launched.

```AppleScript
tell application "System Events"
    set names to name of application processes
    if names contains "Gmail Desktop" then
        tell application process "Gmail Desktop"
            if frontmost is true then
                set visible to false
            else
                tell application "Gmail Desktop" to activate
            end if
        end tell
    else
            tell application "Gmail Desktop" to activate
    end if
end tell
```

Then I define some "[complex rules](https://karabiner-elements.pqrs.org/docs/manual/configuration/configure-complex-modifications/)" in Karabiner-Elements:

```json
{
    "title": "Global Hotkey",
    "rules": [
        {
            "description": "Global hotkeys to launch applications",
            "manipulators": [
                {
                    "type": "basic",
                    "from": {
                        "key_code": "3",
                        "modifiers": {
                            "mandatory": [
                                "command"
                            ]
                        }
                    },
                    "to": [
                        {
                            "shell_command": "osascript ~/path/to/above.scpt"
                        }
                    ]
                }
            ]
        }
    ]
}
```

Note that the script file here is the compiled one, as [mentioned previously](/posts/compile-applescript-for-performace).