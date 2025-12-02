import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, View, Text, ImageBackground, FlatList, TouchableOpacity } from 'react-native'
import { useEffect, useState, useRef } from 'react'
import { useNavigation, useScrollToTop } from '@react-navigation/native'

import { Header } from '@/components/Header'
import { TMDB_API_ENDPOINT, TMDB_IMAGE_URL } from '@/constants/common'
import { Colors } from '@/constants/Colors'

export function Dashboard() {
  const scrollRef = useRef<FlatList>(null)
  const [upcomingMovies, setUpcomingMovies] = useState<any[]>([])
  const navigation = useNavigation()

  useScrollToTop(scrollRef)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${TMDB_API_ENDPOINT}/movie/upcoming`, {
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
          ref={scrollRef}
          contentContainerStyle={styles.flatListContent}
          data={upcomingMovies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('DetailStack', {
                  screen: 'Detail',
                  params: {
                    data: {
                      movie: item,
                    },
                  },
                })
              }
              activeOpacity={0.8}
            >
              <View style={styles.movieTile}>
                <ImageBackground
                  source={{ uri: `${TMDB_IMAGE_URL}/w500${item?.backdrop_path}` }}
                  style={{
                    width: '100%',
                    height: 180,
                    backgroundColor: Colors.light.white,
                  }}
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
    fontFamily: 'PoppinsRegular',
    fontWeight: 500,
    fontSize: 18,
    lineHeight: 22,
    color: Colors.light.white,
  },
})
