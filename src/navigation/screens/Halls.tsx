import { StyleSheet, View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import { Image } from 'expo-image'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'

import { DetailStackHeader } from '@/components/DetailStackHeader'
import { Colors } from '@/constants/Colors'
import { Button } from '@/components/Button'
import { useState } from 'react'

const dates = Array.from({ length: 30 }, (_, i) => {
  const d = new Date()
  d.setDate(d.getDate() + i)
  return d
})

export function Halls({ route }: { route: { params: { data: any } } }) {
  const navigation = useNavigation()
  const [selectedDate, setSelectedDate] = useState<Date>(dates[0])
  const {
    data: { movie },
  } = route.params
  const subTitle = `In Theaters ${moment(movie?.release_date).format('MMM D, YYYY')}`
  return (
    <View style={styles.mainContainer}>
      <DetailStackHeader background={Colors.light.white} title={movie?.title} subTitle={subTitle} />

      <View style={styles.contentContainer}>
        <View style={styles.datesContainer}>
          <Text style={styles.dateTitle}>Date</Text>
          <ScrollView
            horizontal={true}
            contentContainerStyle={styles.datesTags}
            showsHorizontalScrollIndicator={false}
          >
            {dates.map((date, index) => {
              const isSelected = selectedDate.getTime() === date.getTime()
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedDate(date)}
                  style={[
                    styles.dateTag,
                    {
                      backgroundColor: isSelected ? Colors.light.lightBlue : Colors.light.gray,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.dateTagTitle,
                      {
                        color: isSelected ? Colors.light.white : Colors.light.text,
                      },
                    ]}
                  >
                    {`${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>
        <View style={styles.bottomAttach}>
          <Button
            title={'Select Seats'}
            backgroundColor={Colors.light.lightBlue}
            onPress={() => {
              navigation.navigate('DetailStack', {
                screen: 'Seats',
                params: {
                  data: {
                    movie,
                  },
                },
              })
            }}
            block
          />
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
    paddingVertical: 20,
  },
  bottomAttach: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 30,
    flexDirection: 'row',
    gap: 10,
  },
  datesContainer: {
    marginTop: 120,
  },
  dateTitle: {
    fontFamily: 'PoppinsRegular',
    fontWeight: 500,
    fontSize: 16,
    color: Colors.light.text,
    paddingLeft: 20,
  },
  datesTags: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
    paddingStart: 20,
    paddingEnd: 20,
  },
  dateTag: {
    borderRadius: 10,
    backgroundColor: Colors.light.gray,
    height: 40,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateTagTitle: {
    fontFamily: 'PoppinsRegular',
    fontWeight: 500,
    fontSize: 12,
    color: Colors.light.black,
  },
})
