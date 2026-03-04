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
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useDispatch, useSelector } from 'react-redux';
import { appDispatch, rootState } from '@/redux/store';
import { toast } from 'react-toastify';
import { fetchFile } from '@/redux/features/Files/fileSlice';


interface Props {
  parentFolderId: string;
}

export default function Uploadfile({ parentFolderId }: Props) {


  const dispatch = useDispatch<appDispatch>();
  const { files, loading } = useSelector((state: rootState) => state.file);
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  // file post handler 
  const handleUpload = () => {
    if (!selectedFile) {
      toast.error("Please choose a file")
      return;
    }

    dispatch(fetchFile({ file: selectedFile, folderId: parentFolderId }))
      .unwrap()
      .then(() => {
        toast.success("File uploaded successfully");
        setSelectedFile(null)
      })
      .catch((err) => toast.error(err))
  }

  return (
    <div>
      <div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Upload File</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <Field>
              <FieldLabel htmlFor="input-field-username">Choose File</FieldLabel>
              <Input
                type="file"
                placeholder="Enter new folder name"
                onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}/>
            </Field>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleUpload}>Upload</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
