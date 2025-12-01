import { StyleSheet, View, Text } from 'react-native'

import { Header } from '@/components/Header'

export function MediaLibrary() {
  return (
    <View style={styles.mainContainer}>
      <Header />

      <View style={styles.contentContainer}>
        <Text>Nothing here yet.</Text>
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
    padding: 20,
  },
})
