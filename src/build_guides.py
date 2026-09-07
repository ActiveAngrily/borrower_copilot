"""Render the reviewer documents. Run: python3 src/build_guides.py.

Only the headings, paragraphs, lists, tables, links and inline code used in
these local documents are supported; no runtime Markdown dependency.
"""
from pathlib import Path
import html
import re

ROOT = Path(__file__).resolve().parents[1]
GITHUB = "https://github.com/ActiveAngrily/borrower_copilot/blob/main/"


def render(source):
    def inline(value):
        value = html.escape(value)
        value = re.sub(r'`([^`]+)`', r'<code>\1</code>', value)
        value = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', value)
        def link(match):
            label, target = match.groups()
            if not target.startswith(('https://', 'http://', '#')):
                target = GITHUB + (source.parent / target).resolve().relative_to(ROOT).as_posix()
            return f'<a href="{target}">{label}</a>'
        return re.sub(r'\[([^\]]+)\]\(([^)]+)\)', link, value)

    blocks = []
    section = 0
    for block in source.read_text().strip().split('\n\n'):
        lines = block.splitlines()
        if lines[0].startswith('# '):
            continue
        if lines[0].startswith('## '):
            title = lines[0][3:]
            section += 1
            blocks.append(f'<h2 id="section-{section}">{inline(title)}</h2>')
        elif block.startswith('**Decision sequence:** '):
            steps = block.removeprefix('**Decision sequence:** ').rstrip('.').split(' → ')
            blocks.append('<ol class="decision-flow" aria-label="Decision sequence" style="grid-template-columns:repeat(auto-fit,minmax(150px,1fr))">' + ''.join(f'<li><span>0{i}</span>{inline(step)}</li>' for i, step in enumerate(steps, 1)) + '</ol>')
        elif block.startswith('Technical references:'):
            blocks.append('<details class="help"><summary>Technical references</summary><p>' + inline(block.removeprefix('Technical references: ')) + '</p></details>')
        elif lines[0].startswith('|'):
            rows = [[inline(cell.strip()) for cell in line.strip('|').split('|')] for line in lines]
            if rows[0] == ['Card field', 'Example result']:
                items = ''.join(f'<div class="card-item"><span>{label}</span><strong>{value}</strong></div>' for label, value in rows[2:])
                blocks.append('<section class="negotiation-card example-card" aria-label="Priya example Negotiation Card"><div class="card-heading"><div><p class="eyebrow">Priya / Supplemented example</p><h3>Negotiation Card</h3></div><span>Illustrative · 36 months</span></div><div class="card-grid">' + items + '</div><p class="card-foot">Confirm the assumptions and request the lender’s complete Key Facts Statement before acting.</p></section>')
                continue
            head = ''.join(f'<th scope="col">{cell}</th>' for cell in rows[0])
            body = ''.join('<tr>' + ''.join(f'<td>{cell}</td>' for cell in row) + '</tr>' for row in rows[2:])
            blocks.append(f'<div class="guide-table" tabindex="0" role="region" aria-label="Rule comparison"><table><thead><tr>{head}</tr></thead><tbody>{body}</tbody></table></div>')
        elif lines[0].startswith('- ') or re.match(r'\d+\. ', lines[0]):
            blocks.append('<ul>' + ''.join(f'<li>{inline(re.sub(r"^(?:- |[0-9]+[.] )", "", line))}</li>' for line in lines) + '</ul>')
        else:
            blocks.append('<p>' + inline(' '.join(lines)) + '</p>')
    return '\n'.join(blocks)


def page(name, title, subtitle, source, extra=''):
    nav = ''.join(f'<a href="{file}.html"' + (' aria-current="page"' if file == name else '') + f'>{label}</a>' for file, label in [('rules', 'Rules'), ('walkthrough', 'Walkthrough')])
    output = f'''<!doctype html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>{re.sub(r"<[^>]+>", " ", title)} · Lokta Borrower Copilot</title><link rel="stylesheet" href="../src/styles.css"></head>
<body class="review-page"><a class="skip-link" href="#guide">Skip to content</a>
<header class="site-header"><a class="brand" href="../index.html"><img class="brand-mark" src="../assets/lokta-monogram.svg" alt="Lokta"><span>Borrower Copilot</span></a><nav class="header-nav" aria-label="Reviewer resources"><a href="../index.html">Assessment</a>{nav}</nav></header>
<main id="guide"><section class="hero"><p class="eyebrow">Lokta / Reviewer edition</p><h1>{title}</h1><p class="lede">{subtitle}</p></section>
<div class="guide-toolbar"><span>THE LOGIC, MADE VISIBLE</span><a href="{GITHUB}{source.relative_to(ROOT)}">Read on GitHub ↗</a><a href="{GITHUB}docs/product/RULES.md">Full rule register ↗</a></div>
{extra}<article class="guide-content">{render(source)}</article></main><footer>Lokta Borrower Copilot · Illustrative guidance · Private by design</footer></body></html>'''
    (ROOT / 'review' / f'{name}.html').write_text(output)


if __name__ == '__main__':
    page('rules', 'Decision Guide', 'What the app decides, what it checks and where its limits lie.', ROOT / 'docs/product/DECISION_GUIDE.md')
    page('walkthrough', 'Priya’s ₹8 lakh request', 'Follow Priya’s wedding-loan example: minimal budget clarifications, the stress that binds and the verdict on her original request.', ROOT / 'docs/handoff/WALKTHROUGH.md')
