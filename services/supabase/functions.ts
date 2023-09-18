import {
  CustomFeature,
  CustomFeatureCollection,
  DeviceFeature,
  DeviceFeatureCollection,
  DeviceFeatureProperties,
  MarketFeature,
  MarketFeatureCollection,
  MarketFeatureProperties,
  SubDMA,
  VenueFeature,
  VenueFeatureCollection,
  VenueFeatureProperties,
} from '@/interfaces/GeoJson'
import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Position, GeoJsonGeometryTypes, FeatureCollection } from 'geojson'
import supabase from '.'

interface DMAItem {
  geometry: string
  dma_id: number
  id: string
  name: string
  time_fetched: string
  time_updated: Date
  type_id: string
}
interface VenueItem {
  address: string
  capacity: null
  city: string
  country: string
  description: null
  latitude: number
  longitude: number
  metroarea_name: null
  name: string
  phone: null
  popularity: null
  postal_code: string
  state: string
  timezone: string
  url: string
  _id: null
}
interface DeviceItem {
  command: boolean
  country: string
  description: null | string
  id: string
  latitude: null | number
  longitude: null | number
  market: string
  name: null | string
  runtime: number
  snippet_length: number
  state: string
  station_frequencies: number[]
  station_names: string[]
  status: string
  type_id: string
  venue_id: null | string
}

type PropertiesForGeoJSON = MarketFeatureProperties | VenueFeatureProperties | DeviceFeatureProperties

function convertToGeoJSON(properties: PropertiesForGeoJSON, coordinates: any, type: GeoJsonGeometryTypes) {
  return {
    type: 'Feature',
    geometry: {
      type: type,
      coordinates,
    },
    properties,
  }
}
// type: 'Feature',
//     geometry: {
//       type: type,
//       coordinates,
//     },
// properties: {
// time_fetched: i.time_fetched,
//       name: i.name,
//       id: i.id,
// subdma: [
//   {
//      lat: subdma.lat
//      long: subdma.long
//     title: device.title,
//     artist: device.artist,
//   }
// ]
// }
//   }

export const getMarketsData = async () => {
  try {
    // const supabase = createServerComponentClient({ cookies })
    let { data, error } = await supabase.from('nielsen_dmas_clean').select('*').limit(3)
    if (!data) throw new Error(`Error: ${error}`)
    // console.log({ data }, 'from dmas_clean')

    let features: MarketFeature[] = []

    await data.forEach(async (i: DMAItem) => {
      let coordinates = JSON.parse(i.geometry)
      if (coordinates.coordinates) {
        let properties: MarketFeatureProperties = {
          time_fetched: i.time_fetched,
          name: i.name,
          id: i.id,
        }

        const geoJSON = await convertToGeoJSON(properties, coordinates.coordinates, 'Polygon')

        // @ts-ignore
        features.push(geoJSON)
      }
    })
    const geojson: MarketFeatureCollection = {
      type: 'FeatureCollection',
      features,
    }
    return geojson
  } catch (error: any) {
    throw new Error(`Error: ${error.message}`)
  }
}

export type MyData = Awaited<ReturnType<typeof getMarketsData>>

export const getVenuesData = async () => {
  try {
    const { data, error } = await supabase.from('azimuth_venues_duplicate_2').select('*').eq('country', 'US').limit(10)
    if (!data?.length) throw new Error(`Error: ${error?.message}`)

    // console.log(data, 'from getVnues')
    const features: VenueFeature[] = []
    data.forEach((venue: VenueItem) => {
      const { latitude, longitude } = venue
      const geoJson = convertToGeoJSON(venue, [Number(latitude), Number(longitude)], 'Point')

      // @ts-ignore
      features.push(geoJson)
    })
    const geojson: VenueFeatureCollection = {
      type: 'FeatureCollection',
      features,
    }

    return geojson
  } catch (error: any) {
    throw new Error('Error: ', error.message)
  }
}

export const getAirplayDevices = async () => {
  try {
    const { data, error } = await supabase.from('device_raw_airplay').select('*').limit(10)
    if (!data?.length) throw new Error(`Error: ${error?.message}`)
    // const airplayDevicesData: AirplayDevice = { data }
    return data
  } catch (error: any) {
    throw new Error('Error: ', error.message)
  }
}

export const getDevicesData = async () => {
  try {
    const { data, error } = await supabase.from('device_management').select('*')
    if (!data?.length) throw new Error(`Error: ${error?.message}`)
    // console.log({ data }, 'from getDevicesData')

    const features: DeviceFeature[] = []
    data.forEach((device: DeviceItem) => {
      if (device.latitude !== null && device.longitude !== null) {
        const geoJSON = convertToGeoJSON(device, [device.latitude, device.longitude], 'Point')

        // @ts-ignore
        features.push(geoJSON)
      }
    })
    // console.log({ features }, 'from devices')

    return {
      type: 'FeatureCollection',
      features,
    } as DeviceFeatureCollection
  } catch (error: any) {
    throw new Error('Error: ', error.message)
  }
}

export const getSubDMAs = async () => {
  try {
    const { data, error } = await supabase.from('dma_mapping').select('*')
    if (!data?.length) throw new Error(`Error: ${error?.message}`)
    // console.log({ data })

    return data
  } catch (error: any) {
    throw new Error(`Error: ${error.message}`)
  }
}
