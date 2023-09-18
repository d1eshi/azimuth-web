import React, { FC } from 'react'

import { HiOutlineSun } from 'react-icons/hi2'
import { GrMapLocation } from 'react-icons/gr'
import { FiLayout } from 'react-icons/fi'
import { VscAccount } from 'react-icons/vsc'

const listButtonIcons = [{ icon: HiOutlineSun }, { icon: GrMapLocation }, { icon: FiLayout }, { icon: VscAccount }]

export const ButtonIcons: FC = () => {
  return listButtonIcons.map((item, i) => (
    <div className={`bg-[#232323] text-base p-1.5 rounded-md ${i === 3 ? 'mt-auto' : null}`} key={i}>
      <item.icon />
    </div>
  ))
}
