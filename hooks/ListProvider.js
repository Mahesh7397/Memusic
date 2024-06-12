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
  const [PlaybackPosition,setPlaybackPosition]=useState(null)
  const [PlaybackDuration,setPlaybackDuration]=useState(null)
  const [Likedlistvisi,setLikedlistvisi]=useState(false)
  const [Liked,setLiked]=useState(false)
  const [Likedlist,setLikedlist]=useState([])
  if (!list.length) { setlist(datacontroler) }
  //console.log(list)
  const [reload, setreload] = useState(false)
  

  const findliked=async()=>{
    const result=await AsyncStorage.getItem('Favourite');
    if(result!==null){setLikedlist(JSON.parse(result))}
   // console.log(result)
  }
  //console.log(Likedlist)
  const handleLikelist=async(item)=>{
    console.log('pass')
    const newlist = Likedlist.filter(n => n.id === item.id)
    //console.log(newlist.length)
    if(newlist.length){
    const liklit=Likedlist.filter(n => n.id !== item.id)
    const data = [...liklit]
   // console.log('one')
    await AsyncStorage.setItem('Favourite', JSON.stringify(data))
    setLikedlist(data)
    }else{
    const data = [item, ...Likedlist]
    //console.log('two')
    await AsyncStorage.setItem('Favourite', JSON.stringify(data))
    setLikedlist(data)}
  }

  //console.log(playbackobj)
  const findrecent = async () => {
    const result = await AsyncStorage.getItem('Recentlist');
    if (result === null) return setrecentview(false);

    setrecentview(true)
    setrecentlist(JSON.parse(result))
  }

   const onPlaybackstatusupdate=(playbackstatus)=>{
       if( playbackstatus.isPlaying){
        setPlaybackPosition(playbackstatus.positionMillis)
        setPlaybackDuration(playbackstatus.durationMillis)
       }
   }

  const handlePlayAudio = async (audio) => {
    // console.log(audio)
    //console.log('passed')
    if (soundobj === null) {
      setisPlaying(true)
      setseaudio(true)
      setCurrentaudio(audio)
      const Playback = new Audio.Sound()
      const result = await Play(Playback, audio.url)
      //console.log(result)
      const id = audio.id
      setplaybackobj(Playback)
      setcurrentaudioid(id)
      setsoundobj(result)
      return Playback.setOnPlaybackStatusUpdate(onPlaybackstatusupdate)
    }
    if (soundobj.isLoaded &&  soundobj.isPlaying && currentaudioid === audio.id) {
      //console.log('passed')
      setisPlaying(false)
      const result = await Pause(playbackobj)
      setsoundobj(result)
    }

    if ( soundobj.isLoaded && !soundobj.isPlaying && currentaudioid === audio.id) {
      setisPlaying(true)
      const result = await Resume(playbackobj)
      //console.log(result)
      setsoundobj(result)

    }

    if (currentaudioid !== audio.id) {
      setisPlaying(false)
      setCurrentaudio(audio)
      const result = await Playnext(playbackobj, audio.url)
      setisPlaying(true)
      //console.log(result)
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
    findliked()
    //AsyncStorage.removeItem('Favourite')
  }, [])

  return (
    <ListContext.Provider value={{ Loader, list, setLoader, reload, setreload, playbackobj, soundobj, currentaudioid, Currentaudio, isPlaying, recentview, recentlist, seaudio,Likedlist, 
    Likedlistvisi,setLikedlistvisi,HandleSet, setCurrentaudio, setcurrentaudioid, setisPlaying, setsoundobj, setplaybackobj, handlePlayAudio, setrecentview, setrecentlist, PlaybackPosition,PlaybackDuration,handleLikelist}}>
      {children}
    </ListContext.Provider>
  )
}

export const useList = () => useContext(ListContext)

