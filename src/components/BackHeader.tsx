import { View, Text, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { HeaderBackButton } from '@react-navigation/elements'

import { Colors } from '@/constants/Colors'

export function BackHeader({ searchResults }: { searchResults: any[] }) {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  return (
    <View style={[styles.mainContainer, { paddingTop: insets.top }]}>
      <View style={styles.headerBar}>
        <HeaderBackButton
          displayMode={'minimal'}
          tintColor={Colors.light.text}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
        <Text style={styles.headerTitle}>
          {`${searchResults?.length > 0 ? searchResults.length : 'No'} Results Found`}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 120,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerBar: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '500',
    fontSize: 16,
  },
  backButton: {
    transform: [{ scale: 0.8 }],
    marginLeft: -10,
  },
})
