import React, { FC } from 'react'
import { CustomMap } from './CustomMap'
import { Providers } from '@/redux/provider'
import { getAirplayDevices, getMarketsData } from '@/services/supabase/functions'
import { getDataLayers } from '@/utils/getDataLayers'

async function getData() {
  const data = await getDataLayers()
  return data
}

const WrapMap: FC = async () => {
  const data = await getData()

  return <Providers>{<CustomMap data={data} />}</Providers>
}

export default WrapMap
