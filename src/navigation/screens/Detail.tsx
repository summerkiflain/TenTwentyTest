import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, Animated } from 'react-native'
import { useEffect, useState } from 'react'
// import { useNavigation } from '@react-navigation/native'

import { Header } from '@/components/Header'
import { TMDB_API_ENDPOINT, TMDB_IMAGE_URL } from '@/constants/common'
import ScrollView = Animated.ScrollView

import { BackHeader } from '@/components/BackHeader'

export function Detail({ route }: { route: { params: { data: any } } }) {
  const {
    data: { game },
  } = route.params
  // const navigation = useNavigation()

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`${TMDB_API_ENDPOINT}/movie/upcoming`, {
  //         method: 'GET',
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${Constants?.expoConfig?.extra?.tmdb?.apiKey}`,
  //         },
  //       })
  //       const result = await response.json()
  //       // console.log('Fetched data:', result.results)
  //       setUpcomingMovies(result.results)
  //     } catch (error) {
  //       console.error('Error fetching data:', error)
  //     }
  //   }
  //   void fetchData()
  // }, [])

  return (
    <View style={styles.mainContainer}>
      <BackHeader searchResults={[]} background={'transparent'} />

      <View style={styles.contentContainer}>
        <View style={styles.movieTile}>
          <ImageBackground
            source={{ uri: `${TMDB_IMAGE_URL}/original${game?.poster_path}` }}
            style={{
              width: '100%',
              height: 450,
              position: 'relative',
              backgroundColor: '#ffffff',
            }}
          >
            <LinearGradient colors={['#00000000', '#000000FF']} style={styles.movieTitleContainer}>
              <Text style={styles.movieTitle} numberOfLines={2}>
                {game?.title}
              </Text>
            </LinearGradient>
          </ImageBackground>
        </View>
        <ScrollView></ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  flatListContent: {
    // flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  movieTitleContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    height: 70,
    paddingHorizontal: 20,
  },
  movieTile: {
    overflow: 'hidden',
    marginBottom: 20,
  },
  movieTitle: {
    fontFamily: 'Poppins-Regular',
    fontWeight: 500,
    fontSize: 18,
    lineHeight: 22,
    color: '#FFFFFF',
  },
})
