# v2 Component Architecture Guide

## 🏗️ Component Organization Strategies

Based on your current project structure, here are the **4 main approaches**:

---

## 1️⃣ **Current Structure (RECOMMENDED for v2)** ✅

**Location:** `src/app/components/` (what you're already doing)

```
src/app/
├── components/
│   ├── Button/
│   │   ├── index.tsx
│   │   ├── Button.tsx
│   │   └── types.ts
│   ├── Lightbox/
│   ├── Image/
│   ├── Card/
│   └── ... (other components)
├── features/
│   ├── Header/
│   ├── Footer/
│   └── ... (layout components)
├── admin/
│   ├── page.tsx
│   └── components/
│       └── AdminSpecific.tsx
└── photography/
    ├── page.tsx
    └── components/
        └── GalleryGrid.tsx
```

### ✅ Pros:
- Follows Next.js conventions
- Clear separation: **global components** vs **local components**
- Easy to reuse across pages
- Single source of truth for shared UI
- Scales well as project grows

### ❌ Cons:
- More files to manage initially
- Can become cluttered if too many components

### 📌 Use When:
- Component is **reused across multiple pages**
- Component is **UI/design focused** (Button, Modal, Card)
- Building a **design system**

---

## 2️⃣ **Route-Specific Folder** (Alternative)

**Location:** Within each route folder

```
src/app/
├── admin/
│   ├── page.tsx
│   ├── layout.tsx
│   └── components/
│       ├── PhotoUpload.tsx
│       ├── PhotoGrid.tsx
│       ├── EditModal.tsx
│       └── AdminStats.tsx
├── photography/
│   ├── page.tsx
│   └── components/
│       ├── GalleryGrid.tsx
│       ├── CategoryFilter.tsx
│       └── PhotoCard.tsx
└── blog/
    ├── page.tsx
    └── components/
        ├── PostList.tsx
        └── PostCard.tsx
```

### ✅ Pros:
- Clear locality: Components stay with their route
- Easy to delete a route without orphaned components
- Simple to understand: "This component belongs to /admin"
- No global components folder clutter

### ❌ Cons:
- Duplicated components across routes (e.g., PhotoCard in gallery AND blog)
- Harder to share between routes
- Not ideal for design systems

### 📌 Use When:
- Components are **specific to one route**
- Page is **complex** with many local components
- Component logic is **tightly coupled** to that route

---

## 3️⃣ **Hybrid Approach** (BEST for large projects)

**Combine both strategies smartly**:

```
src/app/
├── components/                    # ⭐ Reusable UI components
│   ├── Button/
│   ├── Modal/
│   ├── Card/
│   ├── Image/
│   ├── Lightbox/
│   └── Loader/
├── features/                      # ⭐ Shared feature components
│   ├── Header/
│   ├── Footer/
│   ├── Navigation/
│   └── AuthGuard/
├── admin/
│   ├── page.tsx
│   ├── layout.tsx
│   └── (admin)components/         # 🔹 Admin-specific only
│       ├── AdminHeader.tsx
│       ├── PhotoUploadForm.tsx
│       └── CategorySelector.tsx
├── photography/
│   ├── page.tsx
│   └── (photography)components/   # 🔹 Photography-specific only
│       ├── GalleryHeader.tsx
│       └── CategoryTabs.tsx
└── blog/
    ├── page.tsx
    └── (blog)components/          # 🔹 Blog-specific only
        ├── PostHeader.tsx
        └── CommentSection.tsx
```

### ✅ Pros:
- Best of both worlds
- Clear reusability vs locality
- Scales infinitely
- Easy to onboard developers
- Can refactor easily: move local → global when needed

### ❌ Cons:
- More folder structure to manage
- Need consistent naming conventions

### 📌 Use When:
- Building **large applications**
- Team **collaboration** needed
- **Rapid iteration** expected

---

## 4️⃣ **Separate `/lib/components` Folder** (Not Recommended)

**Location:** `src/lib/components/` (outside app router)

```
src/
├── app/
│   ├── page.tsx
│   └── ...routes
└── lib/
    ├── components/
    │   ├── Button.tsx
    │   ├── Modal.tsx
    │   └── ...
    ├── utils/
    ├── hooks/
    └── types.ts
```

### ✅ Pros:
- Strict separation from routing
- Useful for apps with multiple entry points

### ❌ Cons:
- Next.js App Router prefers components in `app/`
- Extra folder nesting
- Less conventional for Next.js projects

### 📌 Use When:
- Building **libraries** or **multi-app** monorepos
- NOT recommended for single Next.js projects

---

## 🎯 RECOMMENDATION FOR YOUR v2

### **Use the Hybrid Approach** (Option 3)

Here's the structure I recommend for your v2 revamp:

```
src/app/
├── components/                    # 🌍 Shared/Reusable Components
│   ├── Button/
│   │   ├── index.tsx
│   │   ├── Button.tsx
│   │   └── types.ts
│   ├── Lightbox/
│   ├── Image/
│   ├── Modal/
│   ├── Card/
│   ├── Icons/
│   ├── Loader/
│   └── FormInputs/
│
├── features/                      # 🏗️ Shared Feature Components
│   ├── Header/
│   ├── Footer/
│   ├── Navigation/
│   ├── Breadcrumbs/
│   └── PaginationControls/
│
├── hooks/                         # 🪝 Custom React Hooks
│   ├── useAuth.ts
│   ├── usePhotos.ts
│   └── useLocalStorage.ts
│
├── lib/                           # 📚 Utilities & Constants
│   ├── api.ts
│   ├── constants.ts
│   └── helpers.ts
│
├── admin/                         # 👨‍💼 Admin Route
│   ├── page.tsx
│   ├── layout.tsx
│   └── (components)/
│       ├── PhotoUploadForm.tsx
│       ├── PhotoGrid.tsx
│       ├── EditCategoryModal.tsx
│       └── AdminStats.tsx
│
├── photography/                   # 📸 Photography Gallery Route
│   ├── page.tsx
│   ├── layout.tsx
│   └── (components)/
│       ├── GalleryGrid.tsx
│       ├── CategoryFilter.tsx
│       ├── PhotoCard.tsx
│       └── EmptyState.tsx
│
├── blog/                          # 📝 Blog Route (New in v2)
│   ├── page.tsx
│   ├── [slug]/
│   │   └── page.tsx
│   └── (components)/
│       ├── PostCard.tsx
│       ├── PostList.tsx
│       └── CommentSection.tsx
│
├── api/                           # 🔗 API Routes
│   ├── photos/
│   ├── auth/
│   └── blog/
│
├── page.tsx                       # Home Page
└── layout.tsx                     # Root Layout
```

---

## 📋 Implementation Checklist for v2

### Phase 1: Setup Core Components (Week 1)
- [ ] Keep existing components in `src/app/components/`
- [ ] Keep existing features in `src/app/features/`
- [ ] Organize existing shared hooks into `src/app/hooks/`

### Phase 2: Add Route-Specific Components (Week 2)
- [ ] Create `src/app/admin/(components)/` folder
- [ ] Move admin-only components there
- [ ] Create `src/app/photography/(components)/` folder
- [ ] Move gallery-specific components there

### Phase 3: New Features (Week 3+)
- [ ] Create blog route with `(components)/` folder
- [ ] Create landing page components
- [ ] Create portfolio/showcase components

---

## 🗂️ Naming Conventions

To avoid confusion, use **parentheses** for route-specific components:

```bash
# ✅ GOOD - Makes it clear it's route-specific
src/app/admin/(components)/PhotoUpload.tsx
src/app/photography/(components)/GalleryGrid.tsx

# ❌ AVOID - Ambiguous
src/app/admin/components/PhotoUpload.tsx  # Looks global
src/app/admin/PhotoUpload.tsx  # Mixed with page.tsx

# ✅ GOOD - Clearly global
src/app/components/Button/Button.tsx
src/app/features/Header/Header.tsx
```

---

## 📦 When to Move from Local → Global

**Move a component to `src/app/components/` when:**

1. ✅ It's used in **2+ different routes**
2. ✅ It's **UI-focused** (not business logic)
3. ✅ It has **no dependencies** on route params
4. ✅ It's **reusable** without modification

**Example:**
```typescript
// Start: admin/(components)/PhotoCard.tsx
// When used in: /photography AND /admin
// → Move to: src/app/components/PhotoCard/
```

---

## 🚀 Quick Start for v2

```bash
# 1. You're on v2/revamp branch
git branch
# Should show: * v2/revamp

# 2. Create folder structure
mkdir -p src/app/admin/\(components\)
mkdir -p src/app/photography/\(components\)
mkdir -p src/app/hooks

# 3. Start building v2 features!
# - Keep global components in src/app/components/
# - Keep route-specific in src/app/{route}/(components)/
# - Keep hooks in src/app/hooks/

# 4. Commit
git add .
git commit -m "v2: Add component folder structure"
git push origin v2/revamp
```

---

## 💡 Key Takeaways

| Strategy | Use Case | Scalability |
|----------|----------|-------------|
| **Hybrid (Recommended)** | Most projects | ⭐⭐⭐⭐⭐ |
| **Global Components** | Simple apps | ⭐⭐⭐ |
| **Route-Specific** | Monolithic routes | ⭐⭐⭐⭐ |
| **Separate lib/components** | Libraries | ⭐⭐ |

---

## ❓ Questions?

- **"How do I import components?"** → Covered in V2_WORKFLOW.md
- **"Can I change structure later?"** → Yes! Refactoring is easy
- **"What about type safety?"** → Use `/hooks/` and `lib/types.ts`

**Recommendation: Go with Hybrid Approach for v2!** 🚀
