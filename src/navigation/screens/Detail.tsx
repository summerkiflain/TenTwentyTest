import { LinearGradient } from 'expo-linear-gradient'
import moment from 'moment'
import { useState, useEffect } from 'react'
import { StyleSheet, View, Text, ImageBackground, ScrollView, StatusBar } from 'react-native'
// import { useNavigation } from '@react-navigation/native'

import { BackHeader } from '@/components/BackHeader'
import { Button } from '@/components/Button'
import { TMDB_API_ENDPOINT, TMDB_IMAGE_URL } from '@/constants/common'
import { genres } from '@/constants/genres'
import { Colors } from '@/constants/Colors'

import PlayIcon from '@/assets/svgs/playIcon.svg'
import Constants from 'expo-constants'
import * as React from 'react'

export function Detail({ route }: { route: { params: { data: any } } }) {
  const {
    data: { movie },
  } = route.params

  const [movieDetail, setMovieDetail] = useState<any>(movie)
  // const navigation = useNavigation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${TMDB_API_ENDPOINT}/movie/${movie.id}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Constants?.expoConfig?.extra?.tmdb?.apiKey}`,
          },
        })
        const result = await response.json()
        // console.log('Fetched data:', result)
        setMovieDetail(result)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    void fetchData()
  }, [movie.id])

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />
      <BackHeader background={'transparent'} label={'Watch'} />

      <View style={styles.contentContainer}>
        <ScrollView bounces={false}>
          <View style={styles.movieTile}>
            <ImageBackground
              source={{ uri: `${TMDB_IMAGE_URL}/original${movieDetail?.poster_path}` }}
              style={{
                width: '100%',
                height: 450,
                position: 'relative',
                backgroundColor: Colors.light.white,
              }}
            >
              <LinearGradient
                colors={['#00000000', '#000000FF']}
                style={styles.movieTitleContainer}
              >
                <View style={styles.infoContainer}>
                  <Text style={styles.movieTitle} numberOfLines={2}>
                    {movieDetail?.title}
                  </Text>
                  <Text style={styles.movieSubTitle} numberOfLines={1}>
                    In Theaters {moment(movieDetail?.release_date).format('MMM D, YYYY')}
                  </Text>
                  <View style={styles.buttonsContainer}>
                    <Button title={'Get Tickets'} backgroundColor={Colors.light.lightBlue} block />
                    <Button title={'Watch Trailer'} icon={PlayIcon} block />
                  </View>
                </View>
              </LinearGradient>
            </ImageBackground>
            <View style={styles.movieContent}>
              {movieDetail?.genres?.length ? (
                <>
                  <Text style={styles.heading}>Genres</Text>
                  <View style={styles.genresContainer}>
                    <View style={styles.tagsContainer}>
                      {movieDetail?.genres?.map((g: any) => {
                        const genre = genres.find((gen: any) => gen.id === g.id)
                        return genre && genre.name ? (
                          <View
                            key={genre.id}
                            style={[styles.genreTag, { backgroundColor: genre.color }]}
                          >
                            <Text style={styles.genreTagTitle}>{genre.name}</Text>
                          </View>
                        ) : null
                      })}
                    </View>
                  </View>
                  <View style={styles.separator} />
                </>
              ) : null}
              <Text style={styles.heading}>Overview</Text>
              <Text style={styles.overview}>{movieDetail?.overview}</Text>
            </View>
          </View>
        </ScrollView>
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
    justifyContent: 'flex-end',
    height: 360,
    paddingHorizontal: 20,
  },
  movieTile: {
    overflow: 'hidden',
    marginBottom: 20,
  },
  infoContainer: {
    width: '80%',
    alignSelf: 'center',
    gap: 10,
  },
  movieTitle: {
    fontFamily: 'PoppinsBold',
    fontWeight: 500,
    fontSize: 16,
    color: Colors.light.white,
    textAlign: 'center',
  },
  movieSubTitle: {
    fontFamily: 'PoppinsRegular',
    fontWeight: 600,
    fontSize: 16,
    color: Colors.light.white,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    paddingTop: 10,
    paddingBottom: 20,
    flexWrap: 'wrap',
  },
  movieContent: {
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  heading: {
    fontFamily: 'PoppinsRegular',
    fontWeight: 500,
    fontSize: 16,
    paddingVertical: 15,
  },
  overview: {
    fontFamily: 'PoppinsRegular',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 22,
    color: '#8F8F8F',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#0000001C',
  },
  genresContainer: {
    paddingBottom: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 7,
    flexWrap: 'wrap',
  },
  genreTag: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  genreTagTitle: {
    fontFamily: 'PoppinsBold',
    fontWeight: 600,
    color: Colors.light.white,
    fontSize: 12,
  },
})
