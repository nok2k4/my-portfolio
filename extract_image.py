import fitz
import sys
import os

pdf_path = r"C:\Users\chjl0\OneDrive\Documents\CV-QUACHVANNGOC-NHANVIENIT.pdf"
out_dir = r"d:\ngoc\portfolio\public"

try:
    doc = fitz.open(pdf_path)
    page = doc[0]
    image_list = page.get_images()
    for image_index, img in enumerate(image_list, start=1):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        out_path = os.path.join(out_dir, f"cv-avatar-{image_index}.{image_ext}")
        with open(out_path, "wb") as f:
            f.write(image_bytes)
        print(f"Saved {out_path} ({len(image_bytes)} bytes)")
except Exception as e:
    print(f"Error: {e}")
