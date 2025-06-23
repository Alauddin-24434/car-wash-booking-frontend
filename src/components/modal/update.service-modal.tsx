import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

interface UpdateServiceModalProps {
  updateToggleModel: () => void;
  serviceId: string | null;
}

interface FormData {
  name: string;
  description: string;
  duration: string;
  price: string;
  image?: FileList;
}

const UpdateServiceModal: React.FC<UpdateServiceModalProps> = ({ updateToggleModel, serviceId }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    if (!serviceId) return;
    // Fetch service data by serviceId and populate form
    // Example:
    // const fetchService = async () => {
    //   const res = await api.get(`/services/${serviceId}`);
    //   const service = res.data;
    //   setValue("name", service.name);
    //   setValue("description", service.description);
    //   setValue("duration", service.duration);
    //   setValue("price", service.price);
    // };
    // fetchService();
  }, [serviceId, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("duration", data.duration);
      formData.append("price", data.price);
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]); // Optional new image
      }

      // Call your API to update service by serviceId here:
      // await api.put(`/services/${serviceId}`, formData);

      reset();
      updateToggleModel();
      alert("Service updated successfully!");
    } catch (error) {
      console.error("Error updating service:", error);
      alert("Failed to update service");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Update Service</h2>
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

          <input {...register("image")} type="file" accept="image/*" className="w-full" />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={updateToggleModel}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">
              Update Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateServiceModal;
