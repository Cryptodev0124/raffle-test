import { captureRemixErrorBoundaryError } from '@sentry/remix'
import type { LinksFunction } from '@remix-run/cloudflare'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from '@remix-run/react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import SocketProvider from './context/SocketContext';
import '@rainbow-me/rainbowkit/styles.css'

import { config } from '~/utils/wagmi'
import './tailwind.css'
import { useReferrerTracker } from './utils/useReferrerTracker'
import PopupHandler from '~/components/PopupHandler'

globalThis.process = globalThis.process ?? { env: {} }
const queryClient = new QueryClient()

export const links: LinksFunction = () => [
  { rel: 'icon', href: '/favicon.png', type: 'image/png' },
]

export const ErrorBoundary = () => {
  const error = useRouteError()
  captureRemixErrorBoundaryError(error)
  return <div>Something went wrong</div>
}

export default function App() {
  useReferrerTracker('Origin')
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,300..900;1,300..900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#FFD700" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="theme-color" content="#ffffff" />
        <Meta />
        <Links />
      </head>
      <body>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider
              theme={darkTheme({
                accentColor: 'linear-gradient(to right, #00b212, #11d445)',
                accentColorForeground: 'white',
                borderRadius: 'large',
              })}
            >
              <SocketProvider>
                {/* <PopupHandler /> */}
                <Outlet />
              </SocketProvider>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
