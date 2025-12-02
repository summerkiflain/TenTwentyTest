import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import { useNavigation } from '@react-navigation/native'

import { BackHeader } from '@/components/BackHeader'
import { TMDB_IMAGE_URL } from '@/constants/common'
import { Colors } from '@/constants/Colors'

import DotsIcon from '../../assets/svgs/dotsIcon.svg'

export function Search({ route }: { route: { params: { data: any } } }) {
  const navigation = useNavigation()
  const {
    data: { searchResults, genres },
  } = route.params
  const label = `${searchResults?.length > 0 ? searchResults.length : 'No'} Results Found`
  return (
    <View style={styles.mainContainer}>
      <BackHeader background={Colors.light.white} label={label} />

      <View style={styles.contentContainer}>
        {searchResults?.length ? (
          <FlatList
            contentContainerStyle={styles.searchListContent}
            data={searchResults}
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
                            const genre = genres.find((g: any) => g.id === id)
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
    width: 170,
    height: 100,
  },
  movieTitle: {
    fontFamily: 'PoppinsRegular',
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 20,
    color: Colors.light.white,
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
    fontFamily: 'PoppinsRegular',
    fontWeight: 500,
    fontSize: 15,
    color: Colors.light.text,
  },
  searchMovieGenre: {
    fontFamily: 'PoppinsRegular',
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
