from PIL import Image

img_path = r"C:\Users\MUHAMMADHU ANAS\OneDrive\Pictures\Screenshots\Screenshot 2026-07-12 182522.png"
im = Image.open(img_path).convert("RGB")

# Let's inspect column 2 (Thin Washer) which is roughly x=530 to 780
# We will scan down y from 0 to 450 at x = 650 (center of column 2)
# We want to print any coordinates where color changes significantly, 
# which will tell us exactly where the title text, photo border, and labels are!
center_x = 650
last_color = im.getpixel((center_x, 0))

print("Scanning Y changes at X=650:")
for y in range(im.height):
    color = im.getpixel((center_x, y))
    # calculate brightness difference
    diff = sum(abs(color[i] - last_color[i]) for i in range(3))
    if diff > 30:
        print(f"Y={y}: Color={color}, Diff={diff}")
    last_color = color
