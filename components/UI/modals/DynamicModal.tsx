import React from 'react'
import { useSelector } from 'react-redux'
import { CustomModal, MarketModal, VenueModal } from './ListModal'
import { useAppSelector } from '@/redux/hooks'
// import { VenueModal, MarketModal } from './Modals';

export const DynamicModal = () => {
  // Usamos useSelector para obtener el tipo de modal activo desde el estado de Redux
  const showModal = useAppSelector(state => state.UIReducer.showModal)
  const data = useAppSelector(state => state.mapReducer.mapInfo.data)

  if (!showModal.show) return

  let modalComponent

  // Revisamos el tipo de modal activo
  switch (showModal.type) {
    case 'venue':
      modalComponent = <VenueModal venueFeature={showModal?.venue} />
      break
    case 'market':
      modalComponent = <MarketModal marketFeature={showModal?.market} airplayDevices={data.airplayDevicesData} />
      break
    case 'devices':
      modalComponent = <CustomModal deviceFeature={showModal?.devices} />
      break
    default:
      modalComponent = null // Puedes manejar otros casos aquí si es necesario
      break
  }

  return modalComponent
}
