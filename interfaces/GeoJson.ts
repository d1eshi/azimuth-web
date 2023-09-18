import { Geometry, GeoJsonGeometryTypes, Position, Feature, FeatureCollection } from 'geojson'
import { LngLat } from 'mapbox-gl'

// here we can add more properties if we need it
export interface CustomProperties {
  station: string
}

export interface CustomFeature extends Feature<Geometry, CustomProperties> {}

export interface CustomFeatureCollection extends FeatureCollection<Geometry, CustomProperties> {
  features: CustomFeature[]
}
export interface FeatureInfo {
  name: string
  coordinates: {
    lat: number
    lng: number
  }
}

interface BaseFeature {
  type: string
  geometry: {
    type: GeoJsonGeometryTypes
    coordinates: Position[]
  }
}

// Markets
export interface MarketFeature extends BaseFeature {
  type: 'Feature'
  geometry: {
    type: GeoJsonGeometryTypes
    coordinates: Position[]
  }
  properties: MarketFeatureProperties
}

export interface MarketFeatureProperties {
  time_fetched: string
  name: string
  id: string
}
export interface MarketFeatureCollection {
  type: 'FeatureCollection'
  features: MarketFeature[]
}

// venues
export interface VenueFeatureProperties {
  address: string
  name: string
  capacity: null
  city: string
  country: string
  latitude: number
  longitude: number
  popularity: null
  postal_code: string
}

export interface VenueFeature extends BaseFeature {
  type: 'Point'
  properties: VenueFeatureProperties
}

export interface VenueFeatureCollection {
  type: 'FeatureCollection'
  features: VenueFeature[]
}

// devices
export interface DeviceFeatureProperties {
  command: boolean
  country: string
  description: null | string
  id: string
  latitude: null | number
  longitude: null | number
  market: string
  name: string | null
  runtime: number
  snippet_length: number
  state: string
  station_frequencies: number[]
  station_names: string[]
  status: string
  type_id: string
  venue_id: null | string
}

export interface DeviceFeature extends BaseFeature {
  type: 'Point'
  properties: DeviceFeatureProperties
}

export interface DeviceFeatureCollection {
  type: 'FeatureCollection'
  features: DeviceFeature[]
}

// airplay devices
export interface AirplayDevice {
  acr_id: string
  artist: string
  country: string
  frequency: string
  id: number
  market: string
  station: string
  timestamp: string
  title: string
}

// subdmas
export interface SingleSubDMA {
  name: string
  location: {
    lat: number
    long: number
  }
  stations: {
    name: string
    frequency: string
    format: string
  }[]
  city: string
  state: string
}

export interface SubDMA {
  Rank: number
  // SingleSubDMA
  subdma: string
  name: string
  Population: string
  id: null | string
  dma_id: null | string
}

export interface ResponseSubapaseDMAs {
  geometry: {
    coordinates: number[][][]
    type: GeoJsonGeometryTypes
  }
}

export interface DataDMAs {
  data: Geometry
}

type LayerTypes = 'markets' | 'venues' | 'devices'

export interface Layer {
  layerId: number
  config: {
    label: LayerTypes
    isVisible: boolean
  }
}

export interface DataForLayers {
  marketsData: MarketFeatureCollection
  devicesData: DeviceFeatureCollection
  venuesData: VenueFeatureCollection
  airplayDevicesData: AirplayDevice[]
  subDMAs: SubDMA[]
}
