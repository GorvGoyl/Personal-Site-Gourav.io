---
title: "Git Cheatsheet"
desc: "Useful git commands for beginners like reverting commits, work between branches, manage PRs, and more"
date: "2021-10-28"
toc: true
mobileToc: true
---

### Jargon

- `remote` - remote means server like github, bitbucket, etc.

- `local` - your git repo stored in PC

- `remote repository` - your git repo stored on github, bitbucket, etc.

- `origin` - origin is _your_ remote repo (from where you did `git clone`)

- `upstream` - upstream is _their_ main repo (from which you have forked, useful to get latest changes from _their_ repo releases)

- `tag` - you can create a tag when doing software releases

- `main` - it's the head branch named `main` (default created branch for any new repo, earlier it was used to be `master`)

- `HEAD` - head always refers to the latest commit on your current branch.

- `fetch` - just download latest changes from a `remote` branch in separate path and do not integrate with your repo. `git merge` is required to integrate these changes

- `pull` - means getting latest changes from a remote branch into your branch (`git pull` = `git fetch` + `git merge`)
  To pull from your remote branch: `git pull`

  To pull from remote `main` branch: `git pull origin main`

- `commit` - means adding a record entry of your changes e.g. `git commit -m "added feature X"`

- `push` - means uploading your local `commits` to a remote server.
  To push commits to your remote branch: `git push`
  To push commits to remote `main` branch: `git push origin main`

- `merge conflict` - when you make changes to a file and someone else make some other changes to the same file and along the same line numbers you get merge conflict. Happens often during `pull`/`push` or merging a `PR`.

## Git workflows

- Option A: Clone main repo -> create a new branch -> do your thing -> send PR to `main` branch
- Option B: Fork from the main repo -> do your thing -> send PR

## Stage & Commit

```
git add . (stage ALL new,modified files)
```

```
git add -A (stage ALL new,modified,deleted files)
```

```
git add file1.txt file2.txt file3.txt
```

```
git add -i (interactive add/revert)
```

```
git commit -m 'fixed this and that'
```

#### Git append (commit using last commit msg)

```
git commit --reuse-message=HEAD
```

#### Git add+commit

- It also adds newly created files

```
git add -A ; git commit -m "Your Message" (powershell)
git add -A && git commit -m "Your Message" (bash)
```

## Push/Pull

```
git push origin
```

```
git push upstream
```

```
git push upstream/some_branch
```

```
git push origin HEAD (push local changes to remote branch with same name)
```

### Pull from main to dev branch

```
git pull origin main (pull latest changes from remote main branch into local dev branch)
```

### Push from one branch to another

```
git push origin from_branch:to_branch
```

### Download big repository on poor bandwidth

[https://stackoverflow.com/questions/34389446/how-do-i-download-a-large-git-repository/52090961\#52090961](https://stackoverflow.com/questions/34389446/how-do-i-download-a-large-git-repository/52090961#52090961)

####

## Remove untracked files from local and remote

1. add those files to `.gitignore`
2. `git rm -r --cached .`
3. `git add .`
4. `git commit -am "Remove ignored files"`
5. `git push`

## PR / Review

### create PR inside VSCode

- CLI: `gh pr create --fill` (need to install [Github CLI](https://cli.github.com/))

- GUI: use VSCode extension: [GitHub Pull Requests and Issues](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github)

- Github:

  1Visit repo on github.com and switch to your branch.

  2.  Go to `Pull requests` section -> `New pull request`

### List PRs

- `gh pr list`

### See all changes from a PR as uncommitted changes

Option A:

1. checkout PR (100) in 'detached HEAD' state
   `git fetch origin pull/100/head && git checkout FETCH_HEAD`
2. show as uncommitted changes
   `git reset main`
3. switch back to main branch and carry these changes
   `git switch -`

Option B:

- Install VSCode extension: [GitHub Pull Requests and Issues](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github).

## Branch

### checkout remote branch

(you can also enable `autofetch` in VSCode settings to avoid doing `git fetch` every time)

```
git fetch && git checkout branch_name
```

### Create local branch

code will be copied from current branch

```
  git checkout -b feature_x
```

### create local branch from some other branch

```
git checkout -b feature_x main
```

### push newly created branch to remote

branch is not available to github.com unless you push it separately

```
  git push --set-upstream origin feature_x
```

### Add Remote branch

origin is your repo on github.com

```
  git remote add origin https://github.com/user/repo.git
```

### Add upstream

upstream is their main repo from which you have forked

```
  git remote add upstream https://github.com/their_user/repo.git
```

### Create new local version branch of an upstream branch

```
  git checkout -b feature_x upstream/main (main is the branch name)
```

### switch branch

```
  git checkout feature_x
```

### delete the branch

```
git branch -d feature_x
```

### Get URL of Github repo

```
git remote show origin
```

### Change origin (link to different repo URL on github)

```
git remote set-url origin new.git.url
```

## Uncommitted changes

### Git pull without committing local changes

- hide your local uncommitted changes temporarily

```
git stash -u (-u means --include-untracked)
```

- show all stashes

```
git stash list
```

- get latest changes

```
git pull
```

- now unhide your local uncommitted changes
  (`pop` will restore only latest stash)
  `git stash pop` or `git stash apply`

`git stash pop` restore changes and also removes it from stack, `git stash apply` restores it but still keeps it on stack for possible later reuse (or you can then `git stash drop` it). So `git stash pop` is `git stash apply` && `git stash drop`

### move uncommitted changes to another branch

1. uncommitted changes do not belong to any branch so just switch branch

```
git checkout -b <new-branch>
```

2. Push this branch to remote

```
git push --set-upstream origin new-branch
```

3. Commit these changes or stash them to later pick it up

### Save uncommitted changes and switch branch

1. save uncommitted changes to stack for current branch stack

```
git stash -u (-u means --include-untracked)
```

2. checkout different branch

```
git checkout B
```

3. Recover stash
   To pop stashed changes from previous `A` branch

```
git checkout A
git stash apply (will recover changes from last stack)
```

- To see all stashes
  `git stash list`

### clone uncommitted changes to new branch

1. save uncommitted changes to stack for current branch stack

```
git stash -u (-u means --include-untracked)
git stash apply (will recover changes from last stack)
```

2. carry these changes to `new_branch` and do your work

```
git checkout -b new_branch
```

3. To recover stashed changes from previous `A` branch

```
git checkout A
git stash apply
```

- To see all stashes
  `git stash list`

## Repo Status

```
git status
```

### Show latest commits

to exit type q

```
 git log
```

### Display current branch name

```
  git branch
```

## Git GUI (free)

### Windows

- [Fork](https://git-fork.com/)

### Mac

- [Fork](https://git-fork.com/)

### Built-in git GUI

```
gitk
```

### Git interactive commands

```
git add -i
```

### use colorful git output

```
git config color.ui true
```

## I fucked up

### Add new changes to last commit

- If you pushed last commit to remote

```
git add .
git commit --amend --no-edit (`--no-edit` to keep last commit msg)
git push --force
```

- If you didn't push the commit to remote

```
git reset HEAD^
```

Then add all files and commit again

### Resolve Merge Conflicts

revert all my changes and pull latest from `main`

```
git reset --hard HEAD
git pull -s recursive -X theirs upstream branch_remote
```

### Discard all uncommitted changes (local)

`git checkout .`

### Revert last local commit but keep the changes in my pc

`git reset HEAD^`

### Revert last remote commit (remote, untraceable)

1. Get that commit to local
   `git pull`

2. Remove commit locally
   `git reset HEAD^`

3. Force-push the last HEAD commit to remote
   `git push origin +HEAD`

### Revert all local changes and local commits (local)

fetch the latest history from the remote and point your local master branch at it

```
git fetch origin git reset --hard origin/main (main is the branch name)
```

### Reset `dev` branch to `main`

```
git reset --hard origin/main
git pull origin main
git push -f
```

### Clean up a fork and restart it from the upstream

```
git reset --hard upstream/main (main is the branch name of original repo)
git push origin my_branch --force (or git push origin HEAD --force)
```

## git Users

### Set

```
git config --local user.name "localuser"
git config --local user.email "localuser@example.com"
git config --global user.name "globaluser"
git config --global user.email "globaluser@example.com"
```

### Get

```
git config --local user.name
git config --local user.email
git config --global user.name
git config --global user.email

git config --list
```

## Remember Me

### Remember username & password

1. Secured Way (Store globally)

```
    git config --global credential.helper manager //secured way for Windows

    git push http://example.com/repo.git
    Username: <type your username once>
    Password: <type your password once>
```

2. Unsecured way (Store globally)

```
    git config credential.helper store //username & password stored in plain-text in "%UserProfile%\.git-credentials"
    git push http://example.com/repo.git
    Username: <type your username once>
    Password: <type your password once>
```

3. Unsecured way (Store locally per repo)

```
    //saved in file 'cred' inside repo .git folder. Need to manually delete this file.
    git config credential.helper 'store --file=.git/cred'
```

4. Secured Way (Store in Cache)

```
    git config credential.helper 'cache --timeout=864000' // 10 days expiry
    git credential-cache exit // remove it from cache before timeout
```

### Remove credentials

```
git config --unset credential.helper
git config --local --unset credential.helper
git config --global --unset credential.helper
git config --system --unset credential.helper
//Windows: delete from Control Panel\User Accounts\Credential Manager
```

## Misc

#### markdown cheatsheet

- [https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

## Contribute to this cheatsheet

👋 If you'd like to collaborate on this, please [edit here and submit your changes](https://github.com/GorvGoyl/Personal-Site-Gourav.io/blob/main/content/blog/git-cheatsheet/index.md).
