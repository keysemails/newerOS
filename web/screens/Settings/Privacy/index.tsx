import { fs } from '@janhq/core'
import { Button, Input, ScrollArea, Switch } from '@janhq/joi'
import { useAtom, useAtomValue } from 'jotai'
import { FolderOpenIcon } from 'lucide-react'

import posthog from 'posthog-js'

import { toaster } from '@/containers/Toast'

import { usePath } from '@/hooks/usePath'

import { janDataFolderPathAtom } from '@/helpers/atoms/AppConfig.atom'
import { productAnalyticAtom } from '@/helpers/atoms/Setting.atom'

const Privacy = () => {
  /**
   * Clear logs
   * @returns
   */
  const clearLogs = async () => {
    try {
      await fs.rm(`file://logs`)
    } catch (err) {
      console.error('Error clearing logs: ', err)
    }

    toaster({
      title: 'Logs cleared',
      description: 'All logs have been cleared.',
      type: 'success',
    })
  }

  const janDataFolderPath = useAtomValue(janDataFolderPathAtom)
  const { onRevealInFinder } = usePath()
  const [productAnalytic, setProductAnalytic] = useAtom(productAnalyticAtom)

  return (
    <ScrollArea className="h-full w-full px-4">
      <div className="block w-full py-4">
        {/* Logs */}

        <div className="flex w-full flex-col items-start justify-between gap-4 border-b border-[hsla(var(--app-border))] py-4 first:pt-0 last:border-none sm:flex-row">
          <div className="space-y-1">
            <div className="flex gap-x-2">
              <h6 className="font-semibold capitalize">Logs</h6>
            </div>
            <p className="font-medium leading-relaxed text-[hsla(var(--text-secondary))]">
              Open App Logs and Cortex Logs.
            </p>
          </div>
          <div className="flex items-center gap-x-3">
            <div className="relative">
              <Input
                data-testid="jan-data-folder-input"
                value={janDataFolderPath + '/logs'}
                className="w-full pr-8 sm:w-[240px]"
                disabled
              />
              <FolderOpenIcon
                size={16}
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer"
                onClick={() => onRevealInFinder('Logs')}
              />
            </div>
          </div>
        </div>

        {/* Clear log */}
        <div className="flex w-full flex-col items-start justify-between gap-4 border-b border-[hsla(var(--app-border))] py-4 first:pt-0 last:border-none sm:flex-row">
          <div className="flex-shrink-0 space-y-1">
            <div className="flex gap-x-2">
              <h6 className="font-semibold capitalize">Clear logs</h6>
            </div>
            <p className="font-medium leading-relaxed text-[hsla(var(--text-secondary))]">
              Clear all logs from newOS app.
            </p>
          </div>
          <Button
            data-testid="clear-logs"
            theme="destructive"
            variant="soft"
            onClick={clearLogs}
          >
            Clear
          </Button>
        </div>
      </div>
    </ScrollArea>
  )
}

export default Privacy
