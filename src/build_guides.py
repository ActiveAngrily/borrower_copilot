"""Render the reviewer documents. Run: python3 src/build_guides.py.

Only the headings, paragraphs, lists, tables, links and inline code used in
these local documents are supported; no runtime Markdown dependency.
"""
from pathlib import Path
import html
import re
import os

ROOT = Path(__file__).resolve().parents[1]


def render(source):
    def inline(value):
        value = html.escape(value)
        value = re.sub(r'`([^`]+)`', r'<code>\1</code>', value)
        value = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', value)
        def link(match):
            label, target = match.groups()
            if not target.startswith(('https://', 'http://', '#')):
                target = os.path.relpath(source.parent / target, ROOT / 'review')
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
        elif lines[0].startswith('|'):
            rows = [[inline(cell.strip()) for cell in line.strip('|').split('|')] for line in lines]
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
<div class="guide-toolbar"><span>THE LOGIC, MADE VISIBLE</span><a href="../{source.relative_to(ROOT)}">Read the Markdown ↗</a><a href="../docs/product/RULES.md">Full rule register ↗</a></div>
{extra}<article class="guide-content">{render(source)}</article></main><footer>Lokta Borrower Copilot · Illustrative guidance · Private by design</footer></body></html>'''
    (ROOT / 'review' / f'{name}.html').write_text(output)


if __name__ == '__main__':
    page('rules', 'Decision Guide', 'The essential rules. The reasoning behind every number. A clear path to the full evidence.', ROOT / 'docs/product/DECISION_GUIDE.md', '<ol class="decision-flow" aria-label="Decision sequence"><li><span>01 / RESOURCES</span>Understand the budget</li><li><span>02 / RESILIENCE</span>Test the difficult months</li><li><span>03 / REALITY</span>Check access &amp; funding</li><li><span>04 / DECISION</span>Explain the next step</li></ol><nav class="guide-jumps" aria-label="Guide sections">' + ''.join(f'<a href="#section-{i}">{label}</a>' for i, label in enumerate(['Verdicts', 'Budget', 'Stress', 'Lender limits', 'Fees & cost', 'Unknowns', 'Evidence', 'Go deeper'], 1)) + '</nav>')
    page('walkthrough', 'See the thinking.<br>Follow the decision.', 'A five-minute tour of the borrower journey, the calculation boundary and the final Negotiation Card.', ROOT / 'docs/handoff/WALKTHROUGH.md', '<section class="video-placeholder" aria-labelledby="video-title"><span class="video-symbol" aria-hidden="true">▷</span><div><p class="eyebrow">Walkthrough / Video</p><h2 id="video-title">The video is on its way.</h2><p>The recording will appear here when it is ready. Explore the written walkthrough below in the meantime.</p></div><span class="state">Coming soon</span></section>')
