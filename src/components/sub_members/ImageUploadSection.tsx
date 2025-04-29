import React from 'react';

interface Props {
  formData: any;
  setFormData: (callback: (prev: any) => any) => void;
}

export default function ImageUploadSection({ formData, setFormData }: Props) {
  const [preview, setPreview] = React.useState<ArrayBuffer | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setFormData((prev) => ({ ...prev, image: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
  };

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#01438f] mb-2">Profile Image</h2>
        <p className="text-sm text-gray-600 mb-6">
          Upload a clear photo (JPEG, JPG, or PNG format recommended).
        </p>
      </div>

      <div className="flex flex-col items-center space-y-6">
        {/* Image Preview or Placeholder */}
        <div className="relative">
          {formData.image ? (
            <>
              <img
                src={typeof formData.image === 'string' ? formData.image : preview}
                alt="Profile Preview"
                className="w-40 h-40 rounded-full object-cover border-4 border-gray-300 shadow-sm"
              />
              <button
                type="button"
                onClick={clearImage}
                className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 h-[40px] w-[40px] text-2xl hover:bg-red-600 transition"
                title="Remove Image"
              >
                &times;
              </button>
            </>
          ) : (
            <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 border-4 border-gray-300 shadow-sm">
              No Image
            </div>
          )}
        </div>

        {/* Upload Button */}
        <label className="cursor-pointer bg-[#01438f] text-[#fff] font-bold px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          Upload Image
          <input
            type="file"
            accept="image/jpeg, image/jpg, image/png"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>
    </section>
  );
}
