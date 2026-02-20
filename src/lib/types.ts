export type Category =
  | "All"
  | "Portraits"
  | "Kids"
  | "Maternity"
  | "Lifestyle"
  | "Product"
  | "Wildlife"
  | "Nature";

export interface PhotoItem {
  url: string;
  pathname: string;
  categories: Category[]; // Changed from single category to array
  alt: string;
  uploadedAt: string;
}

export const CATEGORIES: readonly Category[] = [
  "All",
  "Portraits",
  "Kids",
  "Maternity",
  "Lifestyle",
  "Product",
  "Wildlife",
  "Nature",
] as const;
