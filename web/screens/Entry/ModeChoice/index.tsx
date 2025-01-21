'use client'

import Link from 'next/link'

import { useAtom, useSetAtom } from 'jotai'

import { MainViewState } from '@/constants/screens'

import { loadUrl
 } from '@janhq/core'

import ChoiceItem from '@/screens/Entry/ModeChoice/ChoiceItem'

import { mainViewStateAtom } from '@/helpers/atoms/App.atom'

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

const EntryChoiceScreen = () => {
  const [mainViewState, setMainViewState] = useAtom(mainViewStateAtom)

  const onClickMode = (url: string) => {
    loadUrl(url)
  }

  const onCardClick = (state: MainViewState) => {
    if (mainViewState === state) return
    setMainViewState(state)
  }

  if (!sessionStorage.getItem('firstLaunch'))
    sessionStorage.setItem('firstLaunch', 'false')

  return (
    <main className="relative min-h-screen bg-white">
      <div className="flex h-screen w-screen gap-x-6 p-6">
        <div
          onClick={() => {
            onCardClick(MainViewState.Thread)
          }}
          className="block h-full w-full"
        >
          <ChoiceItem name={choicesList[0][0]} text={choicesList[0][1]} />
        </div>
        <div
          onClick={() => {
            onClickMode('https://os.newcoin.org')
          }}
          className="block h-full w-full"
        >
          <ChoiceItem name={choicesList[1][0]} text={choicesList[1][1]} />
        </div>
      </div>
    </main>
  )
}

export default EntryChoiceScreen
