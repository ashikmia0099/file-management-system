import React from 'react'
import { Seleted_Package } from './(Seleted-Package-Component)/Seleted_Package'
import { Button } from '@/components/ui/button'

export default function SeletedPackagePage() {
  return (
    <div className=' pt-5 px-5'>
      <div className=' py-3'>
        <Button>
          Your Selected All Package
        </Button>
      </div>
        <Seleted_Package/>
    </div>
  )
}
