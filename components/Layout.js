import Link from "next/link"
import { useRouter } from "next/router"
import Header from 'components/Header'
import Footer from 'components/Footer'

export default function Layout({ children }) {
  const { pathname } = useRouter()
  const isHome = pathname === "/"

  return (
    <div className="antialiased">
      <Header />
      {children}
      <Footer />
    </div>
  );
}