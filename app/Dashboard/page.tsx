'use client'
import React from 'react'
import All_Folder from './(Dashboard-Component)/Folder/(Folder-Component)/All-Folder'
import ProtectedRoute from '../Router/ProtectedRoute'

export default function SidebarPage() {
  return (
     <ProtectedRoute >
       <div>
      <All_Folder/>
      </div>
     </ProtectedRoute>
   
  )
}
