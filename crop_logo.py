from PIL import Image, ImageChops

def trim(im):
    # Create a solid background image with the color of the top-left pixel
    bg = Image.new(im.mode, im.size, im.getpixel((0,0)))
    diff = ImageChops.difference(im, bg)
    # Add a bit of thresholding to handle compression artifacts
    diff = ImageChops.add(diff, diff, 2.0, -50)
    bbox = diff.getbbox()
    if bbox:
        # Add a 10px padding around the cropped bounding box to keep it looking clean
        padding = 10
        left = max(0, bbox[0] - padding)
        top = max(0, bbox[1] - padding)
        right = min(im.width, bbox[2] + padding)
        bottom = min(im.height, bbox[3] + padding)
        return im.crop((left, top, right, bottom))
    return im

try:
    im = Image.open("public/logo.png")
    # Convert to RGB
    im_rgb = im.convert("RGB")
    cropped = trim(im_rgb)
    cropped.save("public/logo.png")
    print("SUCCESS: Logo cropped to content bounds.")
except Exception as e:
    print("ERROR:", str(e))
