'use client'
import React, { useEffect, useState } from 'react'
import Create_Folder from './Create-Folder';
import FolderGrid from './Folder-Grid';
import { Files_table } from '../../Files/(File-Component)/Files-table';

interface FolderType {
    id: string;
    name: string;
    parentFolderId: string | null;
}


export default function All_Folder() {

    const [folders, setFolders] = useState<FolderType[]>([]);
    const [currentFolder, setCurrentFolder] = useState<FolderType | null>(null)
    const [breadcrumb, setBreadcrumb] = useState<FolderType[]>([]);

    useEffect(() => {
        const fetchPackages = async () => {
            const auth = localStorage.getItem("auth");
            if (!auth) return;
            const parsedAuth = JSON.parse(auth);
            const token = parsedAuth.token;
            const userId = parsedAuth.user.id
            // console.log("Parsed Auth:", parsedAuth);

            // console.log("all package token", token)
            if (!token) return;

            const res = await fetch(`https://file-management-system-backend.vercel.app/folder/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const data = await res.json();
            setFolders(data.data);
        };

        fetchPackages();
    }, []);

    // console.log("all folder : ", folders)


    // navigator into folder 
    const enterFolder = (folder: FolderType) => {
        setCurrentFolder(folder);
        setBreadcrumb(prev => [...prev, folder])
    }

    // navigation via breadcrumb 

    const goToBreadcrumb = (index: number) => {
        const newBreadcrumb = breadcrumb.slice(0, index + 1)
        setBreadcrumb(newBreadcrumb);
        setCurrentFolder(newBreadcrumb[newBreadcrumb.length - 1] || null)
    }

    // curent visibal folder 
    const visibleFolders = currentFolder
        ? folders.filter(f => f.parentFolderId === currentFolder.id)
        : folders.filter(f => f.parentFolderId === null);

    return (
        <div className='px-5 py-5'>
            <div className="mb-4 flex items-center gap-2">
                <button className="px-2 py-1 border rounded cursor-pointer"
                    onClick={() => { setCurrentFolder(null); setBreadcrumb([]); }}>
                    Root
                </button>
                {breadcrumb.map((folder, idx) => (
                    <span key={folder.id} className="flex items-center gap-1">
                        <span>/</span>
                        <button className="text-blue-600 underline cursor-pointer"
                            onClick={() => goToBreadcrumb(idx)}>
                            {folder.name}
                        </button>
                    </span>
                ))}
            </div>
            {/* create folder  */}
            <div>
                <Create_Folder parentFolderId={currentFolder?.id || null} setFolders={setFolders} />
            </div>
            {/* Folder grid component */}
            <FolderGrid folders={visibleFolders} onEnterFolder={enterFolder} setFolders={setFolders} />
            {/* Files  */}
            {
                currentFolder && (
                    <Files_table folderId={currentFolder.id} />
                )
            }
        </div>
    )
}
