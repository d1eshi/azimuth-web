import { DeviceFeatureCollection, MarketFeatureCollection, VenueFeatureCollection } from '@/interfaces/GeoJson'
import { setModalData } from '@/redux/UISlice'
import { useAppDispatch } from '@/redux/hooks'
import React, { FC } from 'react'

import { Marker } from 'react-map-gl'

interface Props {
  data: DeviceFeatureCollection | VenueFeatureCollection
  layerVisibility: {
    markets: boolean
    venues: boolean
    devices: boolean
  }
}

type ModalTypes = 'market' | 'venue' | 'devices' | ''

const CustomMarker: FC<Props> = ({ data, layerVisibility }) => {
  let featureCollection = data
  let type: ModalTypes = ''

  if (layerVisibility.devices) {
    type = 'devices'
  } else if (layerVisibility.venues) {
    type = 'venue'
  }

  const dispatch = useAppDispatch()

  const memoizedMarkers = React.useMemo(() => {
    return featureCollection.features.map(marker => {
      if (!marker?.properties?.latitude || !marker.properties.longitude) return null

      return (
        <Marker
          key={`marker-${marker.properties.name}`}
          longitude={marker.properties.longitude}
          latitude={marker.properties.latitude}
          anchor='center'
          color='#6122df'
          style={{ background: '#6122df', borderRadius: '27px', width: '.8rem', height: '.8rem' }}
          onClick={e => {
            // Prevent autoclose
            e.originalEvent.stopPropagation()

            dispatch(setModalData({ data: marker.properties, type }))
          }}
        >
          <div className='w-50 rounded bg-violet-500 cursor-pointer'></div>
        </Marker>
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [featureCollection])

  return <>{memoizedMarkers}</>
}

export default CustomMarker
