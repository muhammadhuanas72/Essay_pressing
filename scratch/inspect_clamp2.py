import cv2
import numpy as np
import os

new_screenshot = r"C:\Users\MUHAMMADHU ANAS\OneDrive\Pictures\Screenshots\Screenshot 2026-07-12 232129.png"
im = cv2.imread(new_screenshot)
h_img, w_img, _ = im.shape

print(f"Screenshot dimensions: {w_img}x{h_img}")

# SS Clamp is column 4 (index 3)
# The standard column math cuts off the clamp - expand right boundary to edge
num_cols = 4
col_width = w_img / num_cols
y_top = 110
y_bottom = 310

i = 3
left  = int(i * col_width + 12)
right = w_img  # extend all the way to edge to not cut off the clamp

cropped_raw = im[y_top:y_bottom, left:right]
print(f"Extended raw crop size: {cropped_raw.shape}")
cv2.imwrite("scratch/debug_clamp_extended.png", cropped_raw)

# Find the clamp using threshold
gray = cv2.cvtColor(cropped_raw, cv2.COLOR_BGR2GRAY)
_, thresh = cv2.threshold(gray, 235, 255, cv2.THRESH_BINARY_INV)
contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

print(f"Contours found: {len(contours)}")
for c in sorted(contours, key=cv2.contourArea, reverse=True)[:5]:
    area = cv2.contourArea(c)
    x, y, w, h = cv2.boundingRect(c)
    print(f"  Area={area:.0f}  BBox: x={x}, y={y}, w={w}, h={h}")
