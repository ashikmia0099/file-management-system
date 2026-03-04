'use client'

import { useEffect, useState } from "react"
import { BsThreeDotsVertical } from "react-icons/bs";
import {
    Menubar,
    MenubarContent,
    MenubarGroup,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"
import File_Rename from "./File-Rename";
import { toast, ToastContainer } from "react-toastify";


interface FileType {
    id: string;
    originalFileName: string;
    uploadFileTypes: string;
    createdAt: string;
}

interface Props {
    folderId: string;
}

export function Files_table({ folderId }: Props) {

    const [files, setFiles] = useState<FileType[]>([]);
    const [renameFile, setRenameFile] = useState<FileType | null>(null);

    //    Rename handler
    const handleRenameSuccess = (id: string, newName: string) => {
        setFiles(prev =>
            prev.map(f => f.id === id ? { ...f, originalFileName: newName } : f)
        );
    };

    useEffect(() => {
        const fetchFile = async () => {
            const auth = localStorage.getItem("auth");
            const parsed = auth ? JSON.parse(auth) : null;
            const token = parsed?.token;

            if (!token) return;

            // console.log('This is folder id', folderId)

            const res = await fetch(`https://file-management-system-backend.vercel.app/files/${folderId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            setFiles(data.data);
        };

        fetchFile();
    }, [folderId]);

    // console.log("all posted files", files)

    // delete files hadeler

    const handleDeleteFile = async (fileId: string) => {
        const auth = localStorage.getItem("auth");
        if (!auth) return;
        const parsedAuth = JSON.parse(auth);
        const token = parsedAuth.token;
        // console.log("file parsed auth :", parsedAuth);
        // console.log("folder id", fileId)

        try {
            const res = await fetch(`https://file-management-system-backend.vercel.app/files/delete/${fileId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json();
            if (res.ok && data.success) {
                setFiles(prev => prev.filter(f => f.id !== fileId));
                toast.success("File deleted successfully");
            } else {
                toast.error(data.message || "Failed to delete File");
            }
        } catch (err: any) {
            toast.error(err.message || "Something went wrong");
        }
    };


    return (
        <div>
            <ToastContainer />
            <div className="pt-8 pb-5 border-b-2 mx-5">
                <h3 className="text-3xl font-semibold">All Files</h3>
            </div>
            <div className="px-5 pt-5">
                <table className="w-full border">
                    <thead className="bg-gray-200">
                        <tr className="">
                            <th className="p-2 text-start">Index</th>
                            <th className="text-start">Title</th>
                            <th className="text-start">File Types</th>
                            <th className="text-start">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.length > 0 ? files.map((file, index) => (
                            <tr key={file.id}>
                                <td className="p-2">{index + 1}</td>
                                <td>{file.originalFileName}</td>
                                <td>{file.uploadFileTypes}</td>
                                <td>
                                    <Menubar>
                                        <MenubarMenu>
                                            <MenubarTrigger asChild>
                                                <div className='cursor-pointer p-1 h-10 w-10 rounded-full bg-none'>
                                                    <BsThreeDotsVertical className="text-black text-sm" />
                                                </div>
                                            </MenubarTrigger>
                                            <MenubarContent>
                                                <MenubarGroup>
                                                    <MenubarItem onClick={() => setRenameFile(file)}>
                                                        Rename
                                                    </MenubarItem>
                                                    <MenubarItem onClick={() => handleDeleteFile(file.id)}>Delete</MenubarItem>
                                                    <MenubarItem>Download</MenubarItem>
                                                </MenubarGroup>
                                            </MenubarContent>
                                        </MenubarMenu>
                                    </Menubar>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={4} className="text-center p-5">No files found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {renameFile && (
                <File_Rename
                    file={{ id: renameFile.id, name: renameFile.originalFileName }}
                    onClose={() => setRenameFile(null)}
                    onRenameSuccess={(newName) => {
                        handleRenameSuccess(renameFile.id, newName);
                        setRenameFile(null);
                    }} />
            )}
        </div>
    )
}

