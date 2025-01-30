'use client';


import { useAtom, useAtomValue, useSetAtom } from 'jotai'

import { twMerge } from 'tailwind-merge'

import BottomPanel from '@/containers/Layout/BottomPanel'
import RibbonPanel from '@/containers/Layout/RibbonPanel'

import CancelModelImportModal from '@/screens/Settings/CancelModelImportModal'
import ChooseWhatToImportModal from '@/screens/Settings/ChooseWhatToImportModal'
import EditModelInfoModal from '@/screens/Settings/EditModelInfoModal'
import HuggingFaceRepoDetailModal from '@/screens/Settings/HuggingFaceRepoDetailModal'
import ImportModelOptionModal from '@/screens/Settings/ImportModelOptionModal'
import ImportingModelModal from '@/screens/Settings/ImportingModelModal'
import SelectingModelModal from '@/screens/Settings/SelectingModelModal'
import InstallingExtensionModal from '@/containers/Layout/BottomPanel/InstallingExtension/InstallingExtensionModal'
import {
    reduceTransparentAtom,
  } from '@/helpers/atoms/Setting.atom'
import LoadingModal from '../LoadingModal'
import { getImportModelStageAtom } from '@/hooks/useImportModel'

import MainViewContainer from '../MainViewContainer'

const LayoutChildren = () => {
    const importModelStage = useAtomValue(getImportModelStageAtom)
    const reduceTransparent = useAtomValue(reduceTransparentAtom)

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
    );
};

export default LayoutChildren;