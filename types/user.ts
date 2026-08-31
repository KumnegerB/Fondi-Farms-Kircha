export interface CustomerProfile {
  id: string;
  telegramId?: number;
  telegramUsername?: string;
  firstName: string;
  lastName?: string;
  phoneNumber: string; // Ethiopian phone format e.g. +2519...
  languageCode?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "super_admin" | "staff";
  createdAt: string;
}
