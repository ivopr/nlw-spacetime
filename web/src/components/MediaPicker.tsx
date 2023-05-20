'use client'

import { ChangeEvent, useState } from 'react'

export function MediaPicker() {
  const [preview, setPreview] = useState<null | string>(null)

  function onMediaSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) {
      return
    }

    const previewURL = URL.createObjectURL(files[0])

    setPreview(previewURL)
  }

  return (
    <>
      <input
        onChange={onMediaSelected}
        type="file"
        id="media"
        name="coverURL"
        accept="image/*"
        className="invisible h-0 w-0"
      />

      {preview ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt=""
          className="mx-auto aspect-video w-4/5 rounded-lg object-cover"
          src={preview}
        />
      ) : null}
    </>
  )
}
