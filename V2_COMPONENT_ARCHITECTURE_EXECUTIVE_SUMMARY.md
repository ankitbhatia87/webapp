# v2 Component Architecture - Executive Summary

## 🎯 What We Chose: HYBRID Architecture

The **hybrid approach** combines:
- ✅ **Global components** for reusable UI (Button, Modal, Card)
- ✅ **Route-specific components** for page-only features (Admin forms, Gallery filters)
- ✅ **Custom hooks** for shared business logic (useAuth, usePhotos)

## Why Hybrid?

| Aspect | Why Hybrid Wins |
|--------|-----------------|
| **Scalability** | Grows from startup to enterprise seamlessly |
| **Flexibility** | Components can move from local → global easily |
| **Clarity** | Clear rule: "2+ places = global, 1 place = local" |
| **Maintainability** | Don't duplicate code, don't over-organize |
| **Refactoring** | Simple rules make changes safe |

---

## Your Folder Structure

```
✅ CREATED:

src/app/
├── components/              ← Reusable UI Components
│   ├── Button/
│   ├── Modal/
│   ├── Image/
│   ├── Card/
│   └── ... (other shared components)
│
├── features/                ← Shared Layout Components
│   ├── Header/
│   ├── Footer/
│   └── ... (other layouts)
│
├── hooks/                   ← Custom React Hooks (NEW)
│   ├── .gitkeep
│   └── (your hooks go here)
│
├── admin/
│   ├── page.tsx
│   └── (components)/        ← Admin-Only Components (NEW)
│
├── photography/
│   ├── page.tsx
│   └── (components)/        ← Photography-Only Components (NEW)
│
└── api/                     ← API Routes
```

---

## Decision Rules (Copy This!)

### When to Create Global Component
1. **Used in 2+ different routes** ← This is key!
2. Is it UI/design focused? (Button, Modal, Card, etc.)
3. No dependencies on route params or context
4. Reusable without modification

**Examples:**
- ✅ Button (used everywhere)
- ✅ Modal (used in admin AND other pages)
- ✅ Image (reused photo wrapper)
- ❌ PhotoUploadForm (admin only)

### When to Create Route-Specific Component
1. **Used only in ONE route**
2. Tightly coupled to that route's logic
3. Contains route-specific features
4. No other page needs it

**Examples:**
- ✅ PhotoUploadForm (only in /admin)
- ✅ CategoryFilter (only in /photography)
- ✅ AdminStats (only in /admin)
- ❌ Button (should be global)

### When to Create Custom Hook
1. **Logic used in 2+ components**
2. Encapsulates business logic (not UI)
3. Makes components cleaner
4. Reusable without modification

**Examples:**
- ✅ useAuth (check user, login, logout)
- ✅ usePhotos (fetch, filter, upload photos)
- ✅ useLocalStorage (persist data)
- ❌ useButtonClick (too simple, inline in component)

---

## How to Decide (Decision Tree)

```
┌─ New Component ─────────┐
│                         │
└─ Q1: Used 2+ places? ──┐
                          │
                    YES → Global Component
                    NO → Q2: Route-specific?
                              │
                        YES → Route-specific
                        NO → Q3: Shared logic?
                                  │
                            YES → Custom Hook
                            NO → Keep in component
```

---

## Import Examples

### Global Component (use from anywhere)
```typescript
// ✅ From home page
import Button from '@/app/components/Button'

// ✅ From admin page
import Modal from '@/app/components/Modal'

// ✅ From photography page
import Image from '@/app/components/Image'
```

### Route-Specific Component (use within same route)
```typescript
// ✅ In src/app/admin/page.tsx
import PhotoUploadForm from './(components)/PhotoUploadForm'
import AdminStats from './(components)/AdminStats'

// ✅ In src/app/photography/page.tsx
import CategoryFilter from './(components)/CategoryFilter'
import GalleryGrid from './(components)/GalleryGrid'
```

### Custom Hook (use from anywhere)
```typescript
// ✅ From any component
import { useAuth } from '@/app/hooks/useAuth'
import { usePhotos } from '@/app/hooks/usePhotos'

function MyComponent() {
  const { user, loading } = useAuth()
  const { photos, error } = usePhotos()
  return (...)
}
```

---

## Common Patterns

### Pattern 1: Complex Page
```typescript
// src/app/admin/page.tsx
import PhotoUploadForm from './(components)/PhotoUploadForm'
import AdminStats from './(components)/AdminStats'
import PhotoGrid from './(components)/PhotoGrid'

export default function AdminPage() {
  return (
    <>
      <PhotoUploadForm />
      <AdminStats />
      <PhotoGrid />
    </>
  )
}
```

### Pattern 2: Reusable Modal
```typescript
// src/app/components/Modal/Modal.tsx
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null
  return (
    <div onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

// Used in admin/(components)/EditCategoryModal.tsx
import Modal from '@/app/components/Modal'

export default function EditCategoryModal() {
  return <Modal isOpen={isOpen} onClose={close}>...</Modal>
}
```

### Pattern 3: Custom Hook
```typescript
// src/app/hooks/usePhotos.ts
export function usePhotos() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    fetchPhotos()
  }, [])
  
  return { photos, loading }
}

// Used in multiple components
import { usePhotos } from '@/app/hooks/usePhotos'

// In admin/(components)/PhotoGrid.tsx
function AdminPhotoGrid() {
  const { photos } = usePhotos()
  return photos.map(photo => <PhotoCard key={photo.id} photo={photo} />)
}

// In photography/page.tsx
function GalleryPage() {
  const { photos } = usePhotos()
  return photos.map(photo => <GalleryItem key={photo.id} photo={photo} />)
}
```

---

## Migration Path (if you change mind later)

### Move Component to Global (when it becomes reused)
```bash
# Step 1: Move file
mv src/app/admin/\(components\)/PhotoCard.tsx \
   src/app/components/PhotoCard/PhotoCard.tsx

# Step 2: Update imports
# In src/app/admin/page.tsx:
# FROM: import PhotoCard from './(components)/PhotoCard'
# TO:   import PhotoCard from '@/app/components/PhotoCard'

# Step 3: Delete old route-specific version
rm src/app/admin/\(components\)/PhotoCard.tsx

# Step 4: Commit
git commit -m "refactor: Move PhotoCard to global components"
```

### Move Component to Local (when it becomes unique)
```bash
# Reverse the process above
```

---

## Documentation Map

```
START HERE (5 min)
└─ V2_COMPONENT_QUICK_REFERENCE.md (this file)
   ├─ Need details? → V2_COMPONENT_STRUCTURE_GUIDE.md (10 min)
   │  ├─ Import patterns, examples, best practices
   │  └─ When to refactor, naming conventions
   │
   └─ Need deep dive? → V2_COMPONENT_ARCHITECTURE.md (20 min)
      ├─ All 4 architecture strategies explained
      ├─ Pros/cons of each approach
      └─ Why we chose hybrid
```

---

## Checklist for Starting v2 Development

- [ ] Read this file (5 min)
- [ ] Review folder structure (created, ready to use)
- [ ] Understand the 3 rules (Global, Route-specific, Hook)
- [ ] Try creating a component in each category
- [ ] Bookmark quick reference for lookups

---

## Quick Commands

```bash
# Create a global component
mkdir -p src/app/components/MyButton
cd src/app/components/MyButton
echo "export { default } from './MyButton'" > index.tsx
touch MyButton.tsx types.ts

# Create a route-specific component (admin example)
touch src/app/admin/\(components\)/MyFeature.tsx

# Create a custom hook
touch src/app/hooks/useMyFeature.ts

# Check structure
find src/app -type d \( -name components -o -name "(components)" -o -name hooks \)
```

---

## Architecture at Milestones

| Phase | Global | Route-Specific | Hooks | Folders |
|-------|--------|-------------------|-------|---------|
| **Week 1** | 2-3 | 4-5 | 0-1 | components/, hooks/ |
| **Week 4** | 5-8 | 10-15 | 2-3 | + admin/(components)/ |
| **Month 2** | 10-15 | 20-30 | 3-5 | + photography/(components)/ |
| **Later** | 15+ | 30+ | 5+ | + more routes |

All normal and healthy growth patterns!

---

## Key Insight

> **The beauty of hybrid architecture: You don't need to decide everything upfront. Start small. Refactor as you grow. The rules are simple enough that moving components takes 2 minutes.**

---

**You're ready to build! 🚀**

Questions? Re-read the "Decision Rules" section.
