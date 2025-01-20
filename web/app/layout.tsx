import { PropsWithChildren } from 'react'

import { Metadata } from 'next'

import '@/styles/main.scss'

export const metadata: Metadata = {
  title: 'NewOS',
  description:
    'NewOS is a peer-to-peer AI system coordinating human creativity with machine intelligence. Generate, evaluate and collaborate with humans and AI agents — turning pipelines into shared open cognitive spaces shaping our global intelligence commons.',
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-screen font-sans text-sm antialiased">
        <div className="dragable-bar" />
        {children}
      </body>
    </html>
  )
}
