import {
  DeviceFeature,
  DeviceFeatureProperties,
  MarketFeature,
  MarketFeatureProperties,
  VenueFeature,
  VenueFeatureProperties,
} from '@/interfaces/GeoJson'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { GeoJsonProperties } from 'geojson'

type ModalTypes = 'market' | 'venue' | 'devices' | ''
// export type ModalData = VenueFeature | GeoJsonProperties | null

interface UIState {
  showModal: {
    show: boolean
    type: ModalTypes

    venue?: VenueFeatureProperties
    market?: MarketFeatureProperties
    devices?: DeviceFeatureProperties
  }
}

const initialState = {
  showModal: {
    show: false,
    type: '',
  },
} as UIState

interface PayloadModal {
  data: GeoJsonProperties
  type: ModalTypes
}

const UI = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    setModalData: (state, action: PayloadAction<PayloadModal>) => {
      // console.log({ action }, 'from setShowModal redux')
      state.showModal = {
        show: true,
        [action.payload.type]: [],
        type: action.payload.type,
      }

      state.showModal = {
        show: true,
        [action.payload.type]: action.payload.data,
        type: action.payload.type,
      }
    },
    setStatusModal: (state, action) => {
      state.showModal.show = action.payload
    },
  },
})

export const { setModalData, setStatusModal } = UI.actions

export default UI.reducer
