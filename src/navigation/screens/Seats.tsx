import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import moment from 'moment/moment'

import { BackHeader } from '@/components/BackHeader'
import { Colors } from '@/constants/Colors'
import { DetailStackHeader } from '@/components/DetailStackHeader'
import { Button } from '@/components/Button'
import { useNavigation } from '@react-navigation/native'

export function Seats({ route }: { route: { params: { data: any } } }) {
  const navigation = useNavigation()
  const {
    data: { movie },
  } = route.params
  const subTitle = `${moment(movie?.release_date).format('MMM D, YYYY')} | 12:30 Hall 1`
  return (
    <View style={styles.mainContainer}>
      <DetailStackHeader background={Colors.light.white} title={movie?.title} subTitle={subTitle} />

      <View style={styles.contentContainer}>
        <View style={styles.bottomAttach}>
          <View style={styles.totalPriceContainer}>
            <Text style={styles.totalPriceLabel}>Total Price</Text>
            <Text style={styles.totalPrice}>$ 50</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Button
              title={'Proceed To Pay'}
              backgroundColor={Colors.light.lightBlue}
              onPress={() => {}}
              block={true}
            />
          </View>
        </View>
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
  bottomAttach: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 30,
    flexDirection: 'row',
    gap: 10,
  },
  totalPriceContainer: {
    backgroundColor: Colors.light.gray,
    // paddingVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
    height: 50,
    justifyContent: 'center',
    textAlign: 'left',
  },
  totalPriceLabel: {
    fontFamily: 'PoppinsRegular',
    fontWeight: 400,
    fontSize: 10,
    lineHeight: 14,
  },
  totalPrice: {
    fontFamily: 'PoppinsRegular',
    fontWeight: 600,
    fontSize: 15,
    lineHeight: 18,
  },
})
