import { Text, TouchableOpacity, View } from 'react-native'

import {
  useFonts,
  Roboto_400Regular as RobotoRegular,
  Roboto_700Bold as RobotoBold,
} from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold as BaiJamjureeBold } from '@expo-google-fonts/bai-jamjuree'

import LogoFlat from '../assets/logo.svg'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import { useEffect } from 'react'
import { api } from '../lib/api'

import * as SecureStore from 'expo-secure-store'
import { useRouter } from 'expo-router'

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/applications/1962292b6815895ae4b5',
}

export default function App() {
  const router = useRouter()
  const [hasLoadedFonts] = useFonts({
    RobotoRegular,
    RobotoBold,
    BaiJamjureeBold,
  })
  const [, response, signInWithGithub] = useAuthRequest(
    {
      clientId: '1962292b6815895ae4b5',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'spctm',
      }),
    },
    discovery,
  )

  async function handleGitHubOAuthCode(code: string) {
    const { data } = await api.post('/auth', { code })

    await SecureStore.setItemAsync('token', data.token)

    router.push('/memories')
  }

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params

      handleGitHubOAuthCode(code)
    }
  }, [response])

  if (!hasLoadedFonts) {
    return null
  }

  return (
    <View className="flex-1 items-center p-8">
      <View className="flex-1 items-center justify-center gap-6">
        <LogoFlat />
        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Sua cápsula do tempo
          </Text>
          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartile (se quiser)
            com o mundo!
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          className="rounded-full bg-green-500 px-5 py-2"
          onPress={() => signInWithGithub()}
        >
          <Text className="font-alt text-sm uppercase text-black">
            Cadastrar Lembrança
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        Feito com 💜 no NLW da Rocketseat
      </Text>
    </View>
  )
}
