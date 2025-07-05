import Header from '@/components/organisms/Header'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Header />
      <main className="min-h-[calc(100vh-64px)]">
        {children}
      </main>
    </div>
  )
}

export default Layout