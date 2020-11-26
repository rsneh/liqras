import Link from "next/link"
import { useRouter } from "next/router"
import Header from 'components/Header'
import Footer from 'components/Footer'
import { UserProvider } from 'utils/user';

export default function Layout({ user, loading = false, children }) {
  const { pathname } = useRouter()
  const isHome = pathname === "/"

  return (
    <UserProvider value={{ user, loading }}>
      <div className="antialiased">
        <Header isHome={isHome} />
        {children}
        <Footer />
      </div>
    </UserProvider>
  );
}