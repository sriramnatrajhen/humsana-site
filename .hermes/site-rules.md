# The site standard

Read this before editing any page here. It is the contract for copy and markup. `index.html` is the worked
example: read it first, then write the page.

## What gets published

GitHub Pages runs Jekyll over this directory, so every file that is not inside a dot-directory is public:
the pages, the stylesheet, the script, the icons, and anything else you leave here. A markdown file at the
root is rendered into a page of its own, wrapped in a default theme named after the repository.

So: saved pages, reference material, tooling and notes belong in a dot-directory (`.hermes/`) or outside
this repository, never at the root. Three files were live on humsana.com for weeks because of this: a saved
copy of a third-party design checklist, and two saved GOV.UK guidance pages. Before pushing, list what the
push would publish:

    git ls-files | grep -E "^[^._]" | grep -Ev "\.(html|css|js|png|jpg|svg|xml|txt|ico|mp3)$"

The only entries that belong in that output are `CNAME` and `README.md`.

## What this site is

A static site, published from this directory to humsana.com. Warm paper, near-black ink, Manrope for
text and IBM Plex Mono for identifiers, codes, counts and measurements. Hairline rules carry structure.
There are no cards, no shadows, no rounded containers, no gradients, no glass, no decorative imagery.

One accent color exists and it means one thing: a value that changed, or a refusal. Nothing else earns it.

## Copy rules

- US spelling.
- No em dashes, no en dashes, no exclamation marks.
- Sentences under 25 words. One sentence per element. Headings are 2 to 6 words.
- No superlatives, no marketing lines, no filler. Banned: seamless, robust, leverage, empower, unlock,
  cutting edge, revolutionary, effortless, best in class, game changing, world class, next generation.
- No eyebrow or kicker label above a heading. The heading carries its own weight.
- Do not open a sentence with a chain of three or more "no X" items. State the absence once, after a colon,
  or lead with what exists.
- State what happens and let a number carry the weight instead of an adjective about it.
- Do not restate a claim on more than one page. The page that owns it carries the full version; every other
  page links to it.
- Never claim or imply that Humsana grants authority, that we detect a proxy, a replay or a fake identity,
  that we infer emotion, or that we replace the customer's system of record.
- Never invent a customer, a certification, a benchmark or a number. Every figure keeps the published source
  link it already has. If a figure has no source, cut it.

## Length

- `index.html` and any home-style page: 200 to 400 words of prose, at most six sections.
- Every other page: under about 500 words.
- A page carrying a live demonstration or quoted command output may exceed that, but only by the data, never
  by prose. Say which part is data when you report the count.
- Count with tags stripped, not by eye:

  ```
  python3 -c "import re,sys;p=sys.argv[1];t=open(p).read();t=re.sub(r'<(script|style|nav|footer)[^>]*>.*?</\1>','',t,flags=re.S);t=re.sub(r'<[^>]+>',' ',t);print(p,len(re.findall(r\"[A-Za-z0-9'-]+\",t)))" index.html
  ```

## Markup rules

- Do not edit `style.css`. Compose from the classes that already exist. If something is missing, report it
  instead of adding CSS.
- Do not edit `index.html`.
- Keep the navigation block and the footer block identical to the ones in `index.html`, so every page carries
  the same chrome.
- Every internal link must resolve to a file that exists in this directory. Every external source link stays.
- Keep the accessible structure: real headings in order, `role="tablist"` with `aria-controls` where a switch
  exists, `alt` text on images, `aria-hidden` on decorative rules.
- Class vocabulary worth knowing: `.rows` / `.row` / `.rn` with `.chips` for a numbered list with micro
  labels, `.compare` with `.ch` headers and `.l` / `.r` rows for a two-column contrast, `.evid` for a figure
  with its source, `.measure` for a measured table, `.thin-row` for a compact line, `.chain` for the six
  stages, `.caselist` with `.casepanel` for the three cases, `.rail` with `.step` and `.step-body` for the
  mechanism, `.note` for a provenance line in mono, `.code` for a command block, `.verdict` / `.cmp` / `.api`
  for a recorded decision.

## The graphics, and when to use which

Three components carry the visuals. They exist in `style.css` already, and `index.html` is the worked
example of all three. Use them instead of inventing new markup, and never edit `style.css` yourself.

**The action map** shows the topology of one action: the two sides, the rule between them, and a token
that travels to the boundary and is stopped there. Use it where a page needs to show *where* the check
sits, at most once per page. The finished diagram is the default state and the animation only adds
motion, so it is safe for reduced motion and no javascript.

```html
<div class="bmap">
  <div class="bmap-sides">
    <div class="side a"><span class="pname">Company A</span>
      <ul><li><svg class="ic" viewBox="0 0 20 20" aria-hidden="true">…</svg>Principal</li></ul>
    </div>
    <div class="side b"><span class="pname">Company B</span>
      <ul><li><svg class="ic" viewBox="0 0 20 20" aria-hidden="true">…</svg>Executor</li></ul>
    </div>
  </div>
  <div class="bd" aria-hidden="true"><span>boundary</span></div>
  <div class="rail" aria-hidden="true">
    <span class="tok">pay 4821</span>
    <span class="chip"><i class="stop"></i>4821 &rarr; 9137 &middot; refused</span>
  </div>
  <p class="bmap-note">One line of mono stating what the picture shows.</p>
</div>
```

**The action-class tablist** is how the site shows that one check covers many kinds of action. Each tab
is a domain plus a status chip, each panel is four rows and two short paragraphs. The changed value must
carry `.chg` so the panel flashes it when the tab changes. Status words are only `live`, `ran clean` (the
parenthetical says how), or `not yet run`. A status is a fact about a run, never a promise.

```html
<div class="acts">
  <div class="acts-tabs" role="tablist" aria-label="Action classes">
    <button role="tab" aria-controls="act-x" aria-selected="true" tabindex="0">
      <svg class="ic" viewBox="0 0 20 20" aria-hidden="true">…</svg>Payments<span class="st live">live</span></button>
    <button role="tab" aria-controls="act-y" aria-selected="false" tabindex="-1">…</button>
  </div>
  <div class="acts-panel" id="act-x" role="tabpanel">
    <div class="act-head"><h3>Release a payment</h3><span class="st live">live in the sandbox</span></div>
    <div class="acts-grid">
      <ul class="cmp">
        <li><span class="k">authorized</span><span class="v">…</span></li>
        <li><span class="k">presented</span><span class="v chg">…</span></li>
        <li><span class="k">rule</span><span class="v">MAY_NOT_CHANGE, parameters.payee_account</span></li>
        <li><span class="k">answer</span><span class="v">GRANT_DOES_NOT_COVER_THIS_ACTION</span></li>
      </ul>
      <div><p>What the check does, in two sentences.</p><p class="why">Why it matters in this domain.</p></div>
    </div>
  </div>
</div>
```

**Icons** are inline SVG, `viewBox="0 0 20 20"`, `class="ic"`, no `fill`, `stroke-width: 1.5`, round caps
and joins, `aria-hidden="true"`, and they inherit colour. Draw them on that grid and keep them at the same
weight: a 20px box with 2.5px of margin all round. Do not use an icon library, an emoji, or a raster image.

**The figure strip** carries three published numbers with their sources, one line each:

```html
<div class="figstrip">
  <div><span class="f">$2.7bn</span><span class="t">What the figure is.</span>
    <span class="s">Where it came from, dated. <a href="…">Source</a></span></div>
</div>
```

Motion rules. One authored moment per page, which is the action map if the page has one; everything else
is a state change tied to an interaction, not an entrance effect on scroll. Any new animation must define
its finished state in plain CSS and animate *from* the start state, so a visitor with reduced motion sees
the complete picture. Use `cubic-bezier(.16,1,.3,1)` and keep anything under 1.6s. No animation may move
the layout or change a number.

## Verify before you report

1. Run the detector on the file and report its score and any `high` issue:

   ```
   cd ~/.hermes/skills/avoid-ai-writing && node bin/avoid-ai-writing.js --source-mode rendered-markdown --context general <file>
   ```

2. Count the words before and after.
3. Report what you removed, what you preserved, and anything you could not preserve. Do not claim a render
   check you did not run; the render and responsive check is done centrally after the page lands.
