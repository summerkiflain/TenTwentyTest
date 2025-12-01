import Constants from 'expo-constants'
import { StyleSheet, View, Text, ImageBackground, FlatList, TouchableOpacity } from 'react-native'
import { useCallback, useEffect, useState, useRef } from 'react'

import { SearchHeader } from '@/components/SearchHeader'
import { TMDB_API_ENDPOINT } from '@/constants/common'
import { GenresThumbs, GenreName } from '@/assets/images/genres'

export function Watch() {
  const [genres, setGenres] = useState<any[]>([])
  const [searchText, setSearchText] = useState<string>('')
  const backgroundCache = useRef<Record<string, number>>({}).current
  const genreThumbsArray = useRef(Object.values(GenresThumbs)).current

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${TMDB_API_ENDPOINT}/genre/movie/list`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Constants?.expoConfig?.extra?.tmdb?.apiKey}`,
          },
        })
        const result = await response.json()
        console.log('Fetched data:', result.genres)
        setGenres(result.genres)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    void fetchData()
  }, [])

  // console.log('@@@ GenresThumbs', GenresThumbs)
  const getGenreBackground = useCallback(
    (genreName: string | GenreName): number => {
      if (backgroundCache[genreName]) {
        return backgroundCache[genreName]
      }
      if (genreName in GenresThumbs) {
        backgroundCache[genreName] = GenresThumbs[genreName as GenreName]
        return backgroundCache[genreName]
      }
      const randomImg = genreThumbsArray[Math.floor(Math.random() * genreThumbsArray.length)]
      backgroundCache[genreName] = randomImg
      return randomImg
    },
    [genreThumbsArray, backgroundCache]
  )

  return (
    <View style={styles.mainContainer}>
      <SearchHeader searchText={searchText} setSearchText={setSearchText} />

      <View style={styles.contentContainer}>
        <FlatList
          contentContainerStyle={styles.flatListContent}
          data={genres}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => {}} activeOpacity={0.8}>
              <View style={styles.movieTile}>
                <ImageBackground
                  source={getGenreBackground(item?.name)}
                  style={{ width: '100%', height: '100%' }}
                >
                  <View style={styles.movieTitleContainer}>
                    <Text style={styles.movieTitle} numberOfLines={2}>
                      {item?.name}
                    </Text>
                  </View>
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  movieTitleContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    height: 50,
    paddingHorizontal: 10,
  },
  movieTile: {
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    width: 170,
    height: 100,
  },
  movieTitle: {
    fontFamily: 'Poppins-Regular',
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 22,
    color: '#FFFFFF',
  },
})
