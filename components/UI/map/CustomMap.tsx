'use client'
import React, { FC, useState } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import type { MapRef } from 'react-map-gl'
import Map from 'react-map-gl'
import mapboxgl from 'mapbox-gl'
import {
  AirplayDevice,
  DataForLayers,
  DeviceFeatureCollection,
  FeatureInfo,
  MarketFeatureCollection,
  VenueFeatureCollection,
} from '@/interfaces/GeoJson'
import { ArrowPathIcon } from '@heroicons/react/20/solid'
import { ChooseLayer } from './components/ChooseLayer'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { PopupDma } from './layers/dma/Popup'
import { SourceMap } from './SourceMap'
import { setModalData, setStatusModal } from '@/redux/UISlice'
import { DynamicModal } from '../modals/DynamicModal'
import { FeatureCollection } from 'geojson'
import { setDataForLayers } from '@/redux/map/mapSlice'

const MAPBOX_API = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

interface Props {
  // featureCollection: FeatureCollection
  data: DataForLayers
}

export const CustomMap: FC<Props> = ({ data }) => {
  const layerVisibility = useAppSelector(state => state.mapReducer.mapControls.layerVisibility)

  const modalStatus = useAppSelector(state => state.UIReducer.showModal.show)
  const dispatch = useAppDispatch()
  const [isHovered, setIsHovered] = useState(false)

  const [loadedMap, setLoadedMap] = React.useState(false)
  const [viewState, setViewState] = React.useState({
    longitude: -122.4,
    latitude: 37.8,
    zoom: 2,
  })

  const [popupInfo, setPopupInfo] = useState<FeatureInfo>()
  const [isPopupOpen, setIsPopupOpen] = React.useState(false)

  // still is not used
  const mapRef = React.useRef<MapRef>(null)

  React.useEffect(() => {
    dispatch(setDataForLayers(data))
  }, [data])

  const handleEnterMouse = React.useCallback((e: mapboxgl.MapLayerMouseEvent) => {
    console.log('hovered marker?')

    if (!e.features) return
    console.log(e.features[0].properties)

    const featureInfo: FeatureInfo = { coordinates: e.lngLat, name: e.features[0]?.properties?.name }
    setIsHovered(true)

    setPopupInfo(featureInfo)

    setIsPopupOpen(true)
  }, [])

  const handleLeaveMouse = () => {
    setIsPopupOpen(false)
  }

  const handleClick = React.useCallback(
    (e: mapboxgl.MapLayerMouseEvent) => {
      if (modalStatus) {
        dispatch(setStatusModal(false)) // Cierra el modal
      }
      if (!e.features?.length || !e.features[0].properties || layerVisibility['venues']) return

      // show modal station
      dispatch(setModalData({ data: e.features[0].properties, type: 'market' }))
    },
    [layerVisibility, dispatch, modalStatus]
  )

  return (
    <>
      {!loadedMap && (
        <div className='flex h-screen '>
          <div className='m-auto'>
            <ArrowPathIcon className='h-10 w-10 mx-auto animate-spin text-gray-500' />
          </div>
        </div>
      )}
      <Map
        ref={mapRef}
        onLoad={() => setLoadedMap(true)}
        {...viewState}
        onMove={e => setViewState(e.viewState)}
        // onDrag={() => }
        mapboxAccessToken={MAPBOX_API}
        doubleClickZoom={true}
        minZoom={2.8}
        onMouseEnter={handleEnterMouse}
        onMouseLeave={handleLeaveMouse}
        onClick={handleClick}
        interactiveLayerIds={['layer-markets', 'layer-venues']}
        // cursor={(isHovered && 'pointer') || 'grab'}
        style={{ width: '100%', height: '100%', outline: 'none', cursor: `${isHovered ? 'pointer' : ''}` }}
        mapStyle='mapbox://styles/d1eshi/cllux6seg00ze01qi87g3avq5'
      >
        {/* this for Markets Layer */}

        <>
          <SourceMap setIsPopupOpen={setIsPopupOpen} data={data} mapRef={mapRef} />
          <ChooseLayer />
        </>
        {/* )} */}
        {isPopupOpen && <PopupDma popupInfo={popupInfo} setIsPopupOpen={setIsPopupOpen} />}
      </Map>
      {modalStatus && <DynamicModal />}
      {/* show modal */}
    </>
  )
}
