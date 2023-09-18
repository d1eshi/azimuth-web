import { Layer, Source, Marker } from 'react-map-gl'
import { useAppSelector } from '@/redux/hooks'
import { MarketFeatureCollection } from '@/interfaces/GeoJson'

type LayerTypes = 'markets' | 'venues'

interface Props {
  featureCollection: MarketFeatureCollection
  layerId: LayerTypes
  paint?: object
}
export const CustomLayer: React.FC<Props> = ({ layerId, paint, featureCollection }) => {
  const layerVisibility = useAppSelector(state => state.mapReducer.mapControls.layerVisibility[layerId])

  return (
    // @ts-ignore
    <Source id={`source-${layerId}`} type='geojson' data={featureCollection}>
      <Layer
        id={`layer-${layerId}`}
        type='fill'
        source={`source-${layerId}`}
        paint={{
          'fill-color': '#331872',
          'fill-opacity': 0.7,
          'fill-outline-color': '#9600ff',
        }}
        layout={{ visibility: layerVisibility ? 'visible' : 'none' }}
      ></Layer>
    </Source>
  )
}
