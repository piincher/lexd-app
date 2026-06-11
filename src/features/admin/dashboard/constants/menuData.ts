/**
 * Menu data constants for admin dashboard
 */

export interface MenuItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  badge?: number;
}

export interface MenuCategory {
  id: string;
  title: string;
  icon: string;
  items: MenuItem[];
}

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "goods",
    title: "Marchandises",
    icon: "package-variant",
    items: [
      {
        id: "g1",
        title: "Recevoir une marchandise",
        description: "Enregistrer un colis entrant",
        icon: "package-variant-closed-plus",
        route: "ReceiveGoods",
      },
      {
        id: "g2",
        title: "Liste des marchandises",
        description: "Suivre stock, statut et clients",
        icon: "format-list-bulleted-square",
        route: "AdminGoodsList",
      },
      {
        id: "g3",
        title: "Marchandises annulées",
        description: "Contrôler les colis annulés",
        icon: "package-variant-remove",
        route: "VoidGoodsList",
      },
    ],
  },
  {
    id: "orders",
    title: "Commandes",
    icon: "clipboard-list",
    items: [
      {
        id: "o1",
        title: "Toutes les commandes",
        description: "Ouvrir le carnet opérationnel",
        icon: "clipboard-text",
        route: "AllOrders",
      },
      {
        id: "o3",
        title: "Créer une commande",
        description: "Démarrer un envoi client",
        icon: "plus-box",
        route: "ChooseShippingMethod",
      },
      {
        id: "o4",
        title: "Commandes passées",
        description: "Consulter les archives livrées",
        icon: "archive-clock",
        route: "AdminPastOrders",
      },
      {
        id: "o5",
        title: "Mise à jour groupée",
        description: "Changer plusieurs statuts",
        icon: "playlist-edit",
        route: "BatchUpdate",
      },
    ],
  },
  {
    id: "logistics",
    title: "Logistique",
    icon: "truck-delivery",
    items: [
      {
        id: "l1",
        title: "Conteneurs",
        description: "Planifier et suivre les départs",
        icon: "ferry",
        route: "ContainerList",
      },
      {
        id: "l2",
        title: "Lettres de transport aérien",
        description: "Gérer les lots aériens",
        icon: "airplane",
        route: "AirwayBillList",
      },
      {
        id: "l3",
        title: "Consignataires",
        description: "Maintenir les destinataires",
        icon: "account-tie",
        route: "ConsigneeList",
      },
      {
        id: "l4",
        title: "Routes",
        description: "Paramétrer les corridors",
        icon: "map-marker-path",
        route: "RouteList",
      },
    ],
  },
  {
    id: "customers",
    title: "Clients",
    icon: "account-group",
    items: [
      {
        id: "c1",
        title: "Gestion des clients",
        description: "Rechercher et administrer les comptes",
        icon: "account-cog",
        route: "ClientManagement",
      },
      {
        id: "c1b",
        title: "Clients à risque",
        description: "Surveiller les comptes sensibles",
        icon: "account-alert",
        route: "AtRiskCustomers",
      },
      {
        id: "c2",
        title: "Ajouter un utilisateur",
        description: "Créer un nouveau compte",
        icon: "account-plus",
        route: "UserAdd",
      },
      {
        id: "c3",
        title: "Envoyer un SMS",
        description: "Contacter les clients",
        icon: "message-text",
        route: "SendSms",
      },
      {
        id: "c4",
        title: "Émettre un certificat",
        description: "Créer une attestation client",
        icon: "certificate",
        route: "IssueCertificate",
      },
      {
        id: "c5",
        title: "Historique des certificats",
        description: "Retrouver les attestations",
        icon: "file-certificate",
        route: "CertificateHistory",
      },
      {
        id: "c6",
        title: "Avis clients",
        description: "Lire et modérer les retours",
        icon: "star-box",
        route: "AdminReviews",
      },
      {
        id: "c7",
        title: "Tickets support",
        description: "Traiter les demandes client",
        icon: "ticket-confirmation",
        route: "AdminTicketList",
      },
      {
        id: "c8b",
        title: "Catalogue récompenses",
        description: "Gérer les articles échangeables",
        icon: "store",
        route: "AdminRewardItems",
      },
      {
        id: "c8c",
        title: "Échanges produits",
        description: "Traiter les demandes d'échange",
        icon: "swap-horizontal",
        route: "AdminProductRedemptions",
      },
      {
        id: "c8d",
        title: "Gestion des points",
        description: "Ajuster les soldes clients",
        icon: "account-cash",
        route: "AdminPointsManagement",
      },
      {
        id: "c9b",
        title: "Paramètres points V2",
        description: "Configurer la fidélité et les taux",
        icon: "cog-counterclockwise",
        route: "AdminRewardSettingsV2",
      },
      {
        id: "c10",
        title: "Promotions",
        description: "Gérer les offres actives",
        icon: "sale",
        route: "ManagePromos",
      },
      {
        id: "c10b",
        title: "Automatisation win-back",
        description: "Relancer les clients inactifs",
        icon: "account-reactivate",
        route: "WinBackDashboard",
      },
      {
        id: "c11",
        title: "Campagnes push",
        description: "Préparer les notifications",
        icon: "bell-ring",
        route: "CampaignList",
      },
      {
        id: "c13",
        title: "Événements",
        description: "Mode événement (Coupe du Monde…)",
        icon: "calendar-star",
        route: "EventList",
      },
      {
        id: "c12",
        title: "Annonces",
        description: "Publier les messages admin",
        icon: "bullhorn",
        route: "AnnouncementList",
      },
    ],
  },
  {
    id: "tools",
    title: "Outils",
    icon: "tools",
    items: [
      {
        id: "t1",
        title: "Scanner un QR code",
        description: "Lire un code de suivi",
        icon: "qrcode-scan",
        route: "ScanQRCode",
      },
      {
        id: "t2",
        title: "Statistiques",
        description: "Voir les indicateurs globaux",
        icon: "chart-line",
        route: "Stats",
      },
      {
        id: "t3",
        title: "Export des données",
        description: "Télécharger les rapports",
        icon: "database-export",
        route: "DataExport",
      },
      {
        id: "t4",
        title: "WhatsApp manuel",
        description: "Envoyer un message direct",
        icon: "whatsapp",
        route: "SendWhatsApp",
      },
      {
        id: "t5",
        title: "Journal d'audit",
        description: "Contrôler les actions sensibles",
        icon: "shield-search",
        route: "AuditLogs",
      },
      {
        id: "t6",
        title: "Événements de notification",
        description: "Inspecter les envois système",
        icon: "bell-badge",
        route: "NotificationEvents",
      },
      {
        id: "t7",
        title: "Paramètres de version",
        description: "Gérer la politique de mise à jour",
        icon: "cellphone-cog",
        route: "AppVersionSettings",
      },
    ],
  },
];
