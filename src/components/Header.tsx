import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRoute, useNavigation } from '@react-navigation/native'

import SearchIcon from '../assets/svgs/searchIcon.svg'
import { Colors } from '@/constants/Colors'

export function Header() {
  const insets = useSafeAreaInsets()
  const route = useRoute()
  const navigation = useNavigation()
  return (
    <View style={[styles.mainContainer, { paddingTop: insets.top }]}>
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>{route.name}</Text>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('HomeTabs', {
              screen: 'Watch',
            })
          }
        >
          <SearchIcon width={34} height={34} fill={Colors.light.text} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.light.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingVertical: 15,
  },
  headerTitle: {
    fontFamily: 'PoppinsRegular',
    fontWeight: '500',
    fontSize: 16,
  },
})
