'use client'
import React, { FC } from 'react'
import { TbMapSearch } from 'react-icons/tb'

interface Props {}
export const SearchBar: FC<Props> = () => {
  return (
    <div className='rounded-md w-full p-4'>
      <div className='w-full p-1 border text-center align-baseline h-full border-gray-700 rounded bg-[#1f2125] text-gray-400 flex items-center justify-center gap-3'>
        <TbMapSearch fontSize='1.5rem' />
        <input
          type='text'
          placeholder='Search'
          className='placeholder:text-gray-600 outline-none placeholder:text-xs focus-visible:border-none text-xs bg-transparent w-full'
        />
        {/* add block command */}
      </div>
    </div>
  )
}
