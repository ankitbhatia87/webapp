# 🚀 v2 Component Architecture - Quick Reference Card

## 4 Strategies Explained

| Strategy | Best For | Complexity | Scalability |
|----------|----------|-----------|------------|
| **Hybrid** ⭐ RECOMMENDED | Most projects | Medium | ⭐⭐⭐⭐⭐ |
| Global Only | Simple apps | Low | ⭐⭐⭐ |
| Route-Specific Only | Monolithic routes | Medium | ⭐⭐⭐⭐ |
| Separate `/lib` | Libraries | High | ⭐⭐ |

---

## Your v2 Structure (Hybrid)

```
src/app/
├── components/           ← Global (reused 2+ places)
├── features/             ← Shared layout components
├── hooks/                ← Custom hooks
├── admin/(components)/   ← Admin-only components
├── photography/(components)/  ← Photography-only components
└── api/                  ← API routes
```

---

## Decision Tree

```
                        START: New Component
                              |
                         Is it reused
                         in 2+ routes?
                              |
                    YES ← ? → NO
                     |         |
                     ▼         ▼
            Global Component   Route-Specific Component
        src/app/components/    src/app/{route}/(components)/
        
        Examples:             Examples:
        • Button              • PhotoUploadForm
        • Modal               • AdminStats
        • Image               • CategoryFilter
        • Card                • GalleryGrid
```

---

## File Structure Template

### Global Component
```typescript
// src/app/components/MyButton/index.tsx
export { default } from './MyButton'

// src/app/components/MyButton/MyButton.tsx
import { MyButtonProps } from './types'

export default function MyButton({ ... }: MyButtonProps) {
  return <button>...</button>
}

// src/app/components/MyButton/types.ts
export interface MyButtonProps {
  // ...
}
```

### Route-Specific Component
```typescript
// src/app/admin/(components)/PhotoUpload.tsx
export default function PhotoUpload() {
  return <form>...</form>
}
```

### Custom Hook
```typescript
// src/app/hooks/useMyFeature.ts
export function useMyFeature() {
  const [state, setState] = useState(null)
  // ...
  return { state }
}
```

---

## Import Patterns

```typescript
// Global (from anywhere)
import Button from '@/app/components/Button'
import Modal from '@/app/components/Modal'

// Route-specific (from same route)
import PhotoUpload from './(components)/PhotoUpload'

// Hooks (from anywhere)
import { useAuth } from '@/app/hooks/useAuth'

// Features (shared layouts)
import Header from '@/app/features/Header'
```

---

## When to Move Components

### Local → Global
- ✅ Component used in 2+ routes
- ✅ Logic is decoupled from route
- ✅ Other devs need to reuse it
- ✅ Can be modified without breaking routes

### Global → Local
- ✅ Component only used in one route now
- ✅ Route-specific logic added
- ✅ Simplify global folder

**How to move:**
```bash
# Move from admin/(components)/ to components/
mv src/app/admin/\(components\)/PhotoCard.tsx src/app/components/PhotoCard/PhotoCard.tsx

# Update imports in both places
# Delete old route-specific version

git add .
git commit -m "refactor: Move PhotoCard to global components"
```

---

## Naming Conventions

✅ **Good**
```
src/app/components/Button/Button.tsx
src/app/components/Modal/Modal.tsx
src/app/admin/(components)/PhotoUploadForm.tsx
src/app/photography/(components)/GalleryGrid.tsx
src/app/hooks/usePhotos.ts
src/app/hooks/useAuth.ts
```

❌ **Avoid**
```
src/app/Button.tsx               (ambiguous)
src/app/components/button.tsx    (inconsistent case)
src/app/admin/Button.tsx         (looks global but isn't)
src/app/hooks/usePhotos.js       (wrong file type)
```

---

## Folder Creation Cheat Sheet

```bash
# Global component
mkdir -p src/app/components/MyComponent
cd src/app/components/MyComponent
touch index.tsx MyComponent.tsx types.ts

# Route-specific component (admin example)
mkdir -p src/app/admin/\(components\)
touch src/app/admin/\(components\)/MyFeature.tsx

# Route-specific component (photography example)
mkdir -p src/app/photography/\(components\)
touch src/app/photography/\(components\)/MyFeature.tsx

# Custom hook
touch src/app/hooks/useMyHook.ts
```

---

## Component Size Guide

### Keep Small & Focused
- ✅ < 300 lines per component
- ✅ Single responsibility
- ✅ Max 3-4 props

### When Component Gets Large
- Extract logic to custom hook
- Split into sub-components
- Move shared logic to `lib/`

**Example:**
```typescript
// ❌ TOO LARGE (400+ lines)
export default function PhotoGallery({ photos, onDelete, onEdit }) {
  // upload logic
  // delete logic
  // edit logic
  // filter logic
  // 400 lines total
  return (...)
}

// ✅ BETTER (split responsibilities)
export default function PhotoGallery() {
  const { photos, loading } = usePhotos()    // ← Custom hook
  const { deletePhoto } = usePhotoDelete()   // ← Custom hook
  const { editPhoto } = usePhotoEdit()       // ← Custom hook
  
  return (
    <div>
      <GalleryHeader />         {/* ← Sub-component */}
      <PhotoGrid />             {/* ← Sub-component */}
      <PhotoFilters />          {/* ← Sub-component */}
    </div>
  )
}
```

---

## Folder Structure at Different Scales

### Startup Scale (Simple)
```
components/
├── Button
├── Modal
└── Image

No route-specific folders needed
```

### Growth Stage (Your v2)
```
components/        (UI library)
features/          (Layouts)
hooks/             (Logic)
admin/(components)
photography/(components)
```

### Enterprise Scale
```
components/        (Design system)
features/          (Feature modules)
hooks/             (Hooks library)
utils/             (Utilities)
lib/               (Types, constants)
{route}/(components)  (Each route)
{route}/(hooks)       (Each route)
{route}/utils/        (Each route)
```

---

## Commit Messages for v2

```bash
# New component
git commit -m "v2: Add PhotoCard component"

# Route-specific features
git commit -m "v2: Add admin upload form and stats components"

# Custom hooks
git commit -m "v2: Add usePhotos and useAuth hooks"

# Refactoring
git commit -m "v2: Move PhotoCard from admin to global components"
```

---

## Next Steps

1. ✅ Understand the hybrid architecture
2. ✅ Review folder structure
3. ✅ Read V2_COMPONENT_STRUCTURE_GUIDE.md for details
4. ⏳ Create your first v2 component!
5. ⏳ Deploy v2 Vercel project

---

## 📚 Full Guides

- **V2_COMPONENT_ARCHITECTURE.md** - Deep dive into 4 strategies
- **V2_COMPONENT_STRUCTURE_GUIDE.md** - Practical implementation guide
- **V2_WORKFLOW.md** - Git workflow & development process

---

## 🎯 Remember

- **Hybrid = Flexible** - Can refactor easily
- **Reusable First** - Check global before local
- **Small & Focused** - Keep components simple
- **Consistent** - Use same patterns everywhere
- **Documented** - Comments help future developers

**You're ready to build v2! 🚀**
