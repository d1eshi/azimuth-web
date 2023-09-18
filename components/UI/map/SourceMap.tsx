import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import React from 'react'
import { Marker, MapRef } from 'react-map-gl'
import { CustomLayer } from './CustomLayer'
import { DeviceFeatureCollection, MarketFeatureCollection, VenueFeatureCollection } from '@/interfaces/GeoJson'
import { setModalData } from '@/redux/UISlice'
import { PopupDma } from './layers/dma/Popup'
import CustomMarker from './components/CustomMarker'

interface Props {
  data: {
    marketsData: MarketFeatureCollection
    devicesData: DeviceFeatureCollection
    venuesData: VenueFeatureCollection
  }
  mapRef: React.RefObject<MapRef>
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>
}

type Layers = 'Markets' | 'Avenues' | 'Stations' | 'Events' | ''

export const SourceMap: React.FC<Props> = ({ data, mapRef, setIsPopupOpen }) => {
  const layerVisibility = useAppSelector(state => state.mapReducer.mapControls.layerVisibility)

  return (
    <>
      {layerVisibility['devices'] && <CustomMarker data={data.devicesData} layerVisibility={layerVisibility} />}

      {layerVisibility['venues'] && <CustomMarker data={data.venuesData} layerVisibility={layerVisibility} />}
      {layerVisibility['markets'] && <CustomLayer featureCollection={data.marketsData} layerId='markets' />}
    </>
  )
}
