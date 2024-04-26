import { lazy } from "react";

export const LazyHome = lazy(() => import("./features/Home"));
export const LazyAbout = lazy(() => import("./features/About"));
