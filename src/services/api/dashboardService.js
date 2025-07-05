import dashboardData from '@/services/mockData/dashboard.json'

export const dashboardService = {
  getDashboardData: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...dashboardData })
      }, 400)
    })
  },
  
  updateUserProfile: async (updates) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dashboardData.user = { ...dashboardData.user, ...updates }
        resolve(dashboardData.user)
      }, 500)
    })
  }
}