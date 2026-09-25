#!/usr/bin/env python3
"""Print distance and elevation stats for a GPX file.

Usage: python3 tools/gpx_stats.py <file.gpx> [<file2.gpx> ...]

Reads track segments (<trkseg>/<trkpt>), falls back to route points
(<rte>/<rtept>) if there is no track. Elevation gain ignores GPS
noise smaller than 3 m.
"""
import math
import sys
import xml.etree.ElementTree as ET


def points_from(gpx_root):
    pts = []
    segs = gpx_root.findall('.//{http://www.topografix.com/GPX/1/1}trkseg')
    tag = '{http://www.topografix.com/GPX/1/1}trkpt'
    if not segs:
        segs = gpx_root.findall('.//{http://www.topografix.com/GPX/1/1}rte')
        tag = '{http://www.topografix.com/GPX/1/1}rtept'
    for seg in segs:
        for p in seg.findall(tag):
            try:
                lat = float(p.get('lat'))
                lon = float(p.get('lon'))
            except (TypeError, ValueError):
                continue
            e = p.find('{http://www.topografix.com/GPX/1/1}ele')
            ele = float(e.text) if e is not None and e.text else None
            pts.append((lat, lon, ele))
    return pts


def haversine(a, b):
    R = 6371000.0
    la1, lo1, la2, lo2 = map(math.radians, [a[0], a[1], b[0], b[1]])
    h = (math.sin((la2 - la1) / 2) ** 2
         + math.cos(la1) * math.cos(la2) * math.sin((lo2 - lo1) / 2) ** 2)
    return 2 * R * math.asin(math.sqrt(h))


def stats(path):
    try:
        root = ET.parse(path).getroot()
    except ET.ParseError as e:
        print('%s: NOT A VALID GPX (%s)' % (path, e))
        return
    pts = points_from(root)
    if not pts:
        print('%s: no track/route points found' % path)
        return

    dist = 0.0
    gain = 0.0
    loss = 0.0
    prev = None
    for p in pts:
        if prev is not None:
            dist += haversine(prev, p)
            if prev[2] is not None and p[2] is not None:
                d = p[2] - prev[2]
                if d >= 3:
                    gain += d
                elif d < 0:
                    loss += -d
        prev = p
    eles = [p[2] for p in pts if p[2] is not None]

    name = ''
    trk = root.find('.//{http://www.topografix.com/GPX/1/1}trk')
    if trk is not None:
        n = trk.find('{http://www.topografix.com/GPX/1/1}name')
        if n is not None and n.text:
            name = n.text

    line = '%s' % path
    if name:
        line += '  [%s]' % name
    print(line)
    print('  points : %d' % len(pts))
    print('  distance: %.1f km' % (dist / 1000))
    if eles:
        print('  gain   : %.0f m' % gain)
        print('  loss   : %.0f m' % loss)
        print('  min/max: %.0f / %.0f m a.s.l.' % (min(eles), max(eles)))
    print()


if __name__ == '__main__':
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    for f in sys.argv[1:]:
        stats(f)
