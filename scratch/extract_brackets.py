import cv2
import numpy as np
import os

img_path = r"C:\Users\MUHAMMADHU ANAS\OneDrive\Pictures\Screenshots\Screenshot 2026-07-13 002158.png"
im = cv2.imread(img_path)
h_img, w_img, _ = im.shape
print(f"Screenshot: {w_img}x{h_img}")

os.makedirs("public/brackets", exist_ok=True)

# 3 columns, image area roughly y=100 to y=300
num_cols = 3
col_width = w_img / num_cols
y_top, y_bottom = 95, 310

products = [
    {"name": "flat_angle_bracket", "label": "Flat Angle Bracket"},
    {"name": "u_bracket",          "label": "U Bracket"},
    {"name": "harness_bracket",    "label": "Harness Bracket"},
]

WHITE = (255, 255, 255)

def draw_rounded_rect(mask, pt1, pt2, radius, color):
    x1, y1 = pt1; x2, y2 = pt2
    cv2.rectangle(mask, (x1+radius, y1), (x2-radius, y2), color, -1)
    cv2.rectangle(mask, (x1, y1+radius), (x2, y2-radius), color, -1)
    for cx, cy in [(x1+radius,y1+radius),(x2-radius,y1+radius),(x1+radius,y2-radius),(x2-radius,y2-radius)]:
        cv2.circle(mask, (cx, cy), radius, color, -1)

for i, p in enumerate(products):
    left  = int(i * col_width + 10)
    right = int((i+1) * col_width - 10)
    raw = im[y_top:y_bottom, left:right]

    # Save raw for inspection
    cv2.imwrite(f"scratch/debug_bracket_{p['name']}.png", raw)

    gray = cv2.cvtColor(raw, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 238, 255, cv2.THRESH_BINARY_INV)
    kernel = np.ones((5,5), np.uint8)
    dilated = cv2.dilate(thresh, kernel, iterations=3)
    contours, _ = cv2.findContours(dilated, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    if not contours:
        print(f"No contours for {p['label']} - skipping"); continue

    largest = max(contours, key=cv2.contourArea)
    ox, oy, ow, oh = cv2.boundingRect(largest)
    print(f"{p['label']}: BBox x={ox}, y={oy}, w={ow}, h={oh}")

    pad = 14
    x1 = max(0, ox-pad); y1 = max(0, oy-pad)
    x2 = min(raw.shape[1], ox+ow+pad); y2 = min(raw.shape[0], oy+oh+pad)
    item = raw[y1:y2, x1:x2].copy()
    ih, iw = item.shape[:2]

    # Clean near-white background
    g = cv2.cvtColor(item, cv2.COLOR_BGR2GRAY)
    item[g > 228] = [255, 255, 255]

    # Square pad
    size = max(iw, ih)
    square = np.full((size, size, 3), WHITE, dtype=np.uint8)
    dx, dy = (size-iw)//2, (size-ih)//2
    square[dy:dy+ih, dx:dx+iw] = item

    # Outer padding
    ep = int(size * 0.20)
    fs = size + 2*ep
    final = np.full((fs, fs, 3), WHITE, dtype=np.uint8)
    final[ep:ep+size, ep:ep+size] = square

    # Rounded corner mask
    mask = np.zeros((fs, fs), np.uint8)
    draw_rounded_rect(mask, (0,0), (fs-1, fs-1), 26, 255)
    bgra = cv2.cvtColor(final, cv2.COLOR_BGR2BGRA)
    bgra[:,:,3] = mask

    out = f"public/brackets/{p['name']}.png"
    cv2.imwrite(out, bgra)
    print(f"  Saved -> {out}  ({fs}x{fs}px)")
