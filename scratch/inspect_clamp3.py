import cv2
import numpy as np
import os

new_screenshot = r"C:\Users\MUHAMMADHU ANAS\OneDrive\Pictures\Screenshots\Screenshot 2026-07-12 232129.png"
im = cv2.imread(new_screenshot)
h_img, w_img, _ = im.shape

print(f"Screenshot: {w_img}x{h_img}")

# Manually crop the SS Clamp region - column 4 (rightmost)
# From the screenshot we can see the card starts around x=840 and the clamp image is inside it
# y range: approx 110-340 (the image area within the card)
num_cols = 4
col_width = w_img / num_cols  # 1123/4 = 280.75

# The clamp card occupies roughly x=842 to x=1123
card_left  = int(3 * col_width)      # ~843
card_right = w_img                    # 1123 (full width to edge)
y_top = 105
y_bottom = 320

raw = im[y_top:y_bottom, card_left:card_right]
print(f"Raw card crop: {raw.shape}")
cv2.imwrite("scratch/debug_clamp_card.png", raw)

# Convert to gray and threshold to find the clamp
gray = cv2.cvtColor(raw, cv2.COLOR_BGR2GRAY)

# Use a tighter threshold for white background removal
_, thresh = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY_INV)

# Dilate to connect nearby parts of the clamp
kernel = np.ones((5, 5), np.uint8)
dilated = cv2.dilate(thresh, kernel, iterations=3)

contours, _ = cv2.findContours(dilated, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

print(f"Contours: {len(contours)}")
for c in sorted(contours, key=cv2.contourArea, reverse=True)[:5]:
    area = cv2.contourArea(c)
    x, y, w, h = cv2.boundingRect(c)
    print(f"  Area={area:.0f}  BBox: x={x}, y={y}, w={w}, h={h}")

# Use the largest contour to get the bounding box of the clamp
if contours:
    largest = max(contours, key=cv2.contourArea)
    ox, oy, ow, oh = cv2.boundingRect(largest)
    print(f"\nSelected BBox: x={ox}, y={oy}, w={ow}, h={oh}")
    
    # Crop with padding
    pad = 10
    x1 = max(0, ox - pad)
    y1 = max(0, oy - pad)
    x2 = min(raw.shape[1], ox + ow + pad)
    y2 = min(raw.shape[0], oy + oh + pad)
    item = raw[y1:y2, x1:x2]
    cv2.imwrite("scratch/debug_clamp_item.png", item)
    print(f"Item crop: {item.shape}")
