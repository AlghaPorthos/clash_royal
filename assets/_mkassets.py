# Embed all images in assets/ as base64 into js/assets.js so the game
# can be published to text-only hosting (GitHub web form uploads).
import base64, os

A = r'C:\Users\asus\.zcode\workspace\default\clash_royal\assets'
DST = r'C:\Users\asus\.zcode\workspace\default\clash_royal\js\assets.js'

out = [
    '/* Auto-generated: game images embedded as base64 so the game runs from',
    ' * text-only hosting. If this file is absent, pages fall back to the',
    ' * files inside assets/. Do not edit by hand. */',
    'window.ASSETS = {'
]
total = 0
for f in sorted(os.listdir(A)):
    if not f.lower().endswith(('.png', '.jpg')):
        continue
    p = os.path.join(A, f)
    b = open(p, 'rb').read()
    total += len(b)
    mime = 'image/png' if f.lower().endswith('.png') else 'image/jpeg'
    b64 = base64.b64encode(b).decode()
    out.append("  'assets/%s': 'data:%s;base64,%s'," % (f, mime, b64))
out.append('};')
open(DST, 'w').write('\n'.join(out) + '\n')
print('assets.js written: %d bytes (from %d bytes of images)' % (os.path.getsize(DST), total))
