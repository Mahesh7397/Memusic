import { AntDesign} from '@expo/vector-icons';
import React from 'react'

export default function Icon({iconname,iconcolor,iconsize}) {
  return <AntDesign name={iconname} size={iconsize} color={iconcolor}/>
}
