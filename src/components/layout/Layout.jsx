import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from '../sections/footer'

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout 