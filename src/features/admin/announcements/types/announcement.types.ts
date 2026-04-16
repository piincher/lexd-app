/**
 * Announcement Types
 */

export interface Announcement {
  _id: string;
  title: string;
  message: string;
  link?: string;
  isActive: boolean;
  publishDate: string;
  expirationDate?: string;
}

export interface CreateAnnouncementInput {
  title: string;
  message: string;
  link?: string;
  isActive: boolean;
  publishDate?: string;
  expirationDate?: string;
}
