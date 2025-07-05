import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from '@/components/organisms/Layout'
import BrowseHostels from '@/components/pages/BrowseHostels'
import HostelDetail from '@/components/pages/HostelDetail'
import RoomSwaps from '@/components/pages/RoomSwaps'
import RoommateFinder from '@/components/pages/RoommateFinder'
import Dashboard from '@/components/pages/Dashboard'
import CreateReview from '@/components/pages/CreateReview'
import CreateSwapRequest from '@/components/pages/CreateSwapRequest'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Layout>
        <Routes>
          <Route path="/" element={<BrowseHostels />} />
          <Route path="/hostels/:id" element={<HostelDetail />} />
          <Route path="/room-swaps" element={<RoomSwaps />} />
          <Route path="/roommate-finder" element={<RoommateFinder />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-review/:hostelId" element={<CreateReview />} />
          <Route path="/create-swap-request" element={<CreateSwapRequest />} />
        </Routes>
      </Layout>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </div>
  )
}

export default App