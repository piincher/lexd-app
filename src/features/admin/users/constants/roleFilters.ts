export type RoleFilter = "all" | "user" | "staff" | "admin" | "superadmin";

export const ROLE_LABELS: Record<RoleFilter, string> = {
  all: "Tous",
  user: "Clients",
  staff: "Staff",
  admin: "Admins",
  superadmin: "Superadmins",
};
