import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, View, Text, ImageBackground, FlatList, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'

import { Header } from '@/components/Header'

export function Dashboard() {
  const [upcomingMovies, setUpcomingMovies] = useState<any[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/movie/upcoming', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Constants?.expoConfig?.extra?.tmdb?.apiKey}`,
          },
        })
        const result = await response.json()
        // console.log('Fetched data:', result.results)
        setUpcomingMovies(result.results)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    void fetchData()
  }, [])

  return (
    <View style={styles.mainContainer}>
      <Header />

      <View style={styles.contentContainer}>
        <FlatList
          contentContainerStyle={styles.flatListContent}
          data={upcomingMovies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => {}} activeOpacity={0.8}>
              <View style={styles.movieTile}>
                <ImageBackground
                  source={{ uri: `https://image.tmdb.org/t/p/w500${item?.poster_path}` }}
                  style={{ width: '100%', height: 180, position: 'relative' }}
                >
                  <LinearGradient
                    colors={['#00000000', '#000000FF']}
                    style={styles.movieTitleContainer}
                  >
                    <Text style={styles.movieTitle} numberOfLines={2}>
                      {item?.title}
                    </Text>
                  </LinearGradient>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          )}
        />
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
    borderRadius: 10,
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
