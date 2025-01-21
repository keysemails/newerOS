'use client'
import React from 'react'

import { useAtomValue } from 'jotai'

import { MainViewState } from '@/constants/screens'

import GetStartedScreen from '@/screens/Entry/GetStarted'
import ModeChoiceScreen from '@/screens/Entry/ModeChoice'

import { mainViewStateAtom } from '@/helpers/atoms/App.atom'

const EntryViewContainer = () => {
  const mainViewState = useAtomValue(mainViewStateAtom)

  let children = null

  switch (mainViewState) {
    case MainViewState.GetStarted:
      children = <GetStartedScreen />
      break

    case MainViewState.ModeChoice:
      children = <ModeChoiceScreen />
      break

    default:
      children = <ModeChoiceScreen />
      break
  }

  return children
}

export default EntryViewContainer
