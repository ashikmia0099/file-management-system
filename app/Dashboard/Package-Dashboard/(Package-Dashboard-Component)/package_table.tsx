'use client'
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify"

interface PackageType {
    id: string
    PackageName: string;
    MaxFolders: number;
    MaxNestingFolder: number;
    AllowedFileTypes: string[];
    MaxFileSizeMB: number;
    TotalFileLimit: number;
    FilePerFolder: number;
}

export function Package_table() {

    const [allPackages, setAllPackages] = useState<PackageType[]>([]);
    const router = useRouter()


    useEffect(() => {
        const fetchPackages = async () => {
            const auth = localStorage.getItem("auth");
            const token = auth ? JSON.parse(auth).token : null;
            if (!token) return;

            const res = await fetch("https://file-management-system-backend.vercel.app/subscription/package", {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            setAllPackages(data);
        };
        fetchPackages();
    }, []);


    // delete handler 

    const handleDelete = async (id: string) => {

        try {
            const auth = localStorage.getItem("auth");
            const token = auth ? JSON.parse(auth).token : null;
            if (!token) return toast.error("You are not authorized");

            const res = await fetch(`https://file-management-system-backend.vercel.app/subscription/package/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();

            if (!data.success) {
                toast.error("This package has child components. This package cannot be deleted.");
                return;
            }

            setAllPackages(prev => prev.filter(pkg => pkg.id !== id));
            toast.success("Package deleted successfully");

        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        }
    };


    const handleUpdate = (id: string) => {
        router.push(`/Dashboard/Package-Dashboard/update/${id}`);
    }



    return (
        <div>
            <ToastContainer />
            <div className=" px-5 ">
                <Table className=" px-5">
                    <TableHeader className=" bg-[#cfcdcd]">
                        <TableRow>
                            <TableHead className="w-12.5">Index</TableHead>
                            <TableHead>Package Name</TableHead>
                            <TableHead>Max Folder Create</TableHead>
                            <TableHead>Max Sub Folder Create</TableHead>
                            <TableHead>Allowed File Types</TableHead>
                            <TableHead>Max File Size (MB)</TableHead>
                            <TableHead>Total File Limit</TableHead>
                            <TableHead>File Per Folder</TableHead>
                            <TableHead>Update Package</TableHead>
                            <TableHead>Delete Package</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {allPackages.length > 0 ? (
                            allPackages.map((pkg, index) => (
                                <TableRow key={pkg.PackageName}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{pkg.PackageName}</TableCell>
                                    <TableCell>{pkg.MaxFolders}</TableCell>
                                    <TableCell>{pkg.MaxNestingFolder}</TableCell>
                                    <TableCell>{pkg.AllowedFileTypes.join(", ")}</TableCell>
                                    <TableCell>{pkg.MaxFileSizeMB}</TableCell>
                                    <TableCell>{pkg.TotalFileLimit}</TableCell>
                                    <TableCell>{pkg.FilePerFolder}</TableCell>
                                    <TableCell>
                                        <Button className=" cursor-pointer" onClick={() => handleUpdate(pkg.id)}>Update</Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button className=" cursor-pointer" onClick={() => handleDelete(pkg.id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center">
                                    No packages found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

