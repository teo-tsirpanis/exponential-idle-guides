Site for guides for [Exponential Idle](https://conicgames.github.io/exponentialidle/).

The guide's content has been written by Snaeky and LE⭐Baldy. The website
was created by [TickleThePanda](https://ticklethepanda.dev).

The website is at [https://exponential-idle-guides.netlify.app/](https://exponential-idle-guides.netlify.app/).

The site is built using [11ty](https://www.11ty.dev) and hosted on
[Netlify](https://www.netlify.com/).

### Prerequisites

Pre-requisites to build and develop this site:
 - Install [Node](https://nodejs.org/en/)
 - Add Node to your PATH

### Building

To build to website, run:
```
npm run build
```

This will build the contents of the site to `_site`.

### Developing

For an easy development workflow, run:
```
npm run dev
```

This will build the site, run a server on port 8000, and rebuild the
changes when anything changes. You will need to refresh the page to see
the changes.

Once you have run the command, visit `http://localhost:8000`

#### Updating the guides

Each guide file has a few different elements:
 - Front matter data which describes some things about the page. This is
   written in yaml format.
   ```
   ---
   title: <title>
   author: <author>
   contributors: <contributors>
   order: <relative order>
   ---
   ```
 - [Markdown](https://daringfireball.net/projects/markdown/) content,
   written below the second `---`
 - Mathematical formula using [MathJax tex](https://docs.mathjax.org/en/v2.7-latest/tex.html):
   - Inline using `\\(` to open and `\\)` to close
   - On its own lines using `\\[` and `\\]`

If you want to create a new guide, add a new `.md` file in the
`src/view/guides` directory with the header content as above, replacing
`<>` as appropriate. The content is written below the second `---`.
