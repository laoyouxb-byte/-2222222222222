from pathlib import Path

root = Path('assets/resources/images')
root.mkdir(parents=True, exist_ok=True)

palette = [
    '#FFD60A', '#FFA859', '#93EB81', '#78C6FF', '#DA9AFF', '#FF84B2'
]

for idx, color in enumerate(palette, start=1):
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
  <circle cx="128" cy="128" r="108" fill="{color}" stroke="#5a3f00" stroke-width="8"/>
  <circle cx="94" cy="108" r="15" fill="#352c2c"/>
  <circle cx="162" cy="108" r="15" fill="#352c2c"/>
  <path d="M84 146 Q128 194 172 146" fill="none" stroke="#7a2323" stroke-width="10" stroke-linecap="round"/>
</svg>'''
    (root / f'emoji_{idx}.svg').write_text(svg, encoding='utf-8')

bg = '''<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920">
  <defs>
    <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="#bfe7ff"/><stop offset="100%" stop-color="#e9ffd7"/>
    </linearGradient>
  </defs>
  <rect width="1080" height="1920" fill="url(#g1)"/>
  <rect x="60" y="250" width="960" height="1610" rx="56" fill="#e7ffca" stroke="#4a8c3c" stroke-width="12"/>
  <rect x="100" y="300" width="880" height="160" rx="42" fill="#ffed78" stroke="#bd9200" stroke-width="10"/>
  <text x="540" y="400" font-size="72" text-anchor="middle" fill="#377828" font-family="Arial">点击这里</text>
  <rect x="120" y="1650" width="840" height="160" rx="65" fill="#d3f5ff" stroke="#5082a0" stroke-width="8"/>
</svg>'''
(root / 'machine_bg.svg').write_text(bg, encoding='utf-8')
print('assets generated: svg')
