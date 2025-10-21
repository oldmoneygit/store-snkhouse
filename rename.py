import os
import shutil

source_dir = './referencias/seedream'
target_dir = './public/images/bestsellers'

# Create target directory if it doesn't exist
os.makedirs(target_dir, exist_ok=True)

for filename in os.listdir(source_dir):
    if filename.endswith('.png'):
        # Remove all types of special quotes
        new_filename = filename
        new_filename = new_filename.replace('"', '')  # Left double quotation mark
        new_filename = new_filename.replace('"', '')  # Right double quotation mark
        new_filename = new_filename.replace(''', '')  # Left single quotation mark
        new_filename = new_filename.replace(''', '')  # Right single quotation mark
        new_filename = new_filename.replace('"', '')  # Fullwidth quotation mark
        new_filename = new_filename.replace('″', '')  # Double prime

        source_path = os.path.join(source_dir, filename)
        target_path = os.path.join(target_dir, new_filename)

        shutil.copy2(source_path, target_path)
        print(f'Copied: {filename} -> {new_filename}')

print('\nDone!')
