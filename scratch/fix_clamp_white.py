import cv2
import numpy as np

new_screenshot = r"C:\Users\MUHAMMADHU ANAS\OneDrive\Pictures\Screenshots\Screenshot 2026-07-12 232129.png"
im = cv2.imread(new_screenshot)
h_img, w_img, _ = im.shape

num_cols = 4
col_width = w_img / num_cols

# Extended boundaries for SS Clamp (column 4)
card_left  = int(3 * col_width)
card_right = w_img
y_top, y_bottom = 105, 320

raw = im[y_top:y_bottom, card_left:card_right]

# Detect clamp using dilated threshold
gray = cv2.cvtColor(raw, cv2.COLOR_BGR2GRAY)
_, thresh = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY_INV)
kernel = np.ones((5, 5), np.uint8)
dilated = cv2.dilate(thresh, kernel, iterations=3)
contours, _ = cv2.findContours(dilated, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

largest = max(contours, key=cv2.contourArea)
ox, oy, ow, oh = cv2.boundingRect(largest)

# Tight crop of just the clamp
pad = 6
x1 = max(0, ox - pad)
y1 = max(0, oy - pad)
x2 = min(raw.shape[1], ox + ow + pad)
y2 = min(raw.shape[0], oy + oh + pad)
item = raw[y1:y2, x1:x2]

ih, iw = item.shape[:2]

# ─── KEY FIX: Use pure white background ───────────────────────
WHITE = (255, 255, 255)

# Square pad with generous whitespace (like the reference)
size = max(iw, ih)
square = np.full((size, size, 3), WHITE, dtype=np.uint8)
dx, dy = (size - iw) // 2, (size - ih) // 2
square[dy:dy+ih, dx:dx+iw] = item

# Replace any near-white gray pixels from the source card with pure white
sq_gray = cv2.cvtColor(square, cv2.COLOR_BGR2GRAY)
white_mask = sq_gray > 230
square[white_mask] = [255, 255, 255]

# Add generous padding (matches reference whitespace)
ep = int(size * 0.18)
final_size = size + 2 * ep
final_img = np.full((final_size, final_size, 3), WHITE, dtype=np.uint8)
final_img[ep:ep+size, ep:ep+size] = square

# Rounded corner alpha mask
def draw_rounded_rect(mask, pt1, pt2, radius, color):
    x1, y1 = pt1
    x2, y2 = pt2
    cv2.rectangle(mask, (x1 + radius, y1), (x2 - radius, y2), color, -1)
    cv2.rectangle(mask, (x1, y1 + radius), (x2, y2 - radius), color, -1)
    cv2.circle(mask, (x1 + radius, y1 + radius), radius, color, -1)
    cv2.circle(mask, (x2 - radius, y1 + radius), radius, color, -1)
    cv2.circle(mask, (x1 + radius, y2 - radius), radius, color, -1)
    cv2.circle(mask, (x2 - radius, y2 - radius), radius, color, -1)

mask = np.zeros((final_size, final_size), np.uint8)
draw_rounded_rect(mask, (0, 0), (final_size-1, final_size-1), 28, 255)

bgra = cv2.cvtColor(final_img, cv2.COLOR_BGR2BGRA)
bgra[:, :, 3] = mask

out = "public/ss_components/ss_clamp.png"
cv2.imwrite(out, bgra)
print(f"Saved clean white-bg SS Clamp -> {out}  ({final_size}x{final_size}px)")
