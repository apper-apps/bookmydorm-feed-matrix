import swapData from '@/services/mockData/swaps.json'

export const swapService = {
  getAll: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...swapData])
      }, 300)
    })
  },
  
  getById: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const swap = swapData.find(s => s.Id === id)
        if (swap) {
          resolve({ ...swap })
        } else {
          reject(new Error('Swap request not found'))
        }
      }, 200)
    })
  },
  
  create: async (swap) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newSwap = {
          ...swap,
          Id: Math.max(...swapData.map(s => s.Id)) + 1
        }
        swapData.push(newSwap)
        resolve(newSwap)
      }, 500)
    })
  },
  
  update: async (id, updates) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = swapData.findIndex(s => s.Id === id)
        if (index !== -1) {
          swapData[index] = { ...swapData[index], ...updates }
          resolve(swapData[index])
        } else {
          reject(new Error('Swap request not found'))
        }
      }, 400)
    })
  },
  
  delete: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = swapData.findIndex(s => s.Id === id)
        if (index !== -1) {
          swapData.splice(index, 1)
          resolve({ success: true })
        } else {
          reject(new Error('Swap request not found'))
        }
      }, 300)
    })
  }
}