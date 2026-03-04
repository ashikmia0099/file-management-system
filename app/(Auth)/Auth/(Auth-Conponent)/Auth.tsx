"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import authimage from '@/public/Images/bannerImage.jpg'
import { Button } from '@/components/ui/button'
import { Login } from './Login'
import { Register } from './Reister'

export default function Auth() {


    const [auth, setAuth] = useState<boolean>(false)

    return (
        <div className=' pt-10 px-10 mx-auto h-full'>
            <div className=' bg-black w-full rounded-2xl    '>
                <div className=' grid grid-cols-2'>
                    <div>
                        <div className=' flex items-center justify-center gap-x-3 mt-16 mb-10'>
                            <div>
                                <Button onClick={() => setAuth(false)} className=' text-xl h-12 w-40 rounded-full cursor-pointer'>
                                    Login
                                </Button>
                            </div>
                            <div onClick={() => setAuth(true)}>
                                <Button className=' text-xl h-12 w-40 rounded-full cursor-pointer'>
                                    Register
                                </Button>
                            </div>
                        </div>
                         <div className='mt-6'>
                        {auth ?   <Register /> : <Login />}
                    </div>
                    </div>
                   
                    <div className=' rounded-2xl'>
                        <Image src={authimage} alt=' banner image' className=' h-full w-full p-10 rounded-4xl' />
                    </div>
                </div>
            </div>
        </div>
    )
}
