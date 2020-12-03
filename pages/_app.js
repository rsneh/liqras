import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import '../styles/globals.scss'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}