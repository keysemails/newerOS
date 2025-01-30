import { atom } from 'jotai'
import { LandingViewState } from '@/constants/screens'

export const landingViewStateAtom = atom<LandingViewState>(LandingViewState.GetStarted)
