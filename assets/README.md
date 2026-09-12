# assets

Files the site links to but doesn't display inline.

## Chris_Law_Resume.pdf

The "Download resume" button in the contact footer points at this exact path:

```
assets/Chris_Law_Resume.pdf
```

If you replace the file, keep that filename or the button breaks. The browser
saves it as `Chris-Law-Resume.pdf` either way.

Anything in this folder is public once pushed — GitHub Pages serves the whole
repository, so don't put anything here you wouldn't hand to a stranger.
