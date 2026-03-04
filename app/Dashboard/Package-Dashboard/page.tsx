import React from 'react'
import Package_Dasboard from './(Package-Dashboard-Component)/Package_Dasboard'
import ProtectedRoute from '@/app/Router/ProtectedRoute'

function PackageDashboardLayout() {
  return (
    <ProtectedRoute role='ADMIN'>
      <div>
        <Package_Dasboard />
      </div>
     </ProtectedRoute>

  )
}

export default PackageDashboardLayout