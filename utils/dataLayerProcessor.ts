import { SingleSubDMA, SubDMA } from '@/interfaces/GeoJson'
import { useAppSelector } from '@/redux/hooks'
import { AirplayDevice } from '../interfaces/GeoJson'

export function marketLayerProcessor(subDmas: SubDMA[], airplayDevices: AirplayDevice[]) {
  const subDMAStations: { name: string; frequency: string }[] = []

  subDmas.forEach((subDma, i) => {
    let subDMADetails: SingleSubDMA[] = JSON.parse(subDma.subdma)
    console.log({ subDMADetails })

    subDMADetails[0].stations.forEach(station => {
      subDMAStations.push({
        name: station.name,
        frequency: station.frequency,
      })
    })
  })
  console.log(subDMAStations)

  const filteredDevices = airplayDevices.filter((device, i) => {
    console.log(device, 'from filteredDevices')
    return subDMAStations.some(subDMAStation => {
      // console.log(subDMAStation)
      // console.log(typeof subDMAStation.frequency)
      const deviceFrequencyWithoutQuotes = device.station.toString().replace(/"/g, '')

      // console.log(device.frequency.toString())

      return deviceFrequencyWithoutQuotes == subDMAStation.name
    })
  })

  console.log({ filteredDevices })

  // return filteredDevices
}
