import { LinearGradient } from 'expo-linear-gradient'
import moment from 'moment'
import { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  ScrollView,
  StatusBar,
  useWindowDimensions,
  Modal,
  TouchableOpacity,
} from 'react-native'
import * as ScreenOrientation from 'expo-screen-orientation'
import YoutubePlayer from 'react-native-youtube-iframe'
import { useNavigation } from '@react-navigation/native'

import { BackHeader } from '@/components/BackHeader'
import { Button } from '@/components/Button'
import { TMDB_API_ENDPOINT, TMDB_IMAGE_URL } from '@/constants/common'
import { genres } from '@/constants/genres'
import { Colors } from '@/constants/Colors'

import PlayIcon from '@/assets/svgs/playIcon.svg'
import Constants from 'expo-constants'
import { SafeAreaView } from 'react-native-safe-area-context'

export function Detail({ route }: { route: { params: { data: any } } }) {
  const {
    data: { movie },
  } = route.params
  const { width, height } = useWindowDimensions()
  const isLandscape = width > height
  const [movieDetail, setMovieDetail] = useState<any>(movie)
  const [showTrailer, setShowTrailer] = useState<string | undefined>(undefined)
  const navigation = useNavigation()

  useEffect(() => {
    const transition = navigation.addListener('transitionEnd' as never, (e: any) => {
      if (!e.data.closing) ScreenOrientation.unlockAsync()
    })

    const orientation = navigation.addListener('beforeRemove', () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
    })

    return () => {
      transition()
      orientation()
    }
  }, [navigation])

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
        const videos = await fetch(`${TMDB_API_ENDPOINT}/movie/${movie.id}/videos`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Constants?.expoConfig?.extra?.tmdb?.apiKey}`,
          },
        })
        const videosResponse = await videos.json()
        const trailers = videosResponse?.results.filter(
          (video: { type: string; site: string }) =>
            video.type === 'Trailer' && video.site === 'YouTube'
        )
        // console.log('Fetched data:', trailers)
        if (trailers?.length) {
          setMovieDetail({
            ...result,
            trailers,
          })
        }
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

      <ScrollView bounces={false} automaticallyAdjustContentInsets={false}>
        <View style={[styles.movieTile, { flexDirection: isLandscape ? 'row' : 'column' }]}>
          <View
            style={[
              styles.startSection,
              { width: isLandscape ? '50%' : '100%', height: isLandscape ? height : 'auto' },
            ]}
          >
            <ImageBackground
              source={{ uri: `${TMDB_IMAGE_URL}/original${movieDetail?.poster_path}` }}
              style={{
                width: '100%',
                height: isLandscape ? '100%' : 450,
                backgroundColor: Colors.light.white,
              }}
            >
              <LinearGradient
                colors={['#00000000', '#000000FF']}
                style={styles.movieTitleContainer}
              >
                <View style={[styles.infoContainer, { width: isLandscape ? '95%' : '80%' }]}>
                  <Text style={styles.movieTitle} numberOfLines={2}>
                    {movieDetail?.title}
                  </Text>
                  <Text style={styles.movieSubTitle} numberOfLines={1}>
                    In Theaters {moment(movieDetail?.release_date).format('MMM D, YYYY')}
                  </Text>
                  <View
                    style={[
                      styles.buttonsContainer,
                      { flexDirection: isLandscape ? 'row' : 'column' },
                    ]}
                  >
                    <Button
                      title={'Get Tickets'}
                      backgroundColor={Colors.light.lightBlue}
                      block={!isLandscape}
                      onPress={() => {
                        navigation.navigate('DetailStack', {
                          screen: 'Halls',
                          params: {
                            data: {
                              movie: movieDetail,
                            },
                          },
                        })
                      }}
                    />
                    <Button
                      title={'Watch Trailer'}
                      icon={PlayIcon}
                      block={!isLandscape}
                      onPress={() => {
                        if (movieDetail?.trailers?.length) {
                          setShowTrailer(movieDetail.trailers[0].key)
                        }
                      }}
                      disabled={!movieDetail?.trailers?.length}
                    />
                  </View>
                </View>
              </LinearGradient>
            </ImageBackground>
          </View>
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
      <Modal
        visible={!!showTrailer}
        animationType="fade"
        transparent={false}
        statusBarTranslucent={true}
      >
        <StatusBar hidden />
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={() => setShowTrailer(undefined)}
            style={styles.modalCloseButton}
          >
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
          <SafeAreaView>
            <YoutubePlayer
              height={300}
              play={true}
              videoId={showTrailer}
              onChangeState={(state: string) => {
                if (state === 'ended') setShowTrailer(undefined)
              }}
            />
          </SafeAreaView>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  flatListContent: {
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
    maxHeight: '100%',
  },
  movieTile: {
    overflow: 'hidden',
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
    flexShrink: 1,
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
  startSection: {
    width: '100%',
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000',
    justifyContent: 'center',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 80,
    right: 20,
    zIndex: 1,
  },
  closeText: {
    fontFamily: 'PoppinsRegular',
    fontWeight: 600,
    fontSize: 18,
    color: Colors.light.white,
  },
})
