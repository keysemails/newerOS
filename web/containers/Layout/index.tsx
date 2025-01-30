'use client'

import { useEffect, useState } from 'react'

import { Button } from '@janhq/joi'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'

import posthog from 'posthog-js'
import { twMerge } from 'tailwind-merge'

import BottomPanel from '@/containers/Layout/BottomPanel'
import RibbonPanel from '@/containers/Layout/RibbonPanel'

import TopPanel from '@/containers/Layout/TopPanel'

import { MainViewState } from '@/constants/screens'

import { getImportModelStageAtom } from '@/hooks/useImportModel'

import { SUCCESS_SET_NEW_DESTINATION } from '@/screens/Settings/Advanced/DataFolder'
import CancelModelImportModal from '@/screens/Settings/CancelModelImportModal'
import ChooseWhatToImportModal from '@/screens/Settings/ChooseWhatToImportModal'
import EditModelInfoModal from '@/screens/Settings/EditModelInfoModal'
import HuggingFaceRepoDetailModal from '@/screens/Settings/HuggingFaceRepoDetailModal'
import ImportModelOptionModal from '@/screens/Settings/ImportModelOptionModal'
import ImportingModelModal from '@/screens/Settings/ImportingModelModal'
import SelectingModelModal from '@/screens/Settings/SelectingModelModal'

import LoadingModal from '../LoadingModal'

import MainViewContainer from '../MainViewContainer'

import InstallingExtensionModal from './BottomPanel/InstallingExtension/InstallingExtensionModal'

import { mainViewStateAtom } from '@/helpers/atoms/App.atom'
import {
  productAnalyticAtom,
  productAnalyticPromptAtom,
  reduceTransparentAtom,
} from '@/helpers/atoms/Setting.atom'
import EntryViewContainer from '../EntryViewContainer'

const BaseLayout = () => {
  const [mainViewState, setMainViewState] = useAtom(mainViewStateAtom)
  const importModelStage = useAtomValue(getImportModelStageAtom)
  const reduceTransparent = useAtomValue(reduceTransparentAtom)
  const [productAnalytic, setProductAnalytic] = useAtom(productAnalyticAtom)
  const [productAnalyticPrompt, setProductAnalyticPrompt] = useAtom(
    productAnalyticPromptAtom
  )
  const [showProductAnalyticPrompt, setShowProductAnalyticPrompt] =
    useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (productAnalyticPrompt) {
        setShowProductAnalyticPrompt(true)
      }
      return () => clearTimeout(timer)
    }, 3000) // 3 seconds delay

    return () => clearTimeout(timer) // Cleanup timer on unmount
  }, [productAnalyticPrompt])

  useEffect(() => {
    if (productAnalytic) {
      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        autocapture: false,
        capture_pageview: false,
        capture_pageleave: false,
        disable_session_recording: true,
        person_profiles: 'always',
        persistence: 'localStorage',
        opt_out_capturing_by_default: true,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        sanitize_properties: function (properties) {
          const denylist = [
            '$pathname',
            '$initial_pathname',
            '$current_url',
            '$initial_current_url',
            '$host',
            '$initial_host',
            '$initial_person_info',
          ]

          denylist.forEach((key) => {
            if (properties[key]) {
              properties[key] = null // Set each denied property to null
            }
          })

          return properties
        },
      })
      posthog.opt_in_capturing()
      posthog.register({ app_version: VERSION })
    } else {
      posthog.opt_out_capturing()
    }
  }, [productAnalytic])

  useEffect(() => {
    if (localStorage.getItem(SUCCESS_SET_NEW_DESTINATION) === 'true') {
      setMainViewState(MainViewState.Settings)
    }
  }, [setMainViewState])

  useEffect(() => {
    window.electronAPI?.onMainViewStateChange(
      (_event: string, route: string) => {
        if (route === 'Settings') {
          setMainViewState(MainViewState.Settings)
        } 
        if (route === 'Thread') {
          setMainViewState(MainViewState.Thread)
        }
        if (route === 'GetStarted') {
          setMainViewState(MainViewState.GetStarted)
        }
        console.log('route', route)
      }
    )
  }, [setMainViewState])

  if (
    mainViewState === MainViewState.GetStarted ||
    mainViewState === MainViewState.ModeChoice
  ) {
    return <EntryViewContainer />
  }
  
  return (
    <div
      className={twMerge(
        'h-screen text-sm',
        reduceTransparent
          ? 'bg-[hsla(var(--app-bg))]'
          : 'bg-[hsla(var(--app-transparent))]'
      )}
    >
      {/* <TopPanel /> */}
      <div className="relative flex h-[calc(100vh-36px)] w-screen">
        <RibbonPanel />
        <MainViewContainer />
        <LoadingModal />
        {importModelStage === 'SELECTING_MODEL' && <SelectingModelModal />}
        {importModelStage === 'MODEL_SELECTED' && <ImportModelOptionModal />}
        {importModelStage === 'IMPORTING_MODEL' && <ImportingModelModal />}
        {importModelStage === 'EDIT_MODEL_INFO' && <EditModelInfoModal />}
        {importModelStage === 'CONFIRM_CANCEL' && <CancelModelImportModal />}
        <ChooseWhatToImportModal />
        <InstallingExtensionModal />
        <HuggingFaceRepoDetailModal />
      </div>
      <BottomPanel />
    </div>
  )
}

export default BaseLayout
