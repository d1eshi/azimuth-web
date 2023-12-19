import {
  AirplayDevice,
  DeviceFeature,
  DeviceFeatureProperties,
  MarketFeature,
  MarketFeatureProperties,
  SubDMA,
  VenueFeature,
  VenueFeatureProperties,
} from '@/interfaces/GeoJson'
import { setModalData } from '@/redux/UISlice'
import { useAppDispatch } from '@/redux/hooks'
import React, { FC } from 'react'
import { SiAirplayaudio } from 'react-icons/si'
import { VscAccount } from 'react-icons/vsc'

interface Props {
  venueFeature?: VenueFeatureProperties | undefined
  marketFeature?: MarketFeatureProperties | undefined
  deviceFeature?: DeviceFeatureProperties | undefined
  airplayDevices?: AirplayDevice[]
  subDMAs?: SubDMA[]
  feature?: DeviceFeatureProperties | VenueFeature | MarketFeature | AirplayDevice[]
}

export const VenueModal: FC<Props> = ({ venueFeature }) => {
  if (!venueFeature) return
  const propertyEntries = Object.entries(venueFeature)
  return (
    <div className='absolute border border-gray-700 rounded right-0 top-0 mt-2 mr-4 w-64 min-h-screen bg-[#18181b] text-white flex flex-col'>
      <div className='w-full h-36 bg-white'></div>
      {/* <img src='' alt='' /> */}
      <div className='p-2 flex flex-col gap-2 text-slate-400'>
        <p className='text-xl clamp text-white capitalize'>{venueFeature.name}</p>
        <p className='bg-[#1e1934] text-white rounded-lg px-1.5 w-min text-[.6rem] uppercase tracking-widest'>venues</p>
        <p className='text-slate-400'>
          {venueFeature.capacity || 500} seats - {venueFeature.city}
        </p>

        <div className='flex flex-col gap-[6px]'>
          {propertyEntries.map(([propertyName, propertyValue]) => {
            if (propertyName && propertyValue === null) return
            return (
              <div
                className='flex items-baseline justify-between gap-6 text-sm text-slate-400 capitalize'
                key={propertyName}
              >
                <p className='bg-[#1e1934] rounded-lg px-1.5 w-min text-[.6rem] text-white uppercase tracking-widest'>
                  {propertyName}
                </p>
                <p className='capitalize line-clamp-1' key={propertyName}>
                  {propertyValue}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export const MarketModal: FC<Props> = ({ marketFeature, airplayDevices, subDMAs }) => {
  const dispatch = useAppDispatch()
  if (!marketFeature || !airplayDevices?.length) return
  const { name } = marketFeature

  const handleClickAirplayDevice = (airplay: AirplayDevice) => {
    dispatch(setModalData({ data: airplay, type: 'airplay' }))
  }

  return (
    <div className='absolute border border-gray-700 rounded right-0 top-0 mt-2 mr-4 w-64 min-h-screen  bg-[#131315] text-white flex flex-col'>
      <div className='w-full h-36 bg-white'></div>
      {/* <img src='' alt='' /> */}
      <div className='p-2 flex flex-col  max-h-[78vh] gap-3 text-slate-400'>
        <p className='text-xl clamp text-white' dangerouslySetInnerHTML={{ __html: marketFeature.name }}></p>
        <p className='bg-[#1e1934]  font-medium text-white rounded-lg px-3 py-.5 w-min text-[.6rem] uppercase tracking-widest'>
          Markets
        </p>
        <p className='text-slate-400' dangerouslySetInnerHTML={{ __html: marketFeature.name }}></p>

        <p className='flex items-baseline font-medium justify-between text-xs text-slate-400'>
          <span className='bg-[#1e1934] rounded-lg px-1.5 text-[.6rem] text-white uppercase tracking-widest'>
            popularity
          </span>

          {1}
        </p>
        <div className='text-sm  flex items-center text-white mt-4'>
          {/* <div className='border-b border-blue'> */}
          <div className='w-6/12 h-6 flex gap-1 items-center border-b-2 border-sky-700 pb-2'>
            <SiAirplayaudio fontSize='.8rem' />
            <p className=''>Recent Airplay</p>
          </div>
          {/* </div> */}
          <div className='w-6/12 border-b-2 border-gray-700 h-6'></div>
        </div>

        <div className='overflow-auto'>
          {airplayDevices?.map(device => {
            const title = device.title.replace(/["']/g, '')
            const artist = device.artist.replace(/["']/g, '')

            return (
              <div
                className='flex gap-3 p-2 items-center text-white bg-black border-2 border-gray-800 rounded cursor-pointer'
                key={device.id}
                onClick={() => handleClickAirplayDevice(device)}
              >
                <div className='p-2 bg-[#0b0b0b] rounded'>
                  <VscAccount fontSize='1.7rem' />
                </div>
                <div>
                  <p className='capitalize'>{artist}</p>
                  <span className='bg-[#1e1934] font-medium rounded-lg p-1 text-[.6rem] text-white uppercase tracking-widest'>
                    {'airplay'}
                  </span>
                  <p className='capitalize text-sm text-slate-400'>{title}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export const CustomModal: FC<Props> = ({ deviceFeature }) => {
  // console.log({ deviceFeature }, 'from custommOdal')

  const propertiesToShow = ['status', 'popularity', 'country', 'latitude', 'longitude']

  if (!deviceFeature) return

  const filteredProperties = Object.fromEntries(
    Object.entries(deviceFeature).filter(([propertyName]) => propertiesToShow.includes(propertyName))
  )
  // const propertyEntries = Object.entries(deviceFeature)
  return (
    <div className='absolute border border-gray-700 rounded right-0 top-0 mt-2 mr-4 w-64 bg-[#131315] text-white flex flex-col'>
      <div className='w-full h-36 bg-white'></div>
      {/* <img src='' alt='' /> */}
      <div className='p-2 flex flex-col gap-3 text-slate-400'>
        <p className='text-xl clamp text-white' dangerouslySetInnerHTML={{ __html: deviceFeature.market }}></p>
        <p className='bg-[#1e1934]  font-medium text-white rounded-lg px-3 py-.5 w-min text-[.6rem] uppercase tracking-widest'>
          Markets
        </p>
        <p className='text-slate-400' dangerouslySetInnerHTML={{ __html: deviceFeature.market }}></p>
        {Object.entries(filteredProperties).map(([propertyName, propertyValue]) => (
          <p className='flex items-baseline font-medium justify-between text-xs text-slate-400' key={deviceFeature.id}>
            <span className='bg-[#1e1934] rounded-lg px-1.5 text-[.6rem] text-white uppercase tracking-widest'>
              {propertyName}
            </span>

            {propertyValue}
          </p>
        ))}
      </div>
    </div>
  )
}

export const AirplayModal: FC<{ airplayDevice: AirplayDevice }> = ({ airplayDevice }) => {
  // console.log({ airplayDevices, marketFeature }, 'let see modal')

  const propertyEntries = Object.entries(airplayDevice)

  return (
    <div className='absolute border border-gray-700 rounded right-0 top-0 mt-2 mr-4 w-64 min-h-screen  bg-[#131315] text-white flex flex-col'>
      <div className='w-full h-36 bg-white'></div>
      {/* <img src='' alt='' /> */}
      <div className='p-2 flex flex-col  max-h-[78vh] gap-3 text-slate-400'>
        <p className='text-xl clamp text-white'>{airplayDevice.title}</p>
        <p className='bg-[#1e1934]  font-medium text-white rounded-lg px-3 py-.5 w-min text-[.6rem] uppercase tracking-widest'>
          airplay
        </p>
        <p className='text-slate-400'>{airplayDevice.artist}</p>
        <div className='overflow-auto'>
          {propertyEntries.map(([propertyName, propertyValue]) => {
            return (
              <div
                className='flex items-baseline justify-between gap-6 text-sm text-slate-400 capitalize'
                key={propertyName}
              >
                <p className='bg-[#1e1934] rounded-lg px-1.5 w-min text-[.6rem] text-white uppercase tracking-widest'>
                  {propertyName}
                </p>
                <p className='capitalize line-clamp-1' key={propertyName}>
                  {propertyValue}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
