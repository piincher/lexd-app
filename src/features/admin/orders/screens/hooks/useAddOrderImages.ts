import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import axiosInstance from "@src/api/client";
import { useDeleteImage } from "../../hooks/useOrderManagement";
import { mapRange } from "../../lib/mapRange";

export interface SelectedImage {
  url: string;
  public_id: string;
}

export const useAddOrderImages = () => {
  const { mutate: deleteMutation } = useDeleteImage();
  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [, setUploadProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const uploadImages = async (base64Images: (string | null | undefined)[]) => {
    setIsLoading(true);
    for (const image of base64Images) {
      if (!image) continue;
      try {
        const base64Image = `data:image/jpg;base64,${image}`;
        const { data } = await axiosInstance.post(
          "/order/upload",
          { image: base64Image },
          {
            onUploadProgress(progressEvent) {
              const uploaded = mapRange({ inputMin: 0, inputMax: progressEvent.total || 0, outputMin: 0, outputMax: 100, inputValue: progressEvent.loaded });
              if (uploaded >= 100) setIsLoading(false);
              setUploadProgress(Math.floor(uploaded));
            },
          }
        );
        setSelectedImages((prev) => [...prev, data]);
      } catch (error) {
        console.log("Upload error:", error);
      }
    }
    setIsLoading(false);
  };

  const pickImage = async () => {
    setShowModal(false);
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) { alert("Gallery access is required to select an image"); return; }
    const pickerResult = await ImagePicker.launchImageLibraryAsync({ allowsMultipleSelection: true, base64: true, quality: 0.3 });
    if (pickerResult.canceled) return;
    await uploadImages(pickerResult.assets.map((data) => data.base64));
  };

  const takePhoto = async () => {
    setShowModal(false);
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) { alert("Camera access is required to take a photo"); return; }
    const pickerResult = await ImagePicker.launchCameraAsync({ allowsEditing: false, quality: 0.3, base64: true });
    if (pickerResult.canceled) return;
    await uploadImages(pickerResult.assets.map((data) => data.base64));
  };

  const deleteImage = (publicId: string) => {
    const img = selectedImages.find((image) => image.public_id === publicId)?.public_id;
    if (img) deleteMutation({ public_id: img });
    setSelectedImages((prev) => prev.filter((image) => image.public_id !== publicId));
  };

  return { selectedImages, isLoading, pickImage, takePhoto, deleteImage, showModal, setShowModal };
};
