import * as yup from "yup";

export const addOrderSchema = yup.object({
  clientName: yup.string().required("Nom du client est requis"),
  clientPhone: yup.string().required("Numero de telephone est requis"),
  packageWeight: yup.number(),
  priceTotal: yup.number(),
  quantity: yup.number().required("Nombre de colis est requis"),
  packageCBM: yup.string(),
  contenairNumber: yup.string(),
  unitPrice: yup.number(),
});
