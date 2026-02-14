export type Category =
  | "All"
  | "Portraits"
  | "Kids"
  | "Maternity"
  | "Lifestyle"
  | "Candid Moments"
  | "Wildlife"
  | "Nature";

export interface PhotoItem {
  url: string;
  pathname: string;
  category: Category;
  alt: string;
  uploadedAt: string;
}

export const CATEGORIES: Category[] = [
  "All",
  "Portraits",
  "Kids",
  "Maternity",
  "Lifestyle",
  "Candid Moments",
  "Wildlife",
  "Nature",
];

/** Convert a Category to a lowercase folder-safe slug */
export function categoryToSlug(category: Category): string {
  return category.toLowerCase().replace(/\s+/g, "-");
}

/** Convert a lowercase slug back to its Category */
const SLUG_TO_CATEGORY: Record<string, Category> = {
  portraits: "Portraits",
  kids: "Kids",
  maternity: "Maternity",
  lifestyle: "Lifestyle",
  "candid-moments": "Candid Moments",
  wildlife: "Wildlife",
  nature: "Nature",
};

export function slugToCategory(slug: string): Category {
  return SLUG_TO_CATEGORY[slug] || "Maternity";
}
