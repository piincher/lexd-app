import { useState, useEffect } from "react";
import { useEditOrder, useDeleteImage } from "./useOrderManagement";
import { useGetOrderDetails } from "@src/shared/hooks/useOrderDetail";
import { useGetCategory } from "../../hooks/useCategory";
import { useShippingMode } from "@src/store/shippingMode";
import { useEditOrderImages } from "./useEditOrderImages";
import type { OrderFormValues } from "../types";

export function useEditOrderScreen({ navigation, route }: any) {
  const orderId = route.params.id;
  const orderIdParam = route.params.orderId;
  const { data: item } = useGetOrderDetails(orderId);
  const { mutate, isSuccess, isPending } = useEditOrder();
  const { mutate: deleteMutation } = useDeleteImage();
  const { data: categories } = useGetCategory();
  const shippingMay = useShippingMode((state) => state.type);
  const [visible, setVisible] = useState(false);
  const [pickerValue, setPickerValue] = useState<string | null>(null);
  const [category, setCategory] = useState<string>(orderIdParam);
  const [shippingMode, setShippingMode] = useState<"air" | "sea">(shippingMay);
  const [date, setDate] = useState<Date | null>(item?.departureDate ? new Date(item.departureDate) : null);
  const [open, setOpen] = useState(false);
  const images = useEditOrderImages(item?.images || []);

  useEffect(() => {
    if (isSuccess) {
      setVisible(true);
      setTimeout(() => { navigation.navigate("HomeTab", { screen: "Home" }); }, 900);
    }
  }, [isSuccess]);

  const handleSubmit = async (values: OrderFormValues) => {
    if (!date) return alert("Veuillez choisir une date de depart");
    const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    mutate({ ...values, images: images.selectedImages, partenaire: values.partenaire || "Chez Fode", userId: item?.userId!, departureDate: startDate, category, orderId, shippingMode });
    console.log("values", values);
  };

  const handleDeleteImage = (id: string) => {
    console.log("id", id);
    const img = images.selectedImages.find((image: any) => image.public_id === id)?.public_id;
    deleteMutation({ public_id: img! });
    images.deleteImage(id);
  };

  const onDismissSnackBar = () => setVisible(false);

  const initialValues = {
    clientName: item?.clientName, clientPhone: item?.clientPhone, packageWeight: item?.packageWeight,
    quantity: item?.quantity, typeOfPackage: item?.typeOfPackage, category,
    priceTotal: item?.priceTotal, shippingMode: item?.shippingMode, packageCBM: item?.packageCBM,
    contenairNumber: item?.contenairNumber, unitPrice: item?.unitPrice,
  };

  return { visible, pickerValue, setPickerValue, category, setCategory, shippingMode, setShippingMode, date, setDate, open, setOpen, categories, isPending, images, handleSubmit, handleDeleteImage, onDismissSnackBar, initialValues };
}
