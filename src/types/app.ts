// src/types/app.ts
export interface Sidebar {
  opened: boolean;
  withoutAnimation: boolean;
  hide?: boolean;
}

export interface AppState {
  sidebar: Sidebar
  device: 'desktop' | 'mobile'
  size: string
}