from PIL import Image

try:
    img_path = r"C:\Users\MUHAMMADHU ANAS\OneDrive\Pictures\Screenshots\Screenshot 2026-07-12 182522.png"
    im = Image.open(img_path)
    print(f"Dimensions: {im.width}x{im.height}")
except Exception as e:
    print("Error:", str(e))
