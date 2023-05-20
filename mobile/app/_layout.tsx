import { StatusBar } from 'expo-status-bar'
import { ImageBackground } from 'react-native'

import {
  useFonts,
  Roboto_400Regular as RobotoRegular,
  Roboto_700Bold as RobotoBold,
} from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold as BaiJamjureeBold } from '@expo-google-fonts/bai-jamjuree'
import * as SecureStore from 'expo-secure-store'
import BlurBG from '../assets/luz.png'
import Stripes from '../assets/stripes.svg'
import { styled } from 'nativewind'
import { SplashScreen, Stack } from 'expo-router'
import { useEffect, useState } from 'react'

const StyledStripes = styled(Stripes)

export default function Layout() {
  const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null)
  const [hasLoadedFonts] = useFonts({
    RobotoRegular,
    RobotoBold,
    BaiJamjureeBold,
  })

  useEffect(() => {
    SecureStore.getItemAsync('token').then((token) =>
      setIsAuthenticated(!!token),
    )
  }, [])

  if (!hasLoadedFonts) {
    return <SplashScreen />
  }

  return (
    <ImageBackground
      source={BlurBG}
      className="relative flex-1 bg-gray-900"
      imageStyle={{ position: 'absolute', left: '-100%' }}
    >
      <StyledStripes className="absolute left-2" />

      <Stack
        screenOptions={{
          animation: 'fade',
          headerShown: false,
          contentStyle: {
            backgroundColor: 'transparent',
          },
        }}
      >
        <Stack.Screen name="index" redirect={isAuthenticated} />
        <Stack.Screen name="memories" />
        <Stack.Screen name="new-memory" />
      </Stack>

      <StatusBar style="light" translucent />
    </ImageBackground>
  )
}
