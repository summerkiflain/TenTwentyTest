import Constants from 'expo-constants'
import { StyleSheet, View, Text, ImageBackground, FlatList, TouchableOpacity } from 'react-native'
import { useCallback, useEffect, useState, useRef } from 'react'
import { Image } from 'expo-image'

import { SearchHeader } from '@/components/SearchHeader'
import { SCREEN_WIDTH, TMDB_API_ENDPOINT, TMDB_IMAGE_URL } from '@/constants/common'
import { GenresThumbs, GenreName } from '@/assets/images/genres'
import { Colors } from '@/constants/Colors'

import DotsIcon from '../../assets/svgs/dotsIcon.svg'
const NUMBER_OF_COLUMNS = 2

export function Watch() {
  const [genres, setGenres] = useState<any[]>([])
  const [searchText, setSearchText] = useState<string>('')
  const [searchResults, setSearchResults] = useState<any[]>([])
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
        // console.log('Fetched data:', result.genres)
        setGenres(result.genres)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    void fetchData()
  }, [])

  useEffect(() => {
    if (searchText === '') setSearchResults([])
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${TMDB_API_ENDPOINT}/search/multi?query=${encodeURIComponent(searchText)}`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Constants?.expoConfig?.extra?.tmdb?.apiKey}`,
            },
          }
        )
        const result = await response.json()
        // console.log('Fetched data:', result.results, searchText)
        const filteredResults = result.results.filter(
          (item: any) => ['movie', 'tv'].includes(item.media_type) && item?.poster_path
        )
        setSearchResults(filteredResults)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    void fetchData()
  }, [searchText])

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
      <SearchHeader
        searchText={searchText}
        setSearchText={setSearchText}
        genres={genres}
        searchResults={searchResults}
      />

      <View style={styles.contentContainer}>
        {searchResults?.length ? (
          <FlatList
            contentContainerStyle={styles.searchListContent}
            data={searchResults}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => {}} activeOpacity={0.8}>
                <View style={styles.movieContainer}>
                  <Image
                    source={{ uri: `${TMDB_IMAGE_URL}/w500${item?.poster_path}` }}
                    style={styles.searchImage}
                  />
                  <View style={styles.movieTitleRelative}>
                    <View style={styles.movieTitleInfo}>
                      <Text style={styles.searchMovieTitle} numberOfLines={2}>
                        {item.name ? item.name : item?.original_title}
                      </Text>
                      <Text style={styles.searchMovieGenre} numberOfLines={2}>
                        {item?.genre_ids
                          .map((id: number) => {
                            const genre = genres.find((g) => g.id === id)
                            return genre && genre.name ? genre.name : null
                          })
                          .filter((name: string | null) => name !== null)
                          .join(', ')}
                      </Text>
                    </View>
                    <View style={styles.actions}>
                      <DotsIcon width={24} height={24} fill={Colors.light.lightBlue} />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            ListHeaderComponent={
              <View style={styles.searchResultHeader}>
                <Text style={styles.searchHeaderText}>Top Results</Text>
              </View>
            }
          />
        ) : !searchText ? (
          <FlatList
            key={NUMBER_OF_COLUMNS}
            contentContainerStyle={styles.flatListContent}
            data={genres}
            keyExtractor={(item) => item.id.toString()}
            numColumns={NUMBER_OF_COLUMNS}
            columnWrapperStyle={{ gap: 20 }}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => {}} activeOpacity={0.8}>
                <View
                  style={[styles.movieTile, { width: (SCREEN_WIDTH - 60) / NUMBER_OF_COLUMNS }]}
                >
                  <ImageBackground
                    source={getGenreBackground(item?.name)}
                    style={{ width: '100%', height: '100%' }}
                  >
                    <View style={styles.movieTitleContainer}>
                      <Text style={styles.movieTitle} numberOfLines={2}>
                        {item.name}
                      </Text>
                    </View>
                  </ImageBackground>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : null}
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
    paddingVertical: 20,
    paddingHorizontal: 20,
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
    height: 100,
  },
  movieTitle: {
    fontFamily: 'Poppins-Regular',
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 20,
    color: '#FFFFFF',
  },
  searchResultHeader: {
    borderBottomWidth: 1,
    borderColor: '#0000001C',
    paddingVertical: 10,
  },
  searchHeaderText: {
    color: Colors.light.text,
    fontSize: 12,
  },
  movieContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  searchListContent: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    gap: 20,
  },
  searchImage: {
    width: 130,
    height: 100,
    borderRadius: 10,
    backgroundColor: Colors.light.white,
  },
  searchMovieTitle: {
    fontFamily: 'Poppins-Regular',
    fontWeight: 500,
    fontSize: 15,
    color: Colors.light.text,
  },
  searchMovieGenre: {
    fontFamily: 'Poppins-Regular',
    fontWeight: 500,
    fontSize: 12,
    color: Colors.light.gray,
  },
  movieTitleRelative: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: 20,
  },
  movieTitleInfo: {
    flexShrink: 1,
    gap: 5,
  },
  actions: {
    justifyContent: 'center',
  },
})
