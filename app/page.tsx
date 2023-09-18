'use client'
import Link from 'next/link'
import React from 'react'

// import { redirect } from 'next/navigation'

export default function Home() {
  // const router = useRouter()
  const [domLoaded, setDomLoaded] = React.useState(false)

  React.useEffect(() => {
    setDomLoaded(true)
  }, [])

  return (
    <>
      {domLoaded && (
        <div
          className='h-full flex justify-center flex-col gap-2
    px-10 bg-gradient-to-r from-black-500 from-30% to-indigo-300'
        >
          <p className='text-blue-500 text-4xl font-semibold'>
            Helping artists and
            <br />
            venues make <br /> beautiful music <br /> together
          </p>
          <Link href='/web'>
            <button className='max-w-xs border border-slate-200 rounded'>Join</button>
          </Link>
        </div>
      )}
    </>
  )
}
