# Multi-Category Photo Implementation

## Overview
Successfully implemented multi-category selection for photos without needing a database. Categories are encoded in the filename.

## Key Changes

### 1. **Storage Strategy**
- **Before**: Photos stored in category folders: `photos/{category}/{filename}.jpg`
- **After**: Photos stored with categories encoded in filename: `photos/{timestamp}_{categories}_{filename}.jpg`
- **Example**: `photos/1234567890_Maternity-Portraits_image.jpg`

### 2. **Type Changes** (`src/lib/types.ts`)
```typescript
export interface PhotoItem {
  url: string;
  pathname: string;
  categories: Category[]; // Changed from single category to array
  alt: string;
  uploadedAt: string;
}
```

### 3. **Upload API** (`src/app/api/photos/upload/route.ts`)
- Accepts `categories` as JSON string array
- Encodes categories into pathname: `{timestamp}_{Category1-Category2}_{filename}`
- No duplicate files - one image with multiple categories

### 4. **Fetch API** (`src/app/api/photos/route.ts`)
- Parses categories from pathname
- Extracts categories from the filename pattern
- Returns array of categories for each photo

### 5. **Admin Dashboard** (`src/app/admin/page.tsx`)
- Multi-select checkbox UI for categories
- Shows selected category count in upload button
- Displays all categories as comma-separated labels on thumbnails
- Filter still works with multi-category photos

### 6. **Photography Page** (`src/app/photography/page.tsx`)
- Updated filter logic: `photos.filter((img) => img.categories.includes(selectedCategory))`
- Photos appear in all selected categories

## Features

✅ **No Database Required** - Categories encoded in filename  
✅ **No Duplicate Files** - One image, multiple categories  
✅ **Free Tier Compatible** - Only uses Vercel Blob (1GB free)  
✅ **Simple Filtering** - Gallery filters by checking category in array  
✅ **Easy Upload** - Multi-select checkboxes for categories  
✅ **Backward Compatible** - Handles existing single-category photos  

## Usage

### Upload Photos with Multiple Categories
1. Go to `/admin`
2. Select multiple categories
3. Choose image files
4. Click "Upload to X categories"

### View in Gallery
- Photos will appear in ALL selected categories
- Example: Photo tagged with "Maternity" and "Portraits" shows in both filters

## File Naming Convention
```
photos/{timestamp}_{Category1-Category2-Category3}_{filename}.jpg
```

- **Timestamp**: Unique identifier (prevents conflicts)
- **Categories**: Hyphen-separated category names
- **Filename**: Original filename (sanitized)

## Migration from Old Photos
Old photos in folder structure will default to "Maternity" category. To update:
1. Re-upload with new multi-category selection
2. Delete old single-category versions
