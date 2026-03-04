'use client'

import React, { useState } from 'react'

import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel } from "@/components/ui/field"
import { useDispatch, useSelector } from 'react-redux';
import { appDispatch, rootState } from '@/redux/store';
import { fetchFolder } from '@/redux/features/Folders/folderSlice';
import { toast, ToastContainer } from 'react-toastify';
import Uploadfile from '../../Files/(File-Component)/Upload-file';



interface FolderType {
    id: string;
    name: string;
    parentFolderId: string | null;
}

interface Props {
    parentFolderId?: string | null;
    setFolders: React.Dispatch<React.SetStateAction<FolderType[]>>;
}

export default function Create_Folder({ parentFolderId = null, setFolders }: Props) {


    const dispatch = useDispatch<appDispatch>();

    const { name, loading, error } = useSelector((state: rootState) => state.folder);
    const [folderName, setFolderName] = useState("");

    // folder create handler 
    const handleCreateFolder = async () => {
        if (!folderName.trim()) return;
        dispatch(fetchFolder({
            name: folderName,
            parentFolderId
        }))
            .unwrap()
            .then((res: any) => {
                setFolders(prev => [...prev, res]);
                setFolderName("");
                toast.success(`Folder "${res.name}" created successfully`);
            })
            .catch((err: any) => {
                toast.error(`Failed to create folder: ${err}`);
            });
    }


    return (
        <div className=' py-3'>
            <ToastContainer />
            <div className=' flex gap-x-3'>
                <div>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline">New Folder</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <Field>
                                <FieldLabel htmlFor="input-field-username">Folder Name</FieldLabel>
                                <Input
                                    id="input-field-username"
                                    type="text"
                                    placeholder="Enter new folder name"
                                    value={folderName}
                                    onChange={(e) => setFolderName(e.target.value)}
                                />
                            </Field>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleCreateFolder}>Create</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
                {
                    parentFolderId && (
                        <div>
                            <Uploadfile parentFolderId={parentFolderId} />
                        </div>
                    )
                }
            </div>
        </div>
    )
}
