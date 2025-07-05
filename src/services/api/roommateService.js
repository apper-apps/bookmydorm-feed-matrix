import roommateData from '@/services/mockData/roommates.json'

export const roommateService = {
  getAll: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...roommateData])
      }, 300)
    })
  },
  
  getById: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const roommate = roommateData.find(r => r.Id === id)
        if (roommate) {
          resolve({ ...roommate })
        } else {
          reject(new Error('Roommate not found'))
        }
      }, 200)
    })
  },
  
  create: async (roommate) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newRoommate = {
          ...roommate,
          Id: Math.max(...roommateData.map(r => r.Id)) + 1
        }
        roommateData.push(newRoommate)
        resolve(newRoommate)
      }, 500)
    })
  },
  
  update: async (id, updates) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = roommateData.findIndex(r => r.Id === id)
        if (index !== -1) {
          roommateData[index] = { ...roommateData[index], ...updates }
          resolve(roommateData[index])
        } else {
          reject(new Error('Roommate not found'))
        }
      }, 400)
    })
  },
  
  delete: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = roommateData.findIndex(r => r.Id === id)
        if (index !== -1) {
          roommateData.splice(index, 1)
          resolve({ success: true })
        } else {
          reject(new Error('Roommate not found'))
        }
      }, 300)
    })
  }
}