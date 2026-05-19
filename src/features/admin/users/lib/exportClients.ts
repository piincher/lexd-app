import { Share } from "react-native";
import { userData } from "@src/shared/types/user";

/**
 * Export client list as CSV and open share dialog.
 */
export const exportClients = async (clients: userData[]) => {
  const headers = "Nom,Téléphone,Email,Rôle,Statut\n";
  const rows = clients
    .map((c) => {
      const name = `"${c.firstName} ${c.lastName}"`;
      const phone = c.phoneNumber || "";
      const email = c.email || "";
      const role = c.role || "user";
      const status = c.blocked?.isBlocked ? "Bloqué" : "Actif";
      return `${name},${phone},${email},${role},${status}`;
    })
    .join("\n");

  const csv = headers + rows;
  await Share.share({
    message: csv,
    title: "Liste des clients",
  });
};
