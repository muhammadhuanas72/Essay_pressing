import cv2
import numpy as np
import os

img_path = r"C:\Users\MUHAMMADHU ANAS\OneDrive\Pictures\Screenshots\Screenshot 2026-07-13 002158.png"
im = cv2.imread(img_path)
h_img, w_img, _ = im.shape
print(f"Screenshot: {w_img}x{h_img}")

os.makedirs("public/brackets", exist_ok=True)

# Fine-tuned column boundaries based on visual inspection
# Screenshot is 1031px wide, 3 product cards
# Card dividers appear at approx x=263 and x=527
y_top, y_bottom = 95, 320

WHITE = (255, 255, 255)

def draw_rounded_rect(mask, pt1, pt2, radius, color):
    x1, y1 = pt1; x2, y2 = pt2
    cv2.rectangle(mask, (x1+radius, y1), (x2-radius, y2), color, -1)
    cv2.rectangle(mask, (x1, y1+radius), (x2, y2-radius), color, -1)
    for cx, cy in [(x1+radius,y1+radius),(x2-radius,y1+radius),(x1+radius,y2-radius),(x2-radius,y2-radius)]:
        cv2.circle(mask, (cx, cy), radius, color, -1)

def extract_and_save(raw, name, label):
    gray = cv2.cvtColor(raw, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 238, 255, cv2.THRESH_BINARY_INV)
    kernel = np.ones((5,5), np.uint8)
    dilated = cv2.dilate(thresh, kernel, iterations=3)
    contours, _ = cv2.findContours(dilated, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    if not contours:
        print(f"  No contours for {label}!"); return

    largest = max(contours, key=cv2.contourArea)
    ox, oy, ow, oh = cv2.boundingRect(largest)
    print(f"  {label}: BBox x={ox}, y={oy}, w={ow}, h={oh}  (crop:{raw.shape[1]}x{raw.shape[0]})")

    pad = 16
    x1 = max(0, ox-pad); y1 = max(0, oy-pad)
    x2 = min(raw.shape[1], ox+ow+pad); y2 = min(raw.shape[0], oy+oh+pad)
    item = raw[y1:y2, x1:x2].copy()
    ih, iw = item.shape[:2]

    g = cv2.cvtColor(item, cv2.COLOR_BGR2GRAY)
    item[g > 228] = [255, 255, 255]

    size = max(iw, ih)
    square = np.full((size, size, 3), WHITE, dtype=np.uint8)
    dx, dy = (size-iw)//2, (size-ih)//2
    square[dy:dy+ih, dx:dx+iw] = item

    ep = int(size * 0.20)
    fs = size + 2*ep
    final = np.full((fs, fs, 3), WHITE, dtype=np.uint8)
    final[ep:ep+size, ep:ep+size] = square

    mask = np.zeros((fs, fs), np.uint8)
    draw_rounded_rect(mask, (0,0), (fs-1, fs-1), 26, 255)
    bgra = cv2.cvtColor(final, cv2.COLOR_BGR2BGRA)
    bgra[:,:,3] = mask

    out = f"public/brackets/{name}.png"
    cv2.imwrite(out, bgra)
    print(f"  Saved -> {out}  ({fs}x{fs}px)")

# Use pixel scan to find card divider lines (near-white vertical strips)
center_row = im[200, :, :]
gray_row = cv2.cvtColor(center_row.reshape(1, w_img, 3), cv2.COLOR_BGR2GRAY).flatten()
dividers = [x for x in range(50, w_img-50) if gray_row[x] > 240 and gray_row[x-1] < 235]
print(f"Potential dividers at x: {dividers[:10]}")

# Use fixed splits: each card ~343px wide in 1031px image
splits = [0, 263, 527, w_img]
products = [
    ("flat_angle_bracket", "Flat Angle Bracket"),
    ("u_bracket",          "U Bracket"),
    ("harness_bracket",    "Harness Bracket"),
]

for i, (name, label) in enumerate(products):
    left  = splits[i] + 10
    right = splits[i+1] - 10
    raw = im[y_top:y_bottom, left:right]
    cv2.imwrite(f"scratch/debug2_bracket_{name}.png", raw)
    extract_and_save(raw, name, label)
