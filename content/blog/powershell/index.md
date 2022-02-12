---
title: "Power up your PowerShell with customizations and handy custom commands"
desc: "Setup PowerShell to add many useful custom commands, show git repo status, autocomplete commands, and more."
date: "2022-02-12"
toc: true
mobileToc: true
comments: true
---

import powershell_autocomplet_commands from "./powershell_autocomplet_commands.gif";
import powershell_oh_my_posh from "./powershell_oh_my_posh.png";
import powershell_settings from "./powershell_settings.png";

Download the latest PowerShell if you haven't: [https://github.com/powershell/powershell#get-powershell](https://github.com/powershell/powershell#get-powershell)

### Prerequisite

Any configuration or custom command needs to be written to the PowerShell Profile e.g. `Microsoft.PowerShell_profile.ps1` in order to keep the changes persistant across PS sessions.

Run `$profile` in PowerSehll to get the location of Profile `Microsoft.PowerShell_profile.ps1` (if it exists).

If the Profile doesn't exist then create an empty text file named `Microsoft.PowerShell_profile.ps1` (note: file extension should be `.ps1`) at your PowerShell installation location e.g. `C:\Program Files\PowerShell\7\`.

Learn more about [profiles](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_profiles).

## Customize PowerShell

### Autocomplete commands

Use up or down arrow keys to complete commands from history.

Paste below to `Microsoft.PowerShell_profile.ps1` (see [prerequisite](#prerequisite) to find location of this file)

```bash
Set-PSReadlineKeyHandler -Key UpArrow -Function HistorySearchBackward
Set-PSReadlineKeyHandler -Key DownArrow -Function HistorySearchForward
```

<Img src={powershell_autocomplet_commands} type="ss" caption="" />

### Display current Git repo status and more in prompt

We'll be using OhMyPosh to show various info in PowerShell prompt: https://ohmyposh.dev/.

<Img src={powershell_oh_my_posh} type="ss" caption="" />

1. Run this command from powershell to install `ohmyposh` module:

```
Install-Module oh-my-posh -Scope CurrentUser -AllowPrerelease
```

2. Install font that supports glyphs (icons) from https://www.nerdfonts.com/.  
   I like [Meslo LGM NF](https://github.com/ryanoasis/nerd-fonts/releases/download/v2.1.0/Meslo.zip).

3. Set that font in powershell defaults settings:

<Img src={powershell_settings} type="ss" caption="" />

4. Copy below to `Microsoft.PowerShell_profile.ps1` set theme (same as screenshot):

```
Set-PoshPrompt -Theme aliens
```

You can choose other theme also. see preview by running `Get-PoshThemes`

Now open powershell at location containing git repo and you'll see the status.

### Use ctrl+backspace to delete words in VSCode integrated terminal

When using PowerShell as an integrated terminal in VSCode, `ctrl+backspace` combo doesn't delete words. `ctrl+backspace` is somehow mapped to `ctrl+w` and we need to override this mapping.

Copy below to `Microsoft.PowerShell_profile.ps1`:

```bash
if ($env:TERM_PROGRAM -eq "vscode") {
  Set-PSReadLineKeyHandler -Chord 'Ctrl+w' -Function BackwardKillWord
}
```

## Custom PowerShell commands

### Open PowerShell profile in Notepad

Paste below to `Microsoft.PowerShell_profile.ps1`:

```markdown
#OPEN PROFILE IN NOTEPAD
function open-powershell{
notepad $PSHOME\Microsoft.PowerShell_profile.ps1
}
```

Now, you can run `open-powershell` command in PS to quickly open the profile in Notepad instead of first going to the location and then opening it in the text editor everytime.

### Create a new file with touch command

Command: `touch hey.js`

```bash
function touch
{
    $file = $args[0]
    if($file -eq $null) {
        throw "No filename supplied"
    }

    if(Test-Path $file)
    {
        throw "file already exists"
    }
    else
    {
        # echo $null > $file
        New-Item -ItemType File -Name ($file)
    }
}
```

### Git add, commit, push with a single command

Command: `gitacp added this cool new feature` (note: quotes are not required if there’s no special character in commit message)

```bash
function gitacp {
  param(
    [Parameter(ValueFromRemainingArguments = $true)]
    [String[]] $message
  )
  echo "> git add ."
  git add .

  echo "> git commit -a -m "$message""
  git commit -a -m "$message"

  echo "> git push"
  git push
}
```

### Git amend to the latest commit

Forgot something you wanted to add to the last commit? Run `gitaap` to quickly add + amend + push to the latest commit.

```bash
function gitaap {

  echo "> git add ."
  git add .

  echo "> git commit --amend --no-edit"
  git commit --amend --no-edit

  echo "> git push --force"
  git push --force
}
```

### Checkout Github PR with one command

It Requires Github CLI: [https://cli.github.com/](https://cli.github.com/)

Command: `gitpr`

If `gitpr` command is used without PR number then it’ll give the list of active PRs.

If command is used with PR number e.g. `gitpr 12` then it’ll check out PR #12

```bash
function gitpr {
  param(
    [Parameter(ValueFromRemainingArguments = $true)]
    [String[]] $prNum
  )

  if($prNum){
  git fetch origin pull/"$prNum"/head && git checkout FETCH_HEAD
  git reset main
  git switch -
  echo "checked out PR: "$prNum""
  }else{
  gh pr list
  }
}
```

### Change Git branch

Command: `gitb master`

```bash
function gitb {
  param(
    [Parameter(ValueFromRemainingArguments = $true)]
    [String[]] $branch
  )

  git checkout "$branch"

}
```

### Git pull from a specific branch

Command: `gitpull master`

```bash
function gitpull {
  param(
    [Parameter(ValueFromRemainingArguments = $true)]
    [String[]] $branch
  )
  git pull origin "$branch"
}
```

### Get latest commit url

Command: `gitLatestCommitUrl`

Output: `[https://github.com/GorvGoyl/Personal-Site-Gourav.io/commit/3f43cf2de279ab59edd630d72456c477dcdf1898](https://github.com/GorvGoyl/Personal-Site-Gourav.io/commit/3f43cf2de279ab59edd630d72456c477dcdf1898)`

```bash
function gitLatestCommitUrl {
    return "$($(git config --get remote.origin.url) -ireplace '\.git$', '')/commit/$(git rev-parse HEAD)"
}
```

## Built-in PowerShell commands

### Locate location of PowerShell profile (Microsoft.PowerShell_profile.ps1)

Command: `$profile`

### Open current folder in File Explorer

Handy when working in VSCode and wants to open the present working directory in File Explorer.

Command: `ii .`

### Run multiple commands in parallel

add single `&` to run parallel scripts. (and use `;` to run sequentially)

Example: run 2 npm scripts in parallel: `npm run hotReload & npm run dev`

### Check if a site is down

Command: `curl -I gourav.io`

Output:

```
HTTP/1.1 308 Permanent Redirect
Date: Tue, 13 Apr 2021 20:29:43 GMT
Content-Type: text/plain
Connection: keep-alive
Location: <https://gourav.io/>
Refresh: 0;url=https://gourav.io/
server: Vercel
x-vercel-id: bom1::zfh9m-1618345783130-62d01e38e332
```

OR

Command: `Invoke-WebRequest <https://gourav.io>`

Output:

```
StatusCode        : 200
StatusDescription : OK
Content           : <!DOCTYPE html><html lang="en-US"><head><script async=""
                    src="<https://www.googletagmanager.com/gtag/js?id=G-JF3BSQ1LL2>"></script><script>
                                window.dataLayer = window.dataLayer || [];
                           …
RawContent        : HTTP/1.1 200 OK
...
...
```

## PowerShell Docs

- Profiles: [https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_profiles](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_profiles)
- Keybindings: [https://docs.microsoft.com/en-gb/previous-versions/powershell/module/psreadline/Get-PSReadLineKeyHandler](https://docs.microsoft.com/en-gb/previous-versions/powershell/module/psreadline/Get-PSReadLineKeyHandler)

-
