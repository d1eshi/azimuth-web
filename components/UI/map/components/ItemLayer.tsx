import { Layer } from '@/interfaces/GeoJson'
import React, { FC } from 'react'

import { AiOutlineEye } from 'react-icons/ai'
import { AiOutlineEyeInvisible } from 'react-icons/ai'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { toggleLayerVisibility } from '@/redux/map/mapSlice'

interface Props extends Layer {}

export const ItemLayer: FC<Props> = ({ layerId, config: { label } }) => {
  const layers = useAppSelector(state => state.mapReducer.mapInfo.layers)
  const layerVisibility = useAppSelector(state => state.mapReducer.mapControls.layerVisibility)

  const dispatch = useAppDispatch()

  const [visibility, setVisibility] = React.useState(layerVisibility[label])

  const visibilityChange = (layerId: number) => {
    const oldLayer = layers.find(layer => layer.layerId === layerId)
    setVisibility(prev => !prev)
    dispatch(toggleLayerVisibility(label))
  }

  return (
    <div className='flex gap-4 items-center w-full px-3 py-2  text-zinc-400 font-medium  cursor-pointer'>
      <div className='flex-1 gap-1 flex  '>
        <p className={`${visibility ? 'text-[#6f51c9c7]' : ''} capitalize`}>{label} </p>
      </div>

      <div className='basis-10'>
        {visibility ? (
          <AiOutlineEye size={25} onClick={() => visibilityChange(layerId)} />
        ) : (
          <AiOutlineEyeInvisible size={25} onClick={() => visibilityChange(layerId)} />
        )}
      </div>
    </div>
  )
}
