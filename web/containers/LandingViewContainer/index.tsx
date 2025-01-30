'use client'

import React from 'react'

import { useAtomValue } from 'jotai'

import { LandingViewState } from '@/constants/screens'

import GetStartedScreen from '@/screens/Landing/GetStarted'
import ModeChoiceScreen from '@/screens/Landing/ModeChoice'

import { landingViewStateAtom } from '@/helpers/atoms/Landing.atom'

const LandingViewContainer = () => {
  const landingViewState = useAtomValue(landingViewStateAtom)

  let children = null

  switch (landingViewState) {
    case LandingViewState.GetStarted:
      children = <GetStartedScreen />
      break

    case LandingViewState.ModeChoice:
      children = <ModeChoiceScreen />
      break

    default:
      children = <ModeChoiceScreen />
      break
  }

  return children
}

export default LandingViewContainer
