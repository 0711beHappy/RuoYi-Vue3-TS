import { defineStore } from 'pinia'

// 定义类型
interface Sidebar {
  collapse: boolean
  opened: boolean
}

interface AppState {
  sidebar: Sidebar
  device: 'desktop' | 'mobile'
  size: 'default' | 'small' | 'large'
  routes: any[] // 先给 any，后面动态路由再细化类型
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    sidebar: {
      collapse: false,
      opened: true
    },
    device: 'desktop',
    size: 'default',
    routes: [] // 先空数组，后面权限模块再赋值
  }),

  getters: {
    isCollapse: (state) => state.sidebar.collapse
  },

  actions: {
    toggleSidebar() {
      this.sidebar.collapse = !this.sidebar.collapse
    },
    closeSidebar() {
      this.sidebar.opened = false
    },
    setDevice(device: 'desktop' | 'mobile') {
      this.device = device
    },
    setRoutes(routes: any[]) {
      this.routes = routes
    }
  }
})