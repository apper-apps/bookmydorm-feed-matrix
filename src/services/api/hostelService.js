import hostelData from '@/services/mockData/hostels.json'

export const hostelService = {
  getAll: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...hostelData])
      }, 300)
    })
  },
  
  getById: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const hostel = hostelData.find(h => h.Id === id)
        if (hostel) {
          resolve({ ...hostel })
        } else {
          reject(new Error('Hostel not found'))
        }
      }, 200)
    })
  },
  
  create: async (hostel) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newHostel = {
          ...hostel,
          Id: Math.max(...hostelData.map(h => h.Id)) + 1
        }
        hostelData.push(newHostel)
        resolve(newHostel)
      }, 500)
    })
  },
  
  update: async (id, updates) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = hostelData.findIndex(h => h.Id === id)
        if (index !== -1) {
          hostelData[index] = { ...hostelData[index], ...updates }
          resolve(hostelData[index])
        } else {
          reject(new Error('Hostel not found'))
        }
      }, 400)
    })
  },
  
  delete: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = hostelData.findIndex(h => h.Id === id)
        if (index !== -1) {
          hostelData.splice(index, 1)
          resolve({ success: true })
        } else {
          reject(new Error('Hostel not found'))
        }
      }, 300)
    })
  }
}