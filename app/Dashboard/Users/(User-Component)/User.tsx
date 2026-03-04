'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"


interface User {
  id : string
  name : string,
  email : string,
  role :string
}

export function User() {


  const [users, setUsers] = useState<User[]>([])

  useEffect(()=>{
    fetch("https://file-management-system-backend.vercel.app/auth/users")
    .then((res) => res.json())
    .then((data) =>{
      setUsers(data.data)
    })
  },[])

  console.log("This is user all data", users)

  return (
    <Table className=" px-5">
     
      <TableHeader className=" bg-[#cfcdcd]">
        <TableRow className=" grid-cols-12">
          <TableHead className=" col-span-1">Index</TableHead>
          <TableHead className=" col-span-4">User Name</TableHead>
          <TableHead className=" col-span-5">User Email </TableHead>
          <TableHead className=" col-span-2 text-end px-3">User Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((data, index) => (
          <TableRow key={data.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{data.name}</TableCell>
            <TableCell>{data.email}</TableCell>
            <TableCell className="text-right px-3">{data.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
