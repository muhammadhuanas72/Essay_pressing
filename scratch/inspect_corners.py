import cv2
import numpy as np

img = cv2.imread("public/washers/thin.png", cv2.IMREAD_UNCHANGED)
print("Image shape:", img.shape)
if img.shape[2] == 4:
    print("Corners alpha values:")
    print("  Top-Left (0,0):", img[0, 0, 3])
    print("  Top-Right (0,-1):", img[0, -1, 3])
    print("  Bottom-Left (-1,0):", img[-1, 0, 3])
    print("  Bottom-Right (-1,-1):", img[-1, -1, 3])
    print("  Center (h//2, w//2):", img[img.shape[0]//2, img.shape[1]//2, 3])
else:
    print("Image does NOT have an alpha channel!")
