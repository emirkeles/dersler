import sys, os, pymupdf
d = pymupdf.open(sys.argv[1]); out = sys.argv[2]; dpi = int(sys.argv[3]); os.makedirs(out, exist_ok=True)
for s in sys.argv[4:]:
    n = int(s); d[n-1].get_pixmap(dpi=dpi).save(os.path.join(out, f's{n}.png')); print(os.path.join(out, f's{n}.png'))
