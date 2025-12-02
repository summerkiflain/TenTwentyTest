import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Colors } from '@/constants/Colors'

import SearchIcon from '../assets/svgs/searchIcon.svg'
import CloseIcon from '../assets/svgs/closeIcon.svg'
import { useNavigation } from '@react-navigation/native'

export function SearchHeader({
  searchText,
  setSearchText,
  genres,
  searchResults,
}: {
  searchText: string
  setSearchText: (text: string) => void
  genres: any[]
  searchResults: any[]
}) {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  return (
    <View style={[styles.mainContainer, { paddingTop: insets.top + 10 }]}>
      <View style={styles.headerBar}>
        <View style={styles.searchBar}>
          <SearchIcon
            width={34}
            height={34}
            fill={Colors.light.text}
            style={{ marginHorizontal: 10 }}
          />
          <TextInput
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text)
            }}
            onSubmitEditing={() => {
              navigation.navigate('Search', { data: { genres, searchResults } })
            }}
            placeholder="TV shows, movies and more"
            style={styles.textInput}
            returnKeyType={'search'}
            autoCapitalize={'sentences'}
            autoCorrect={false}
          />
          <TouchableOpacity
            onPress={() => {
              setSearchText('')
            }}
          >
            <CloseIcon
              width={25}
              height={25}
              fill={searchText ? Colors.light.text : Colors.light.tabIconDefault}
              style={{ marginHorizontal: 10 }}
            />
          </TouchableOpacity>
        </View>
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
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#EFEFEF',
  },
  searchBar: {
    backgroundColor: Colors.light.background,
    width: '100%',
    height: 52,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    fontFamily: 'PoppinsRegular',
    flex: 1,
    height: 50,
  },
})
