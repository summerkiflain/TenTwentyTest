import { StyleSheet, View } from 'react-native'

import { Header } from '@/components/Header'

export function MediaLibrary() {
  return (
    <View style={styles.mainContainer}>
      <Header />

      <View style={styles.contentContainer}></View>
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
