import { EmptyMemories } from '@/components/EmptyMemories'
import { api } from '@/lib/api'
import { ArrowRight } from 'lucide-react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

interface Memory {
  id: string
  createdAt: string
  excerpt: string
  coverUrl: string
}

export default async function Home() {
  const isAuthenticated = cookies().has('token')

  if (!isAuthenticated) {
    return <EmptyMemories />
  }

  const token = cookies().get('token')?.value
  const response = await api.get<Memory[]>('/memory', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memories = response.data

  if (memories.length === 0) {
    return <EmptyMemories />
  }

  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map((memory) => (
        <div className="space-y-4" key={memory.id}>
          <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
            {Intl.DateTimeFormat('pt-br', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            }).format(new Date(memory.createdAt))}
          </time>
          <Image
            className="mx-auto aspect-video w-4/5 rounded-lg object-cover"
            height={280}
            width={582}
            src={memory.coverUrl}
            alt=""
          />
          <p className="text-lg leading-relaxed text-gray-100">
            {memory.excerpt}
          </p>
          <Link
            className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
            href={`/memory/${memory.id}`}
          >
            Ler mais <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ))}
    </div>
  )
}
