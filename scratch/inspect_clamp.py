import cv2
import numpy as np

new_screenshot = r"C:\Users\MUHAMMADHU ANAS\OneDrive\Pictures\Screenshots\Screenshot 2026-07-12 232129.png"
im = cv2.imread(new_screenshot)
h_img, w_img, _ = im.shape

# SS Clamp is the 4th column (index 3)
num_cols = 4
col_width = w_img / num_cols
y_top = 110
y_bottom = 310

i = 3  # SS Clamp
left  = int(i * col_width + 12)
right = int((i + 1) * col_width - 12)
cropped_raw = im[y_top:y_bottom, left:right]

print(f"Raw crop size: {cropped_raw.shape}  ({right-left}x{y_bottom-y_top})")

gray = cv2.cvtColor(cropped_raw, cv2.COLOR_BGR2GRAY)

# Threshold
_, thresh = cv2.threshold(gray, 235, 255, cv2.THRESH_BINARY_INV)
contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

print(f"Contours found: {len(contours)}")
for c in sorted(contours, key=cv2.contourArea, reverse=True)[:5]:
    area = cv2.contourArea(c)
    x, y, w, h = cv2.boundingRect(c)
    print(f"  Area={area:.0f}  BBox: x={x}, y={y}, w={w}, h={h}")

# Save a debug view with bounding rects drawn
debug = cropped_raw.copy()
for c in contours:
    x, y, w, h = cv2.boundingRect(c)
    cv2.rectangle(debug, (x,y), (x+w,y+h), (0,255,0), 2)
cv2.imwrite("scratch/debug_clamp.png", debug)
cv2.imwrite("scratch/debug_clamp_raw.png", cropped_raw)
print("Saved debug images to scratch/")
