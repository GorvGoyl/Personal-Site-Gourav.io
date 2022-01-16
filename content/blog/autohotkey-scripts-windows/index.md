---
title: "Top AutoHotkey scripts to get more out of Windows"
desc: "Useful AutoHotkey scripts (Windows) for quick lookup, in-line calculator, remap keys, battery alert, and more."
date: "2022-01-18"
toc: true
mobileToc: true
---

import MoveInactiveWinScreen from "./MoveInactiveWinScreen.gif";
import autohotkey_ram from "./autohotkey_ram.png";
import battery_alert_charged from "./battery_alert_charged.png";
import battery_alert_low from "./battery_alert_low.png";
import in_line_calculator from "./in_line_calculator.gif";
import transform_text_menu from "./transform_text_menu.png";
import window_switcher from "./window_switcher.png";

## What's AutoHotkey

[AHK](https://www.autohotkey.com) is an [open-source](https://github.com/Lexikos/AutoHotkey_L) scripting software for Windows that is used to automate repetitive tasks, remap keys, build small utility tools, etc. You create scripts that would do the tasks for you. It's an extremely lightweight app (~ 2MB RAM) and works on old and newer versions of windows.

<Img src={autohotkey_ram} type="ss" caption="" />

### How to set up and run

- Download and install main program (one-time step) [https://www.autohotkey.com](https://www.autohotkey.com/)
- Download a [script (`.ahk`)](#useful-scripts) or copy-paste script content in a text file and then rename it with `.ahk` extension, e.g., `my-script.ahk`
- To run the script: Right-click -> `Run script`.
  You can also run scripts by double-click or do right-click ->`Open with` -> `AutoHotkey`
- Bonus: you can right-click and `Compile script` to make it a standalone `.exe` program that would run without installing AutoHotkey software on a computer.

### Autorun script at startup

Method 1:

- Open startup folder: open `Run` window by `Win+R` and then write `shell:startup` and enter.
- It'll open explorer at something like this path: `C:\Users\{username}\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup`
- Copy a script (`*.ahk`) -> go to that `Startup` folder -> right-click and select `Paste shortcut`.

OR

Method 2:

- Put [`script_autorun_startup.vbs`](https://github.com/GorvGoyl/Autohotkey-Scripts-Windows/blob/master/script_autorun_startup.vbs) at startup folder. Make sure to put the correct path of your ahk scripts in that file first.

### AHK communities to get help

- https://www.reddit.com/r/AutoHotkey/
- https://www.autohotkey.com/boards/

## Useful Scripts

> You can see all scripts here: [https://github.com/GorvGoyl/Autohotkey-Scripts-Windows](https://github.com/GorvGoyl/Autohotkey-Scripts-Windows)

### Look up selected text

script: [look_up.ahk](https://github.com/GorvGoyl/Autohotkey-Scripts-Windows/blob/master/look_up.ahk)

use `alt+g` to open selected text in the browser and do a google search or visit the site (if it's url). It's one of the most frequent scripts I use on a regular basis. Especially to quickly google some error from the terminal when programming. Works everywhere.

**Assign a different shortcut:**

To assign a different shortcut, replace `!g` (here `!` means `Alt` so `!g` = `Alt+G`) in the script with your desired [key combo](https://www.autohotkey.com/docs/Hotkeys.htm#Symbols) and run again. All running scripts can be found in the Windows tray menu.

To use a different browser instead of Microsoft Edge, Add its path instead of `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe` in the script.

### Use Win key as mouse left-click

script: [mouseless.ahk](https://github.com/GorvGoyl/Autohotkey-Scripts-Windows/blob/master/mouseless.ahk)

This little script has been a game-changer for me. I don't like to carry a mouse around, and my HP laptop touchpad isn't much responsive, so I needed a better alternative to performing left-click. I realized I don't use the left `Win` key as much, so I modified its action to do left-click instead (using left-thumb). Once you get the hang of it, I assure you you'll do clicks with godspeed.

I still needed the `Win` key, so I replaced the rarely used `right Ctrl` key as `Win` key.

To sum-up:  
Win → Mouse Left-click  
Right-Ctrl → Win

### Show notification on low battery or when fully charged

script: [battery_alert.ahk](https://github.com/GorvGoyl/Autohotkey-Scripts-Windows/blob/master/battery_alert.ahk)

> Keeping your laptop constantly plugged in shortens the battery life!

If the battery is below 30% and the charger is not plugged in, it'll show a silent notification on the bottom-right corner to plug in the charger. Notification will pop up every few minutes until you take action.

<Img src={battery_alert_low} type="ss" caption="" />

And, if the laptop is charged and the charger is still plugged in, it'll show a silent notification on the bottom-right corner to remove the charger. Notification will pop up every few minutes until you take action.

<Img src={battery_alert_charged} type="ss" caption="" />

### Show popup to transform text

script: [ctrl_caps_as_case_change.ahk](https://github.com/GorvGoyl/Autohotkey-Scripts-Windows/blob/master/ctrl_caps_as_case_change.ahk)

Use `ctrl+capslock` to invoke a handy transform text menu on selected text e.g., convert text to UPPERCASE/lowercase/Title Case etc. Press `esc` to close the menu.

<Img src={transform_text_menu} type="ss" caption="" />

### Show Windows switcher with capslock key

script: [caps_as_window_switcher.ahk](https://github.com/GorvGoyl/Autohotkey-Scripts-Windows/blob/master/caps_as_window_switcher.ahk)

If you don't use `capslock` key much, you could replace it to show Windows switcher (e.g., Alt + Tab) instead. You'd still be able to turn on/off capslock with `shift+capslock` combo.

To sum-up:  
Capslock → Alt+Tab  
Shift+Capslock → Capslock

<Img src={window_switcher} type="ss" caption="" />

### Create new text file here

script: [create_file_here.ahk](https://github.com/GorvGoyl/Autohotkey-Scripts-Windows/blob/master/create_file_here.ahk)

Windows has a shortcut (`ctrl+shft+n`) to create an empty folder at the current location but not for creating a new file. So, I made a script to do exactly that. Use `ctrl+shift+m` to create an empty text file (NewFile.txt) at the current folder location in file explorer.

### Open PowerShell here

script: [open_shell_here.ahk](https://github.com/GorvGoyl/Autohotkey-Scripts-Windows/blob/master/open_shell_here.ahk)

Use `ctrl+shift+p` to open PowerShell with the current folder path in file explorer.

### In-line calculator

script: [in-line calculator.ahk](https://github.com/GorvGoyl/Autohotkey-Scripts-Windows/blob/master/in-line-calculator/in-line%20calculator.ahk)

Activate the calculator by `=` then write your equation and finally type `=` again to get the calculation result. Works everywhere.

<Img src={in_line_calculator} type="ss" caption="" />

Use `#` key at the end instead of `=` to keep the equation and the result (output: `7*5+5 = 40`).

See more info in [README file](https://github.com/GorvGoyl/Autohotkey-Scripts-Windows/blob/master/in-line-calculator/readme.md).

### Drag window without activating it

script: [MoveInactiveWin.ahk](https://github.com/GorvGoyl/Autohotkey-Scripts-Windows/blob/master/move-inactive-window-alt-leftclick/MoveInactiveWin.ahk)

Hold `alt+right-click` to move a window without activating it.

<Img src={MoveInactiveWinScreen} type="ss" caption="" />

### Disable zoom when `ctrl+scroll` in the browser

script: [disable_scroll_zoom_edge.ahk](https://github.com/GorvGoyl/Autohotkey-Scripts-Windows/blob/master/disable_scroll_zoom_edge.ahk)

Disable zoom when doing ctrl+scroll in Edge browser. To use different application, replace `Microsoft Edge` with other application title in the ahk script.

### Hot corner

script: [left_edge_as_window_switcher.ahk](https://github.com/GorvGoyl/Autohotkey-Scripts-Windows/blob/master/left_edge_as_window_switcher.ahk)

Trigger `Alt+Tab` (Window switcher) when the mouse is on the left edge of the screen. Keep the mouse there to tab through the other windows.

### Pin window at the top

script: [pin_window.ahk](https://github.com/GorvGoyl/Autohotkey-Scripts-Windows/blob/master/pin_window.ahk)

Use `ctrl+alt+p` to pin/unpin current window at top. Super handy.

### Win key to show taskbar

script: [win_key_to_show_taskbar.ahk](https://github.com/GorvGoyl/Autohotkey-Scripts-Windows/blob/master/win_key_to_show_taskbar.ahk)

It shows the taskbar only when the `Win` key is pressed; otherwise, it stays hidden.

## Contribute

👋 Got some sick ahk script you'd like to add to the list? Please [edit here and submit your changes](https://github.com/GorvGoyl/Personal-Site-Gourav.io/blob/main/content/blog/autohotkey-scripts-windows/index.md).
