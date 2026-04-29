import { useEffect, useMemo, useState } from "react";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useShippingMode } from "@src/store/shippingMode";
import { sendPushNotification } from "@src/shared/lib/pushNotification";
import { hapticSuccess } from "@src/shared/lib/haptics";
import { usePlaceOrder } from "../../hooks/useOrderManagement";
import { useGetCategory } from "../../../hooks/useCategory";
import type { RootStackScreenProps } from "@src/navigations/type";
import { AddOrderValues } from "../AddOrder.types";
import { SelectedImage } from "./useAddOrderImages";

export const useAddOrderForm = ({ navigation, route }: RootStackScreenProps<"AddOrder">) => {
  const { colors } = useAppTheme();
  const shippingWay = useShippingMode((state) => state.type);
  const { mutate, isSuccess, isPending, data: orderData } = usePlaceOrder();
  const { data: categories } = useGetCategory();
  const [shippingMode, setShippingMode] = useState<"air" | "sea">(shippingWay);
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [pickerValue, setPickerValue] = useState<string | null>(null);
  const firstCategoryId = categories ? categories[0]?._id : "";
  useEffect(() => { if (firstCategoryId) { setCategory(firstCategoryId); setPickerValue(firstCategoryId); } }, [firstCategoryId]);
  const process = useMemo(() => ({ id: Math.random().toString(36).substring(7), title: "Le client a passé une commande", time: new Date().toISOString() }), []);
  const startDate = useMemo(() => date ? new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1) : new Date(1970, 0, 1), [date]);
  const onDismissSingle = () => setOpen(false);
  const onConfirmSingle = (params: { date: Date }) => { setOpen(false); setDate(params.date); };
  const handleSubmit = async (values: AddOrderValues, selectedImages: SelectedImage[]) => {
    hapticSuccess();
    if (!date) { alert("Veuillez choisir une date de depart"); return; }
    mutate({
      ...values,
      images: selectedImages,
      currentPosition: shippingMode === "sea" ? process : [],
      partenaire: values.partenaire || "Chez Fode",
      userId: route.params.userId,
      departureDate: startDate,
      category,
      shippingMode,
      packageCBM: values.packageCBM || "0",
      dateOfReceipt: startDate,
      contenairNumber: values.contenairNumber || "0",
      priceTotal: values.priceTotal,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
  };
  useEffect(() => {
    if (isSuccess) {
      sendPushNotification(route.params.pushTokens, "Nouvelle Commande Ajoutée", "Votre commande a été ajoutée avec succès !", orderData?.data._id || "");
      setVisible(true);
      setTimeout(() => navigation.navigate("HomeTab", { screen: "Home" }), 900);
    }
  }, [isSuccess, navigation, orderData?.data._id, route.params.pushTokens]);
  const onDismissSnackBar = () => setVisible(false);
  const initialValues = {
    clientName: route.params.clientName,
    clientPhone: route.params.phoneNumber,
    packageWeight: "0",
    partenaire: "",
    quantity: "1",
    priceTotal: "0",
    unitPrice: "0",
    shippingMode: shippingWay,
    typeOfPackage: category,
    category,
    currentPosition: { id: "", title: "", time: "" },
  };
  const handleShippingModeChange = (mode: "air" | "sea") => setShippingMode(mode);
  return { colors, shippingMode, visible, isPending, date, open, category, pickerValue, categories, onDismissSingle, onConfirmSingle, handleSubmit, onDismissSnackBar, initialValues, handleShippingModeChange, setOpen, setPickerValue, setCategory };
};
