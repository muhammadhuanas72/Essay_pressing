import os
from PIL import Image, ImageChops

# Create directory if it doesn't exist
os.makedirs("public/washers", exist_ok=True)

img_path = r"C:\Users\MUHAMMADHU ANAS\OneDrive\Pictures\Screenshots\Screenshot 2026-07-12 182522.png"
im = Image.open(img_path).convert("RGB")

# Define column specifications based on W = 1312, H = 453
num_cols = 5
col_width = im.width / num_cols

# Estimated vertical location of the washer photos (between title text and label text)
# Y starts around 110 and goes to 310 for the image container
y_top = 110
y_bottom = 310

washers = [
    {"name": "thick_flat", "label": "Thick Flat Washer"},
    {"name": "thrust", "label": "Thrust Washer"},
    {"name": "thin", "label": "Thin Washer"},
    {"name": "ss", "label": "SS Washer"},
    {"name": "ms", "label": "MS Washer"}
]

def trim_bg(image, bg_color):
    # Find bounding box of features different from background color
    bg = Image.new(image.mode, image.size, bg_color)
    diff = ImageChops.difference(image, bg)
    diff = ImageChops.add(diff, diff, 2.0, -40) # offset threshold
    bbox = diff.getbbox()
    if bbox:
        # Pad slightly
        pad = 8
        left = max(0, bbox[0] - pad)
        top = max(0, bbox[1] - pad)
        right = min(image.width, bbox[2] + pad)
        bottom = min(image.height, bbox[3] + pad)
        return image.crop((left, top, right, bottom))
    return image

for i, w in enumerate(washers):
    left = int(i * col_width + 12)
    right = int((i + 1) * col_width - 12)
    
    # Crop the raw washer photo
    cropped_washer = im.crop((left, y_top, right, y_bottom))
    
    # Trim excess background (most corners of the photo are light grey or white)
    # Get top-left pixel color as representative background
    top_left_pixel = cropped_washer.getpixel((3, 3))
    trimmed = trim_bg(cropped_washer, top_left_pixel)
    
    # Save the cropped and cleaned washer image
    dest_path = f"public/washers/{w['name']}.png"
    trimmed.save(dest_path)
    print(f"SUCCESS: Extracted {w['label']} to {dest_path} (Size: {trimmed.width}x{trimmed.height})")
