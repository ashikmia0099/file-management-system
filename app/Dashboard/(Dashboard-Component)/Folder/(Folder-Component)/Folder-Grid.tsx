import React, { useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaFolderOpen } from 'react-icons/fa';
import {
    Menubar,
    MenubarContent,
    MenubarGroup,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"
import Folder_Rename from './Folder-Rename';
import { toast } from 'react-toastify';


interface FolderType {
    id: string;
    name: string;
    parentFolderId: string | null;
}

interface Props {
    folders: FolderType[];
    onEnterFolder: (folder: FolderType) => void;
    setFolders: React.Dispatch<React.SetStateAction<FolderType[]>>
}

export default function FolderGrid({ folders, onEnterFolder, setFolders }: Props) {

    const [selectedFolder, setSelectedFolder] = useState<FolderType | null>(null);
    const [renameOpen, setRenameOpen] = useState(false);

    // rename folder handler 

    const handleRenameClick = (folder: FolderType) => {
        setSelectedFolder(folder);
        setRenameOpen(true);
    }

    const handleRenameSuccess = (newName: string) => {
        if (!selectedFolder) return
        setFolders(prev =>
            prev.map(f => f.id === selectedFolder.id ? { ...f, name: newName } : f)
        )
    }


    // delete folder handler 

    const handleDeleteFolder = async (folderId: string) => {
        const auth = localStorage.getItem("auth");
        if (!auth) return;
        const parsedAuth = JSON.parse(auth);
        const token = parsedAuth.token;
        // console.log("folder grid :", parsedAuth);
        // console.log("folder id", folderId)

        try {
            const res = await fetch(`https://file-management-system-backend.vercel.app/folder/delete/${folderId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setFolders(prev => prev.filter(f => f.id !== folderId));
                toast.success("Folder deleted successfully");
            } else {
                toast.error(data.message || "Failed to delete folder");
            }
        } catch (err: any) {
            toast.error(err.message || "Something went wrong");
        }
    };

    return (
        <div className='grid grid-cols-6 gap-x-3 gap-y-3 pt-3'>
            {folders.map(folder => (
                <div key={folder.id} className="cursor-pointer">
                    <div className="grid grid-cols-5 rounded-lg bg-white/60 border">
                        <div
                            className='flex items-center col-span-4'
                            onClick={() => onEnterFolder(folder)}>
                            <div className="flex items-center justify-center px-3 py-3">
                                <FaFolderOpen className="text-amber-300 text-4xl" />
                            </div>
                            <div>
                                <h4 className="text-xs">{folder.name}</h4>
                            </div>
                        </div>
                        <div className="col-span-1 px-1 py-2 flex justify-end items-center">
                            <Menubar>
                                <MenubarMenu>
                                    <MenubarTrigger asChild>
                                        <div className='cursor-pointer p-1 rounded-full hover:bg-gray-300'>
                                            <BsThreeDotsVertical className="text-black text-sm" />
                                        </div>
                                    </MenubarTrigger>
                                    <MenubarContent>
                                        <MenubarGroup>
                                            <MenubarItem onClick={() => handleRenameClick(folder)}>
                                                Rename
                                            </MenubarItem>
                                            <MenubarItem onClick={() => handleDeleteFolder(folder.id)}>Delete</MenubarItem>
                                        </MenubarGroup>
                                    </MenubarContent>
                                </MenubarMenu>
                            </Menubar>
                        </div>
                    </div>
                </div>
            ))}
            {renameOpen && selectedFolder && (
                <Folder_Rename
                    folder={selectedFolder}
                    onClose={() => setRenameOpen(false)}
                    onRenameSuccess={handleRenameSuccess} />
            )}
        </div>
    )
}