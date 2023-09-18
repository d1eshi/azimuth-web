import {
  AirplayDevice,
  DataForLayers,
  DeviceFeatureCollection,
  MarketFeatureCollection,
  SubDMA,
  VenueFeatureCollection,
} from '../interfaces/GeoJson'
import {
  getAirplayDevices,
  getDevicesData,
  getMarketsData,
  getSubDMAs,
  getVenuesData,
} from '../services/supabase/functions'
import { readFileSync, writeFileSync } from 'fs'
let pathToSaveDMA = 'data/dmas.json'

async function loadFromStaticFile<T>(filePath: string): Promise<T | null> {
  try {
    const fileContent = await readFileSync(filePath, 'utf-8')
    return JSON.parse(fileContent)
  } catch (error) {
    return null
  }
}

async function saveToStaticFile<T>(filePath: string, data: T): Promise<void> {
  const jsonContent = JSON.stringify(data)
  await writeFileSync(filePath, jsonContent, 'utf-8')
}

async function fetchDataWithCaching<T>(filePath: string, fetchFunction: () => Promise<T>) {
  const cachedData: T | null = await loadFromStaticFile(filePath)

  if (!cachedData) {
    const fetchedData = await fetchFunction()
    await saveToStaticFile(filePath, fetchedData)
    return fetchedData
  }

  return cachedData
}

export async function getDataLayers(): Promise<DataForLayers> {
  const marketsData = await fetchDataWithCaching('data/dmas.json', getMarketsData)
  // const markets = await getMarketsData()

  // console.log(marketsData, 'from getDataLayers markets!!')

  const airplayDevicesData: AirplayDevice[] = await fetchDataWithCaching('data/airplayDevices.json', getAirplayDevices)

  const subDMAs = await fetchDataWithCaching('data/subDMAs.json', getSubDMAs)

  const venuesData = await fetchDataWithCaching('data/venues.json', getVenuesData)

  const devicesData = await fetchDataWithCaching('data/devices.json', getDevicesData)

  // const marketsDatatest = async () => {
  //   const devicesArray = []

  //   markets.forEach(dma => {
  //     let marketFeatureNameFormatted = dma?.name.replace(/\s*-\s*/g, '-')
  //     let filtered

  //     const subdmaFound = subDMAs.filter(subdma => subdma.name === marketFeatureNameFormatted)
  //     console.log(subdmaFound, 'subdma found')

  //     if (subdmaFound.length) {
  //       const subDmaDetails = JSON.parse(subdmaFound[0].subdma)
  //       const stations = subDmaDetails[0].stations
  //       // console.log({ stations })

  //       const matchingDevices: AirplayDevice[] = []

  //       stations.forEach((station: { name: string; frequency: string; format: string }) => {
  //         const devices = airplayDevicesData.filter(device => {
  //           const formattedDeviceFrequency = device.frequency.replace(/^"|"$/g, '')
  //           return station.frequency === formattedDeviceFrequency
  //         })
  //         matchingDevices.push(...devices)
  //       })
  //       const subdmaObject = () =>
  //         matchingDevices.map(device => ({
  //           lat: parseFloat(subDmaDetails[0].lat),
  //           long: parseFloat(subDmaDetails[0].long),
  //           title: device.title,
  //           artist: device.artist,
  //         }))

  //       // console.log(subdmaObject())
  //     }
  //   })
  //   // return devicesArray.flat()
  // }
  // const marketsData = await marketsDatatest()
  // console.log(marketsData, 'let see if works all filters')

  return {
    marketsData,
    airplayDevicesData,
    subDMAs,
    venuesData,
    devicesData,
  }
}
