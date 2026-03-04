'use client'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { PackageForm } from './package_create_form'
import { Package_table } from './package_table'

function Package_Dasboard() {

  const [showForm, setShowForm] = useState<boolean>(false)

  return (
    <div className=' py-5 px-2  '>
      <div className=' gap-x-3 flex border-b pb-3 border-gray-400'>
        <div>
          <Button onClick={() => setShowForm(false)} className=' cursor-pointer'>All Packages</Button>
        </div>
        <div>
          <Button onClick={() => setShowForm(true)} className=' cursor-pointer'>New Package</Button>
        </div>
      </div>
      <div className='mt-6'>
        {showForm ? <PackageForm /> : <Package_table/>}
      </div>
    </div>
  )
}

export default Package_Dasboard