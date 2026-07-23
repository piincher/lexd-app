import { useState, useCallback } from "react";
import * as ImagePicker from "expo-image-picker";
import axiosInstance from "@src/api/client";
import { mapRange } from "../lib/mapRange";

export function useEditOrderImages(initialImages: any[] = []) {
  const [selectedImages, setSelectedImages] = useState(initialImages);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const uploadImages = async (base64Images: (string | undefined | null)[]) => {
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
              const uploaded = mapRange({
                inputMin: 0,
                inputMax: progressEvent.total || 0,
                outputMin: 0,
                outputMax: 100,
                inputValue: progressEvent.loaded,
              });
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

  const pickImage = useCallback(async () => {
    setShowModal(false);
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      base64: true,
      quality: 0.3,
    });
    if (pickerResult.canceled) return;
    const images = pickerResult.assets.map((data) => data.base64);
    await uploadImages(images);
  }, []);

  const takePhoto = useCallback(async () => {
    setShowModal(false);
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Camera access is required to take a photo");
      return;
    }
    const pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.3,
      base64: true,
    });
    console.log("pickerResult", pickerResult);
    if (pickerResult.canceled) return;
    const images = pickerResult.assets.map((data) => data.base64);
    await uploadImages(images);
  }, []);

  const deleteImage = useCallback((id: string) => {
    setSelectedImages((prev) => prev.filter((image) => image.public_id !== id));
  }, []);

  return {
    selectedImages,
    setSelectedImages,
    isLoading,
    uploadProgress,
    showModal,
    setShowModal,
    pickImage,
    takePhoto,
    deleteImage,
  };
}
