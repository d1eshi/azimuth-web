import React, { FC } from 'react'

import { SearchBar } from '@/components/Layout/SearchBar'

import { NavBar } from '@/components/Layout/NavBar'

// const WrapMap = dynamic(() => import('@/components/UI/map/WrapMap'), { ssr: false })
// const Providers = dynamic(() => import('@/redux/provider'), { ssr: false })
import WrapMap from '@/components/UI/map/WrapMap'
import { Providers } from '@/redux/provider'
import dynamic from 'next/dynamic'

export default function Web() {
  // const [domLoaded, setDomLoaded] = React.useState(false)

  // React.useEffect(() => {
  //   setDomLoaded(true)
  // }, [])

  return (
    <>
      {/* {domLoaded && ( */}
      <div className='flex flex-col sm:flex-row w-screen h-screen'>
        {/* navbar show icons */}

        <nav className='bg-[#18181b] min-w-screen sm:max-w-[50px] flex items-center sm:flex-col px-2.5 py-2 gap-3 divide-y divide-gray-700'>
          <NavBar />
        </nav>

        <main className='w-full min-h-screen relative'>
          <WrapMap />
        </main>

        {/* aside show search */}
        <aside className='max-w-[250px] w-full bg-[#18181b]'>
          <SearchBar />
        </aside>
      </div>
      {/* )} */}
    </>
  )
}
