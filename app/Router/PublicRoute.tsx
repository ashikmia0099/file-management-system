'use client'
import { rootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface RouteGuardProps {
    children: React.ReactNode;
    publicPage?: boolean; 
}

export default function PublicRoute({ children, publicPage }: RouteGuardProps) {
    const user = useSelector((state: rootState) => state.login.user);
    const router = useRouter();
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        if (publicPage) {
            if (user) {
                if (user.role === "ADMIN") {
                    router.push("/Dashboard/Users");
                } else {
                    router.push("/Dashboard");
                }
            } else {
                setLoading(false);
            }
        } else {
            if (!user) {
                router.push("/"); 
            } else {
                setLoading(false); 
            }
        }
    }, [user, publicPage, router]);

    if (loading) return null;

    return <>{children}</>;
}


