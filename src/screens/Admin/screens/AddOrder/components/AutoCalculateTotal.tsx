import { useFormikContext } from "formik";
import { useEffect } from "react";

// Create a new component that will handle the auto-calculation
const AutoCalculateTotal: React.FC<{ shippingMode: "air" | "sea" }> = ({ shippingMode }) => {
   const { values, setFieldValue } = useFormikContext();

   console.log("values", values);
   useEffect(() => {
      if (shippingMode === "sea" && values.packageCBM && values.unitPrice) {
         const cbm = parseFloat(values.packageCBM);
         const unitPrice = parseFloat(values.unitPrice.toString());
         const totalPrice = cbm * unitPrice;
         setFieldValue("priceTotal", totalPrice);
      }
   }, [values.packageCBM, values.unitPrice, shippingMode, setFieldValue]);
   useEffect(() => {
      if (shippingMode === "sea" && (!values.packageCBM || !values.unitPrice)) {
         setFieldValue("priceTotal", "0");
      }
   }, [values.packageCBM, values.unitPrice, shippingMode, setFieldValue]);

   return null;
};

export default AutoCalculateTotal;
