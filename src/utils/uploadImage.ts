import axios from "axios";
import { toast } from "sonner";

const uploadImageToCloudinary = async (
  imageFile: FileList | null
): Promise<string | undefined> => {
  const cloudinaryUrl = `cloudinary://122373185126954:RJxLjA45D_N67O8yXvIJHwNnQr8@dzzokyuu0`

  if (!cloudinaryUrl) {
    toast.error("Cloudinary URL is not set in environment variables.");
    return undefined;
  }

  if (!imageFile || imageFile.length === 0) {
    return undefined;
  }

  const formData = new FormData();
  formData.append("file", imageFile[0]);
  formData.append("upload_preset", "imageUpload");

  try {
    const response = await axios.post(cloudinaryUrl, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.secure_url;
  } catch (error:any) {
    if (error.response) {
      console.error("Cloudinary Error Response:", error.response.data);
    }
    toast.error(`Image upload failed: ${error.message}`);
    return undefined;
  }
};

export default uploadImageToCloudinary;
