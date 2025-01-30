'use client'

import { ReactNode, useEffect, useState } from 'react'

import { useAtom, useAtomValue, useSetAtom } from 'jotai'

import posthog from 'posthog-js'

import { MainViewState } from '@/constants/screens'

import { SUCCESS_SET_NEW_DESTINATION } from '@/screens/Settings/Advanced/DataFolder'

import { mainViewStateAtom } from '@/helpers/atoms/App.atom'
import {
  productAnalyticAtom,
} from '@/helpers/atoms/Setting.atom'

const BaseLayout = ({ children }: { children: ReactNode }) => {
  const [mainViewState, setMainViewState] = useAtom(mainViewStateAtom)
  const [productAnalytic, setProductAnalytic] = useAtom(productAnalyticAtom)

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
      }
    )
  }, [setMainViewState])
  
  return children
}

export default BaseLayout
