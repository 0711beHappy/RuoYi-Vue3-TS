import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import type { AppState } from '@/types/app'

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    sidebar: {
      opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus')! : true,
      withoutAnimation: false
    },
    device: 'desktop',
    size: 'default'
  }),

  getters: {
    isCollapse: (state) => !state.sidebar.opened
  },

  actions: {
    toggleSideBar() {
      this.sidebar.opened = !this.sidebar.opened
      Cookies.set('sidebarStatus', this.sidebar.opened ? '1' : '0')
    },

    closeSideBar(withoutAnimation: boolean) {
      this.sidebar.opened = false
      this.sidebar.withoutAnimation = withoutAnimation
      Cookies.set('sidebarStatus', '0')
    },

    toggleDevice(device: 'desktop' | 'mobile') {
      this.device = device
    }
  }
})