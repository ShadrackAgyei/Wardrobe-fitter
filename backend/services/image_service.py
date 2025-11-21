import os
import uuid
from fastapi import UploadFile
from PIL import Image
import io


class ImageService:
    def __init__(self, upload_dir: str = "uploads"):
        self.upload_dir = upload_dir

    async def save_image(self, file: UploadFile, subfolder: str) -> str:
        """
        Save uploaded image to disk and return the file path
        """
        # Create subfolder if it doesn't exist
        folder_path = os.path.join(self.upload_dir, subfolder)
        os.makedirs(folder_path, exist_ok=True)

        # Generate unique filename
        file_extension = os.path.splitext(file.filename)[1]
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        file_path = os.path.join(folder_path, unique_filename)

        # Read and validate image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))

        # Resize if too large (max 1920px on longest side)
        max_size = 1920
        if max(image.size) > max_size:
            ratio = max_size / max(image.size)
            new_size = tuple(int(dim * ratio) for dim in image.size)
            image = image.resize(new_size, Image.Resampling.LANCZOS)

        # Save image
        image.save(file_path, quality=85, optimize=True)

        # Return relative path
        return file_path.replace("\\", "/")

    def delete_image(self, file_path: str) -> bool:
        """
        Delete an image from disk
        """
        try:
            if os.path.exists(file_path):
                os.remove(file_path)
                return True
        except Exception as e:
            print(f"Error deleting image: {e}")
        return False
