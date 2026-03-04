'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react";


interface SelectedPackageData {
  PackageName: string;
  MaxFolders: number;
  MaxNestingFolder: number;
  AllowedFileTypes: string[];
  MaxFileSizeMB: number;
  TotalFileLimit: number;
  FilePerFolder: number;
}


export function Seleted_Package() {

  const [allPackages, setAllPackages] = useState<SelectedPackageData[]>([]);

  useEffect(() => {
    const fetchPackages = async () => {
      const auth = localStorage.getItem("auth");
      if (!auth) return;
      const parsedAuth = JSON.parse(auth);
      const token = parsedAuth.token;
      const userId = parsedAuth.user.id
      console.log("Parsed Auth:", parsedAuth);

      console.log("all package token", token)
      if (!token) return;

      const res = await fetch(`https://file-management-system-backend.vercel.app/selected/package/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();
      setAllPackages(data.data);
    };

    fetchPackages();
  }, []);

  console.log("all packages : ", allPackages)



  return (
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
          <TableHead>Package Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allPackages.map((pkg: any, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{pkg.package?.PackageName}</TableCell>
            <TableCell>{pkg.package?.MaxFolders}</TableCell>
            <TableCell>{pkg.package?.MaxNestingFolder}</TableCell>
            <TableCell>{pkg.package?.AllowedFileTypes?.join(", ")}</TableCell>
            <TableCell>{pkg.package?.MaxFileSizeMB}</TableCell>
            <TableCell>{pkg.package?.TotalFileLimit}</TableCell>
            <TableCell>{pkg.package?.FilePerFolder}</TableCell>
            <TableCell>{pkg?.isActive ? "True" : "False"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
