import React from 'react'
import { useSelector } from 'react-redux'
import { AirplayModal, CustomModal, MarketModal, VenueModal } from './ListModal'
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
      modalComponent = <VenueModal venueFeature={showModal?.data} />
      break
    case 'market':
      modalComponent = <MarketModal marketFeature={showModal?.data} airplayDevices={data.airplayDevicesData} />
      break
    case 'airplay':
      modalComponent = <AirplayModal airplayDevice={showModal.data} />
      break
    case 'devices':
      modalComponent = <CustomModal deviceFeature={showModal?.data} />
      break
    default:
      modalComponent = null // Puedes manejar otros casos aquí si es necesario
      break
  }

  return modalComponent
}
