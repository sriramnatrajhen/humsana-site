# The site standard

Read this before editing any page here. It is the contract for copy and markup. `index.html` is the worked
example: read it first, then write the page.

## What this site is

A static site, published from this directory to humsana.com. Warm paper, near-black ink, IBM Plex Sans for
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

## Verify before you report

1. Run the detector on the file and report its score and any `high` issue:

   ```
   cd ~/.hermes/skills/avoid-ai-writing && node bin/avoid-ai-writing.js --source-mode rendered-markdown --context general <file>
   ```

2. Count the words before and after.
3. Report what you removed, what you preserved, and anything you could not preserve. Do not claim a render
   check you did not run; the render and responsive check is done centrally after the page lands.
