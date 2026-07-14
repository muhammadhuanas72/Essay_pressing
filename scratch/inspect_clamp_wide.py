import cv2
import numpy as np

new_screenshot = r"C:\Users\MUHAMMADHU ANAS\OneDrive\Pictures\Screenshots\Screenshot 2026-07-12 232129.png"
im = cv2.imread(new_screenshot)
h_img, w_img, _ = im.shape

num_cols = 4
col_width = w_img / num_cols

# Extend LEFT boundary into retainer card to catch full clamp
# and extend right all the way to edge
card_left  = int(3 * col_width) - 80   # go 80px left of column boundary
card_right = w_img
y_top, y_bottom = 80, 340               # wider vertical range too

raw = im[y_top:y_bottom, card_left:card_right]
print(f"Extended raw crop: {raw.shape}  (from x={card_left} to x={card_right})")
cv2.imwrite("scratch/debug_clamp_wide.png", raw)

# Threshold to isolate non-white object
gray = cv2.cvtColor(raw, cv2.COLOR_BGR2GRAY)
_, thresh = cv2.threshold(gray, 238, 255, cv2.THRESH_BINARY_INV)
kernel = np.ones((7, 7), np.uint8)
dilated = cv2.dilate(thresh, kernel, iterations=4)
contours, _ = cv2.findContours(dilated, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

print(f"Contours: {len(contours)}")
for c in sorted(contours, key=cv2.contourArea, reverse=True)[:5]:
    area = cv2.contourArea(c)
    x, y, w, h = cv2.boundingRect(c)
    print(f"  Area={area:.0f}  BBox: x={x}, y={y}, w={w}, h={h}")
