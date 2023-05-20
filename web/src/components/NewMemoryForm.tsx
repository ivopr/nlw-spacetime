'use client'

import { MediaPicker } from '@/components/MediaPicker'
import { api } from '@/lib/api'
import { Camera } from 'lucide-react'
import { FormEvent } from 'react'
import cookie from 'js-cookie'
import { useRouter } from 'next/navigation'

export function NewMemoryForm() {
  const router = useRouter()

  async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const fileToUpload = formData.get('coverURL')

    let coverUrl = ''

    if (fileToUpload) {
      const uploadFormData = new FormData()
      uploadFormData.set('file', fileToUpload)

      const uploadResponse = await api.post('/upload', uploadFormData)

      coverUrl = uploadResponse.data.fileURL
    }

    await api.post(
      '/memory',
      {
        coverUrl,
        content: formData.get('content'),
        isPublice: formData.get('isPublic'),
      },
      {
        headers: {
          Authorization: `Bearer ${cookie.get('token')}`,
        },
      },
    )

    router.push('/')
  }

  return (
    <form className="flex flex-1 flex-col gap-2" onSubmit={handleCreateMemory}>
      <div className="flex items-center gap-4">
        <label
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
          htmlFor="media"
        >
          <Camera className="h-4 w-4" />
          anexar mídia
        </label>
        <label
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
          htmlFor="isPublic"
        >
          <input
            className="h-4 w-4 rounded border-gray-400 bg-gray-400 text-purple-500 focus:ring-1 focus:ring-purple-500 focus:ring-offset-gray-900"
            id="isPublic"
            name="isPublic"
            value="true"
            type="checkbox"
          />
          tornar memória pública
        </label>
      </div>

      <MediaPicker />

      <textarea
        className="flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        spellCheck={false}
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar pra sempre."
        name="content"
        id=""
      />

      <button
        className="inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
        type="submit"
      >
        Salvar
      </button>
    </form>
  )
}
