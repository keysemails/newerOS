'use client'

import Link from 'next/link'

import ChoiceItem from '@/screens/Landing/ModeChoice/ChoiceItem'

const choicesList = [
  [
    'Private Mode',
    'Run the OS on your local computer. This mode is not connected to the Internet, which means all the data is private.',
  ],
  [
    'Online Mode',
    'Data will be stored on a remote server. You still have control over who can access it and you can decide to monetize your data.',
  ],
]

const LandingChoiceScreen = () => {
  const openApp = (url: string) => {
    window.electronAPI?.loadUrl(url)
  }

  return (
    <main className="relative min-h-screen bg-white">
      <div className="flex h-screen w-screen gap-x-6 p-6">
        <Link
          className="block h-full w-full no-underline" 
          href={'/'}
        >
          <ChoiceItem name={choicesList[0][0]} text={choicesList[0][1]} />
        </Link>
        <div
          onClick={() => {
            openApp('https://os.newcoin.org')
          }}
          className="block h-full w-full"
        >
          <ChoiceItem name={choicesList[1][0]} text={choicesList[1][1]} />
        </div>
      </div>
    </main>
  )
}

export default LandingChoiceScreen
