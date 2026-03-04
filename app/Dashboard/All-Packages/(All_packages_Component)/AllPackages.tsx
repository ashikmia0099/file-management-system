
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
import { SelectdPackage } from "@/redux/features/Selected_Package/selectedPackageSlice"
import { appDispatch, rootState } from "@/redux/store"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast, ToastContainer } from "react-toastify"

interface PackageType {
    id: string,
    PackageName: string;
    MaxFolders: number;
    MaxNestingFolder: number;
    AllowedFileTypes: string[];
    MaxFileSizeMB: number;
    TotalFileLimit: number;
    FilePerFolder: number;
}

export function AllPackages() {

    const dispatch = useDispatch<appDispatch>();
    const [allPackages, setAllPackages] = useState<PackageType[]>([]);
    
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


        // handle selected package

        const handleSelectedPackage = (pkg: PackageType) =>{
            dispatch(SelectdPackage({packageId : pkg.id}))
            .unwrap()
            .then(() =>{
                toast.success(`Package ${pkg.PackageName} selected successfully`)
            })
            .catch((err) =>{
                 toast.error(`Failed to select ${err} `)
            })
        }

    return (
        <div>
            <ToastContainer />
            <div className=" px-10">
                <h2 className=" pt-10 pb-3 text-3xl font-semibold text-center border-b-2 border-gray-500 ">All Packages</h2>
            </div>
            <div className=" px-5 pt-10">
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
                            <TableHead>Select Package</TableHead>
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
                                        <Button
                                        onClick={() =>handleSelectedPackage(pkg)}
                                        className=" cursor-pointer">Select</Button>
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

