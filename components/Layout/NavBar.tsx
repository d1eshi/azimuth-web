'use client'
import React, { FC } from 'react'
import { ButtonIcons } from './ButtonIcons'
import Image from 'next/image'
import { IconContext } from 'react-icons'

export const NavBar: FC = () => {
  const [domLoaded, setDomLoaded] = React.useState(false)

  React.useEffect(() => {
    setDomLoaded(true)
  }, [])
  return (
    <>
      {domLoaded && (
        <>
          <div>
            <Image src='/azimuth-logo.png' width={20} height={20} alt='Logo from app Azimuth' />
          </div>

          <div className='flex flex-col py-4 items-center flex-1 gap-3'>
            <IconContext.Provider value={{ color: 'white', className: 'react-icon text-slate-200' }}>
              <ButtonIcons />
            </IconContext.Provider>
          </div>
        </>
      )}
    </>
  )
}
