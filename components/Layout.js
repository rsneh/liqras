import Link from "next/link"
import { useRouter } from "next/router"
import Header from 'components/Header'
import Footer from 'components/Footer'
import { UserProvider } from 'utils/user';

export default function Layout({ user, children, showFooter = true, loading = false }) {
  const { pathname } = useRouter()
  const isHome = pathname === "/"
  return (
    <UserProvider value={{ user, loading }}>
      <div id="layout" className="flex flex-col min-h-screen antialiased">
        <Header isHome={isHome} />
        {children}
        {showFooter && <Footer isHome={isHome} />}
      </div>
    </UserProvider>
  );
}