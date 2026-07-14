import os
import cv2

path = "public/washers/thin.png"
print(f"File path: {path}")
print(f"Absolute path: {os.path.abspath(path)}")
print(f"Exists: {os.path.exists(path)}")
if os.path.exists(path):
    print(f"File size: {os.path.getsize(path)} bytes")
    img = cv2.imread(path, cv2.IMREAD_UNCHANGED)
    print(f"Dimensions: {img.shape}")
