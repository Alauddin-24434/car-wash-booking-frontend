import { useAddServiceMutation } from "@/redux/features/service/serviceApi";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface AddServiceModalProps {
  addToggleModel: () => void;
}

interface FormData {
  name: string;
  description: string;
  duration: string;
  price: string;
  images: FileList;
}

const AddServiceModal: React.FC<AddServiceModalProps> = ({ addToggleModel }) => {
  const [addService] = useAddServiceMutation();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const [previewImages, setPreviewImages] = useState<string[]>([]);

  // watch images to update preview
  const watchedImages = watch("images");

  React.useEffect(() => {
    if (watchedImages && watchedImages.length > 0) {
      const urls = Array.from(watchedImages).map(file => URL.createObjectURL(file));
      setPreviewImages(urls);

      // Clean up URLs on unmount or when images change
      return () => {
        urls.forEach(url => URL.revokeObjectURL(url));
      };
    } else {
      setPreviewImages([]);
    }
  }, [watchedImages]);

  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("duration", data.duration);
      formData.append("price", data.price);

      // append all images
      Array.from(data.images).forEach((file) => {
        formData.append("images", file);  // key "images" to match backend multer array
      });

      const res = await addService(formData).unwrap();
      console.log(res);

      reset();
      setPreviewImages([]);
      addToggleModel();
      alert("Service added successfully!");
    } catch (error) {
      console.error("Error adding service:", error);
      alert("Failed to add service");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 max-h-[90vh] overflow-auto">
        <h2 className="text-xl font-semibold mb-4">Add New Service</h2>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-4">
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Service Name"
            className="w-full border p-2 rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

          <textarea
            {...register("description", { required: "Description is required" })}
            placeholder="Description"
            className="w-full border p-2 rounded"
          />

          <input
            {...register("duration", { required: "Duration is required" })}
            placeholder="Duration"
            className="w-full border p-2 rounded"
          />

          <input
            {...register("price", { required: "Price is required" })}
            placeholder="Price"
            type="number"
            className="w-full border p-2 rounded"
          />

          <input
            {...register("images", { required: "At least one image is required" })}
            type="file"
            accept="image/*"
            multiple
            className="w-full"
          />
          {errors.images && <p className="text-red-500 text-sm">{errors.images.message}</p>}

          {/* Preview selected images */}
          {previewImages.length > 0 && (
            <div className="flex gap-2 flex-wrap mt-2 max-h-40 overflow-y-auto">
              {previewImages.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Preview ${idx + 1}`}
                  className="w-20 h-20 object-cover rounded border"
                />
              ))}
            </div>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={() => {
                reset();
                setPreviewImages([]);
                addToggleModel();
              }}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Submit Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddServiceModal;
