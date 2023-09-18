import { FeatureInfo } from '@/interfaces/GeoJson'
import React, { FC } from 'react'
import { Popup } from 'react-map-gl'

interface Props {
  popupInfo: FeatureInfo | undefined
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const PopupDma: FC<Props> = ({ popupInfo, setIsPopupOpen }) => {
  return (
    <>
      {popupInfo && (
        <Popup
          anchor='bottom'
          offset={10}
          latitude={popupInfo.coordinates.lat + 0.5}
          longitude={popupInfo.coordinates.lng}
          // latitude={28.51009120303259}
          // longitude={-100.182189747734}
          onClose={() => setIsPopupOpen(false)}
          closeButton={false}
          closeOnMove={true}
          className='popupMapBox'
          style={{
            padding: 0,
            margin: 0,
            background: 'none',
          }}
        >
          {/* #101012 */}
          <div className='flex gap-4 w-56 max-h-20 p-3 py-6 items-center bg-[#101012] text-slate-200 rounded-sm border border-gray-600'>
            <div className='w-11 h-11 bg-white'></div>
            <div className='flex flex-col'>
              <h2 className='text-[.9rem] mb-2 text-slate-200 font-medium'>{popupInfo?.name}</h2>
              <div className='flex bg-[#1e1934] rounded-lg px-1.5 w-min'>
                <p className='text-[.5rem] uppercase tracking-widest'>markets</p>
              </div>
              <p className='text-slate-500'>{popupInfo?.name}</p>
            </div>
          </div>
        </Popup>
      )}
    </>
  )
}
