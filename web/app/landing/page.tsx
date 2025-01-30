import BaseLayout from '@/containers/Layout'
import LandingViewContainer from '@/containers/LandingViewContainer'

import Providers from '@/containers/Providers'

export default function Page() {
  return (
    <Providers>
      <BaseLayout>
        <LandingViewContainer />
      </BaseLayout>
    </Providers>
  )
}