import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Colors } from '@/constants/Colors'

type ButtonProps = {
  title: string
  backgroundColor?: string
  block?: boolean
  icon?: React.ElementType
  onPress?: () => void
  disabled?: boolean
}

export function Button({
  title,
  icon: Icon,
  backgroundColor = 'transparent',
  block = false,
  onPress,
  disabled,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: disabled ? `${Colors.light.gray}3C` : backgroundColor,
          borderColor: disabled ? Colors.light.gray : Colors.light.lightBlue,
          width: block ? '100%' : 'auto',
        },
      ]}
      onPress={!disabled && typeof onPress === 'function' ? onPress : undefined}
      disabled={disabled}
    >
      {Icon && <Icon fill={Colors.light.white} width={12} height={12} />}
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.light.lightBlue,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 25,
    // minWidth: 170,
    flexDirection: 'row',
    textAlign: 'center',
    alignItems: 'center',
    gap: 10,
    minWidth: 170,
  },
  buttonText: {
    fontFamily: 'PoppinsBold',
    fontSize: 14,
    textAlign: 'center',
    color: Colors.light.white,
  },
})
