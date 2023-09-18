import {
  AirplayDevice,
  DeviceFeatureCollection,
  Layer,
  MarketFeature,
  MarketFeatureCollection,
  SubDMA,
  VenueFeatureCollection,
} from '@/interfaces/GeoJson'
// import fs from 'fs'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
interface LayerVisibility {
  markets: boolean
  venues: boolean
  devices: boolean
}
type LayersTypes = 'markets' | 'avenues' | 'stations' | 'events' | 'devices'

interface MapState {
  mapControls: {
    layerVisibility: LayerVisibility
  }
  mapInfo: {
    layers: Layer[]
    data: {
      marketsData: any
      devicesData: DeviceFeatureCollection
      venuesData: VenueFeatureCollection
      airplayDevicesData: AirplayDevice[]
      subDMAs: SubDMA[]
    }
  }
}

const initialState = {
  mapControls: {
    layerVisibility: {
      markets: false,
      venues: false,
      devices: false,
      // : false,
    },
  },
  mapInfo: {
    layers: [
      // {
      //   layerId: 0,
      //   config: { label: 'events', isVisible: false },
      // },
      {
        layerId: 1,
        config: { label: 'venues', isVisible: false },
      },
      {
        layerId: 2,
        config: { label: 'devices', isVisible: false },
      },
      {
        layerId: 3,
        config: { label: 'markets', isVisible: false },
      },
      // {
      //   layerId: 4,
      //   config: { label: 'stations', isVisible: false },
      // },
    ],
    data: {
      marketsData: { features: [], type: 'FeatureCollection' },
      venuesData: { features: [], type: 'FeatureCollection' },
      devicesData: { features: [], type: 'FeatureCollection' },
      airplayDevicesData: [],
      subDMAs: [],
    },
  },
} as MapState

const map = createSlice({
  name: 'map',
  initialState,
  reducers: {
    toggleLayerVisibility: (state, action: PayloadAction<string>) => {
      const layerKey = action.payload

      if (layerKey === 'markets' || layerKey === 'venues' || layerKey === 'devices')
        state.mapControls.layerVisibility[layerKey] = !state.mapControls.layerVisibility[layerKey]
    },
    setMarketsData: (state, action) => {
      state.mapInfo.data.marketsData = action.payload
      // just to static data
      // fs.writeFileSync('marketsData.json', JSON.stringify(action.payload))
    },

    setVenuesData: (state, action) => {
      state.mapInfo.data.venuesData = action.payload

      // fs.writeFileSync('marketsData.json', JSON.stringify(action.payload))
    },

    setDevicesData: (state, action) => {
      state.mapInfo.data.devicesData = action.payload

      // fs.writeFileSync('marketsData.json', JSON.stringify(action.payload))
    },
    setAirplayDevicesData: (state, action) => {
      state.mapInfo.data.airplayDevicesData = action.payload

      // fs.writeFileSync('marketsData.json', JSON.stringify(action.payload))
    },
    setDataForLayers: (state, action) => {
      state.mapInfo.data = action.payload
    },
  },
})

export const {
  toggleLayerVisibility,
  setMarketsData,
  setVenuesData,
  setDevicesData,
  setAirplayDevicesData,
  setDataForLayers,
} = map.actions

export default map.reducer

// export const fetchAndSetData = () => async (dispatch: any) => {
//   const marketsData = await getMarketsData()
//   const venuesData = await getVenuesData()
//   const devicesData = await getDevicesData()
//   const airplayDevicesData = await getAirplayDevices()

//   dispatch(setMarketsData(marketsData))
//   dispatch(setVenuesData(venuesData))
//   dispatch(setDevicesData(devicesData))
//   dispatch(setAirplayDevicesData(airplayDevicesData))
// }
