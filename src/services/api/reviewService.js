import reviewData from '@/services/mockData/reviews.json'

export const reviewService = {
  getAll: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...reviewData])
      }, 300)
    })
  },
  
  getById: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const review = reviewData.find(r => r.Id === id)
        if (review) {
          resolve({ ...review })
        } else {
          reject(new Error('Review not found'))
        }
      }, 200)
    })
  },
  
  getByHostelId: async (hostelId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const reviews = reviewData.filter(r => r.hostelId === hostelId)
        resolve([...reviews])
      }, 250)
    })
  },
  
  create: async (review) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newReview = {
          ...review,
          Id: Math.max(...reviewData.map(r => r.Id)) + 1
        }
        reviewData.push(newReview)
        resolve(newReview)
      }, 500)
    })
  },
  
  update: async (id, updates) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = reviewData.findIndex(r => r.Id === id)
        if (index !== -1) {
          reviewData[index] = { ...reviewData[index], ...updates }
          resolve(reviewData[index])
        } else {
          reject(new Error('Review not found'))
        }
      }, 400)
    })
  },
  
  delete: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = reviewData.findIndex(r => r.Id === id)
        if (index !== -1) {
          reviewData.splice(index, 1)
          resolve({ success: true })
        } else {
          reject(new Error('Review not found'))
        }
      }, 300)
    })
  }
}