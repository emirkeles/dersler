import sys, pymupdf
d = pymupdf.open(sys.argv[1]); a, b, out = int(sys.argv[2]), int(sys.argv[3]), sys.argv[4]
with open(out, 'w') as f:
    for i in range(a-1, b):
        t = d[i].get_text()
        lines = [l.strip() for l in t.split('\n') if l.strip() and '�' not in l and set(l.strip()) != {'.'}]
        f.write(f'\n=== s. {i+1} ===\n' + '\n'.join(lines) + '\n')
