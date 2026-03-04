import React from 'react'
import Sidebar from './Sidebar/Sidebar'

export default function Dashboard_layout({ children }: { children: React.ReactNode }) {
    return (
        <div className=' grid grid-cols-12 max-w-399 mx-auto bg-[#F8FAFD] h-100vh'>
            <div className=' col-span-2 border-r grid grid-rows-12 h-100vh'>
                <div className='row-span-11 overflow-y-auto h-80'>
                    <Sidebar></Sidebar>
                </div>
            </div>
            <div className=' col-span-10 h-100vh overflow-y-auto'>
                <main>
                    {children}
                </main>
            </div>
        </div>
    )
}
