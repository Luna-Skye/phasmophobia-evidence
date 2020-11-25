# Git Commit Message Convention
This is based on [Vue's own commit conventions](https://github.com/vuejs/vue-next/master/.github/commit-convention.md) and [Sepshun's Commit Conventions](https://gist.github.com/Sepshun/205bf5aef124527b65253bd06d8f6873)

---

## TL;DR:
Messages must be matched by the following regex:
``` js
/^(revert: )?(feat|fix|docs|style|refactor|perf|test|workflow|chore)(\(.+\))?: .{1,50}/
```

## Examples

##### Adds a feature to the EvidenceList component:
```
feat(EvidenceList): add disabled state for impossible types
```

##### Refactors the Visualizer component:
```
refactor(GhostInfo): rework computed method fetches
```

##### Fix bug in Button component:
```
fix(Button): improve href detection

close #28
```

##### Revert a previous commit

These will not be included within changelogs if the reverted commit and the reversion are both within the same release, however they'll be displayed if the reverted commit comes from a previous release.
```
revert: feat(EvidenceList): add disabled state for impossible types

This reverts commit 667ecc1654a317a13331b17617d973392f415f02.
```

---

## Full Message Format
A commit message should consist of a **header**, **body**, and **footer**. The header has a **type**, **scope**, and **subject**.
```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

### Revert
If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit. In the body, it should say: `This reverts commit <hash>`, where the hash is the SHA of the commit being reverted.

### Type

If the prefix is `feat`, `fix` or `perf`, it will appear in the changelog. However, if there is any [BREAKING CHANGE](#footer), the commit will always appear in the changelog.

Other prefixes are up to your discretion. Suggested prefixes are `docs`, `chore`, `style`, `refactor`, and `test` for non-changelog related tasks.

#### Allowed Types
* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Changes to documentation
* **style**: Changes that don't affect the meaning of the code (formatting, white-space, etc.), not to be confused with actual CSS styles.
* **refactor**: A code change that neither fixes a bug nor adds a feature... (what does this even cover?)
* **perf**: A code change that improves performance
* **test**: Add missing E2E/Unit tests
* **workflow**: Alters the workflow or developer experience
* **chore**: Changes to the build process or libraries, such as updating dependencies or npm scripts

### Scope

The scope could be anything specifying the place of the commit change. For example `App`, `router`, `vuex`, `EvidenceList`, `styles` etc. This is often times the name of the file being changed, without the file extension.

### Subject

The subject contains a succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize the first letter
* no dot (.) at the end

### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer

The footer should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

---

## y tho?
This seems like a lot of trouble to go through, but it greatly streamlines reversions and understanding how the code has changed. It can be used to generate changelogs for releases, for better understanding of breaking changes with APIs, and generally helps understand other people's changes to the codebase. It's a difficult habit to build, but I promise it's worth it.
