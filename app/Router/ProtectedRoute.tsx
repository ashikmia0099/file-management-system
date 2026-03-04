'use client'
import { rootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';


interface ProtectedRouteProps {

    children: React.ReactNode;
    role?: "ADMIN" | "USER"

}

export default function ProtectedRoute({ children, role }: ProtectedRouteProps) {

    const user = useSelector((state: rootState) => state.login.user);
    const router = useRouter();


    useEffect(() => {
        if (!user) {
            router.push('/')
        } else if (role && user.role !== role) {
            router.push('/')
        }
    }, [user, role, router])


    if(!user || (role && user.role !== role)){
        return null;
    }

    return (
        <>{children}</>
    )
}
