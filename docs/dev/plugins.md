---
title: Plugins
subtitle: The Other Super Hero
---

# Most Basic Plugin

The most basic plugin only cares about a single page at a time, and doesn't
have any input into grander things. It looks like:

```
fn(pageData) => {
  scripts: ?[str], // paths to js files
  styles: ?[str],  // paths to css files
  links: ?{title: link, ...}, // links to add to the header
  blocks: ?{
    beforeHeader: fn() => React Element,
    ... (before/after Header, Content, Footer)
  }
}
```

The `pageData` object looks like

```
{
  title:
  subtitle:
  rawBody: // the markdown version
  body:    // the HTML formatted version
  ... any other metadata from the yaml frontmatter
}
```

# Full Plugin

If a plugin wants to do more than just modify individual pages, it should look
like an object instead of just a single function, declaring the things it is
interested in doing:

```
{
  gatherFiles(files) {
    // modify the files object
  }
  derivedFiles(files) {
    // produce any files if you want to
  }
  postProcessFiles(files) {
  }
  page: (pageData) => {... same as simple plugin},
}
```

# Configuration

If plugins need any special configuration, the common pattern is to have them
export a top-level function that takes this configuration as arguments, and
returns the expected "plugin"-shaped object.

