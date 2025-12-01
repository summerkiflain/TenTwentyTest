import { View, Text, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { HeaderBackButton } from '@react-navigation/elements'

import { Colors } from '@/constants/Colors'

export function BackHeader({
  background = Colors.light.white,
  label,
}: {
  background: string
  label: string
}) {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const mainContainerStyling =
    background === 'transparent' ? styles.mainContainerAbsolute : styles.mainContainer
  return (
    <View style={[mainContainerStyling, { paddingTop: insets.top }]}>
      <View style={styles.headerBar}>
        <HeaderBackButton
          displayMode={'minimal'}
          tintColor={background === 'transparent' ? Colors.light.white : Colors.light.text}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
        <Text
          style={[
            styles.headerTitle,
            { color: background === 'transparent' ? Colors.light.white : Colors.light.text },
          ]}
        >
          {label}
        </Text>
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
  mainContainerAbsolute: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 1,
  },
  headerBar: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingVertical: 15,
  },
  headerTitle: {
    fontFamily: 'PoppinsRegular',
    fontWeight: '500',
    fontSize: 16,
  },
  backButton: {
    transform: [{ scale: 0.8 }],
    marginLeft: -10,
  },
})
