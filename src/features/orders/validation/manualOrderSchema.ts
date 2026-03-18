import * as yup from "yup";

export const manualOrderSchema = yup.object({
  clientName: yup
    .string()
    .required("Le nom du client est requis")
    .min(2, "Le nom doit contenir au moins 2 caractères"),
  
  clientPhone: yup
    .string()
    .required("Le numéro de téléphone est requis")
    .matches(/^[0-9]{8,12}$/, "Le numéro doit contenir entre 8 et 12 chiffres"),
  
  userId: yup
    .string()
    .optional(),
  
  shippingMode: yup
    .string()
    .oneOf(["air", "sea"], "Mode d'expédition invalide")
    .required("Le mode d'expédition est requis"),
  
  shipmentLine: yup
    .string()
    .when("shippingMode", {
      is: "sea",
      then: (schema) => schema.required("La ligne d'expédition est requise pour le maritime"),
      otherwise: (schema) => schema.optional(),
    }),
  
  estimatedCbm: yup
    .string()
    .when("orderType", {
      is: "prebooking",
      then: (schema) => 
        schema
          .required("Le CBM estimé est requis pour les pré-réservations")
          .matches(/^[0-9]+\.?[0-9]*$/, "Veuillez entrer un nombre valide"),
      otherwise: (schema) => schema.optional(),
    }),
  
  orderType: yup
    .string()
    .oneOf(["standard", "prebooking"], "Type de commande invalide")
    .required("Le type de commande est requis"),
  
  notes: yup
    .string()
    .max(500, "Les notes ne peuvent pas dépasser 500 caractères"),
});

export type ManualOrderFormValues = yup.InferType<typeof manualOrderSchema>;
export type ManualOrderSchemaType = ManualOrderFormValues; // Backward compatibility
