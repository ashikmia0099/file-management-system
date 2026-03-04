'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast, ToastContainer } from 'react-toastify';

interface Props {
    file: {
        id: string;
        name: string;
    };
    onClose: () => void;
    onRenameSuccess: (newName: string) => void;
}
interface FileType {
    id: string;
    originalFileName: string;
    uploadFileTypes: string;
    createdAt: string;
}

export default function File_Rename({ file, onClose, onRenameSuccess }: Props) {

    const [newName, setNewName] = useState(file.name)
    const [loading, setLoading] = useState(false)
    const [files, setFiles] = useState<FileType[]>([]);




// file rename handler 

    const handleRename = async () => {
        if (!newName.trim()) return toast.error("Folder name cannot be empty")
        setLoading(true)

        try {
            const auth = localStorage.getItem("auth")
            const token = auth ? JSON.parse(auth).token : null

            if (!token) throw new Error("You must login first")

            const res = await fetch(`https://file-management-system-backend.vercel.app/files/rename/${file.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ originalFileName: newName })
            })

            const result = await res.json()
            if (!res.ok) throw new Error(result.message || "Failed to rename file")

            toast.success(`Folder renamed to "${newName}"`)
            onRenameSuccess(newName)
            onClose()

        } catch (err: any) {
            toast.error(err.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='fixed inset-0 z-50 flex justify-center items-center bg-black/40'>
            <ToastContainer />
            <div className='bg-white p-5 rounded shadow-lg w-96'>
                <h2 className='text-lg font-semibold mb-3'>File Rename</h2>
                <Input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder='Enter new file name'/>
                <div className='flex justify-end gap-2 mt-4'>
                    <Button variant='outline' onClick={onClose}>Cancel</Button>
                    <Button onClick={handleRename}>Rename</Button>
                </div>
            </div>
        </div>
    )
}