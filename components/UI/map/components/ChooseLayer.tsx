import { Layer } from '@/interfaces/GeoJson'
import React, { FC } from 'react'

import { SiOpenlayers } from 'react-icons/si'
import { ItemLayer } from './ItemLayer'
import { useAppSelector } from '@/redux/hooks'
// import { ChooseLayer } from '@/components/UI/map/ChooseLayer'
import { store } from '@/redux/store'

interface Props {}

export const ChooseLayer: FC<Props> = () => {
  const [isToggled, setIsToggled] = React.useState(false)

  const layers = store.getState().mapReducer.mapInfo.layers

  const layerInfo = () => {
    if (!!!layers.length) return []

    const temp: any[] = []

    layers.map(layer => {
      const { config } = layer

      temp.push({
        layerId: layer.layerId,
        config: {
          label: config.label,
          isVisible: config.isVisible,
        },
      })
    })
    return temp
  }

  const handleToggle = () => {
    setIsToggled(prev => !prev)
  }
  return (
    <div>
      <div className='absolute top-5 left-4 flex flex-col z-40 justify-start '>
        <div
          className='h-auto w-auto p-2 text-slate-300 bg-[#18181b] font-bold flex items-center justify-center gap-3 rounded-md cursor-pointer self-start text-white'
          onClick={handleToggle}
          role='button'
        >
          <SiOpenlayers fontSize='1rem' />
          <span className='mouse-events-none'>Layers</span>
        </div>
        {isToggled && !!layerInfo().length && (
          <div className=' relative top-3 min-w-[250px]  flex flex-col gap-2 border border-zinc-700 bg-[#18181b] rounded-md hover:[&>*]:bg-zinc-800 overflow-hidden shadow-lg '>
            {layerInfo().map(layer => (
              <ItemLayer key={layer.layerId} {...layer} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
