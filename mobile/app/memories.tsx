import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from '@expo/vector-icons/Feather'
import { Link, useFocusEffect, useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'

import NLWLogo from '../assets/logo.svg'
import { memo, useState } from 'react'
import { api } from '../lib/api'
import { FlatList } from 'react-native-gesture-handler'

interface Memory {
  id: string
  coverUrl: string
  excerpt: string
  createdAt: string
}

export default function Memories() {
  const [memories, setMemories] = useState<Memory[]>()
  const { bottom, top } = useSafeAreaInsets()
  const router = useRouter()

  async function loadMemories() {
    const token = await SecureStore.getItemAsync('token')

    const response = await api.get<Memory[]>('/memory', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.data) {
      setMemories(
        response.data.sort((a, b) =>
          new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime()
            ? -1
            : 0,
        ),
      )
    }
  }

  useFocusEffect(() => {
    loadMemories()
  })

  async function signOut() {
    await SecureStore.deleteItemAsync('token')

    router.push('/')
  }

  const MemoryComponent = ({ memory }: { memory: Memory }) => {
    return (
      <View className="space-y-4">
        <View className="-ml-8 flex-row items-center gap-2">
          <View className="h-px w-5 bg-gray-50" />
          <Text className="font-body text-sm text-gray-100">
            {Intl.DateTimeFormat('pt-br', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            }).format(new Date(memory.createdAt))}
          </Text>
        </View>
        <View className="space-y-4 px-8">
          {memory.coverUrl ? (
            <Image
              source={{ uri: memory.coverUrl }}
              className="aspect-video w-full rounded-lg"
              alt=""
            />
          ) : null}
          <Text className="font-body text-base leading-relaxed text-gray-100">
            {memory.excerpt}
          </Text>
          <Link asChild href={`/memories/id`}>
            <TouchableOpacity className="flex-row items-center gap-2">
              <Text className="font-body text-sm text-gray-200">Ler mais</Text>
              <Icon name="arrow-right" size={16} color="#9e9ea0" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    )
  }

  const MemoizedMemoryComponent = memo(MemoryComponent)

  return (
    <View
      className="flex-1"
      style={{
        paddingBottom: bottom,
        paddingTop: top,
      }}
    >
      <View className="mt-4 flex-row items-center justify-between px-8">
        <NLWLogo />

        <View className="flex-row gap-2">
          <TouchableOpacity
            className="h-10 w-10 items-center justify-center rounded-full bg-red-500"
            onPress={signOut}
          >
            <Icon color="#000" name="log-out" size={16} />
          </TouchableOpacity>
          <Link asChild href="/new-memory">
            <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-green-500">
              <Icon color="#000" name="plus" size={16} />
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <FlatList
        fadingEdgeLength={120}
        contentContainerStyle={{
          paddingBottom: 20,
          paddingTop: top,
        }}
        ItemSeparatorComponent={() => <View className="h-10" />}
        data={memories}
        renderItem={({ item }) => <MemoizedMemoryComponent memory={item} />}
      />
    </View>
  )
}
