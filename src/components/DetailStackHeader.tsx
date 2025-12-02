import { View, Text, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { HeaderBackButton } from '@react-navigation/elements'

import { Colors } from '@/constants/Colors'

export function DetailStackHeader({
  background = Colors.light.white,
  label,
  title,
  subTitle,
}: {
  background: string
  label?: string
  title?: string
  subTitle?: string
}) {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const mainContainerStyling =
    background === 'transparent' ? styles.mainContainerAbsolute : styles.mainContainer
  return (
    <View style={[mainContainerStyling, { paddingTop: insets.top }]}>
      <View style={styles.headerBar}>
        <View style={styles.leftSection}>
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
        <View style={styles.headerTitleContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.subTitleText}>{subTitle}</Text>
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
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#EFEFEF',
  },
  headerTitleContainer: {
    alignSelf: 'center',
    gap: 5,
  },
  titleText: {
    textAlign: 'center',
    fontFamily: 'PoppinsRegular',
    fontWeight: 600,
    fontSize: 16,
    color: Colors.light.text,
  },
  subTitleText: {
    textAlign: 'center',
    fontFamily: 'PoppinsRegular',
    fontWeight: 600,
    fontSize: 12,
    color: Colors.light.lightBlue,
  },
  headerTitle: {
    fontFamily: 'PoppinsRegular',
    fontWeight: '500',
    fontSize: 16,
  },
  leftSection: {
    position: 'absolute',
    left: 10,
    top: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    transform: [{ scale: 0.8 }],
  },
})
