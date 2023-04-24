import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone"
import { useIndexedDB } from "react-indexed-db";

export function Dropzone() {

  const [files, setFiles] = useState([] as (File & { preview: string })[])
  console.log(files[0])
  const { add, getAll, clear } = useIndexedDB('previews')

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => add({ preview: file }).then(
      id => console.log('ID generated', id)
    ))

    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })))
  }, [files])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const thumbs = files.map(file => (
    <div key={file.name}>
      <img
        src={file.preview}
        onLoad={() => URL.revokeObjectURL(file.preview)}
      />
    </div>
  ))

  useEffect(() => {
    getAll().then(response => {
      console.log(response)
      setFiles(response.map(preview => {
        console.log(preview.preview)
        return Object.assign(preview.preview, {
          preview: URL.createObjectURL(preview.preview)
        })
      }))
    })

  }, [])

  return (
    <section>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        }
      </div>
      <aside>{thumbs}</aside>
    </section>
  )
}


