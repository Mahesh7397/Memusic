import React, { createContext, useContext } from 'react'
import { useEffect, useState } from 'react'
import datacontroler from '../Data/datacontroler'
import { Audio } from 'expo-av';
import { Pause, Play, Resume, Playnext } from '../components/AudioControler'
import AsyncStorage from '@react-native-async-storage/async-storage'


const ListContext = createContext()
export default function ListProvider({ children }) {
  //playbackobj:null,
  //soundobj:null,
  //Currentaudio:{},
  //isPlaying:false,
  //currentaudioindex:null
  const [playbackobj, setplaybackobj] = useState(null)
  const [soundobj, setsoundobj] = useState(null)
  const [Currentaudio, setCurrentaudio] = useState({})
  const [isPlaying, setisPlaying] = useState(false)
  const [currentaudioid, setcurrentaudioid] = useState(null)
  const [Loader, setLoader] = useState(false)
  const [list, setlist] = useState([])
  const [seaudio, setseaudio] = useState(false)
  const [recentlist, setrecentlist] = useState([])
  const [recentview, setrecentview] = useState(false)
  if (!list.length) { setlist(datacontroler) }
  //console.log(list)
  const [reload, setreload] = useState(false)

  const findrecent = async () => {
    const result = await AsyncStorage.getItem('Recentlist');
    if (result === null) return setrecentview(false);

    setrecentview(true)
    setrecentlist(JSON.parse(result))
  }

  const handlePlayAudio = async (audio) => {
    // console.log(audio)
    if (soundobj === null) {
      setisPlaying(true)
      setseaudio(true)
      setCurrentaudio(audio)
      const Playback = new Audio.Sound()
      const result = await Play(Playback, audio.url)
      // console.log(result)
      const id = audio.id
      setplaybackobj(Playback)
      setcurrentaudioid(id),
        setsoundobj(result)

      //console.log(soundobj)
    }
    if (soundobj.isLoaded && soundobj.isPlaying && currentaudioid === audio.id) {
      setisPlaying(false)
      const result = await Pause(playbackobj)
      setsoundobj(result)
    }

    if (soundobj.isLoaded && !soundobj.isPlaying && currentaudioid === audio.id) {
      setisPlaying(true)
      const result = await Resume(playbackobj)
      setsoundobj(result)

    }

    if (soundobj.isLoaded && currentaudioid !== audio.id) {
      setCurrentaudio(audio)
      const result = await Playnext(playbackobj, audio.url)
      setisPlaying(true)
      const id = audio.id
      setsoundobj(result)
      setcurrentaudioid(id)


    }
  }
  const HandleSet = async (item) => {
    //console.log(item)
    handlePlayAudio(item)
    const newlist = recentlist.filter(n => n.id !== item.id)
    const data = [item, ...newlist]
    //console.log(data)
    await AsyncStorage.setItem('Recentlist', JSON.stringify(data))
    setrecentlist(data)
    setrecentview(true)
  }

  useEffect(() => {
    findrecent()
  }, [])

  return (
    <ListContext.Provider value={{ Loader, list, setLoader, reload, setreload, playbackobj, soundobj, currentaudioid, Currentaudio, isPlaying, recentview, recentlist, seaudio, HandleSet, setCurrentaudio, setcurrentaudioid, setisPlaying, setsoundobj, setplaybackobj, handlePlayAudio, setrecentview, setrecentlist }}>
      {children}
    </ListContext.Provider>
  )
}

export const useList = () => useContext(ListContext)

