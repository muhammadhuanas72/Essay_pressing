import cv2
import numpy as np

new_screenshot = r"C:\Users\MUHAMMADHU ANAS\OneDrive\Pictures\Screenshots\Screenshot 2026-07-12 232129.png"
im = cv2.imread(new_screenshot)
h_img, w_img, _ = im.shape

num_cols = 4
col_width = w_img / num_cols

# Wide crop that captures the full clamp
card_left  = int(3 * col_width) - 80
card_right = w_img
y_top, y_bottom = 80, 340

raw = im[y_top:y_bottom, card_left:card_right]

# Find the clamp object using the inner bounding box (x=49,y=66,w=159,h=137)
ox, oy, ow, oh = 49, 66, 159, 137

# Crop with good padding
pad = 18
x1 = max(0, ox - pad)
y1 = max(0, oy - pad)
x2 = min(raw.shape[1], ox + ow + pad)
y2 = min(raw.shape[0], oy + oh + pad)
item = raw[y1:y2, x1:x2]
ih, iw = item.shape[:2]

# Replace near-white background pixels with pure white
item_clean = item.copy()
gray_item = cv2.cvtColor(item_clean, cv2.COLOR_BGR2GRAY)
white_mask = gray_item > 228
item_clean[white_mask] = [255, 255, 255]

# Square pad on pure white
WHITE = (255, 255, 255)
size = max(iw, ih)
square = np.full((size, size, 3), WHITE, dtype=np.uint8)
dx, dy = (size - iw) // 2, (size - ih) // 2
square[dy:dy+ih, dx:dx+iw] = item_clean

# Generous outer padding (matches reference card whitespace)
ep = int(size * 0.22)
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
print(f"Saved full SS Clamp -> {out}  ({final_size}x{final_size}px)")

# Also save a preview without transparency for quick visual check
preview = final_img.copy()
cv2.imwrite("scratch/preview_clamp_final.png", preview)
