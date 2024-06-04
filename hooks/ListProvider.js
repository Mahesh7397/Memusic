import React, { createContext, useContext } from 'react'
import { useEffect,useState } from 'react'
import datacontroler from '../Data/datacontroler'
import { Audio } from 'expo-av';
import { Pause , Play,Resume,Playnext } from '../components/AudioControler'

const ListContext=createContext()
export default function ListProvider({children}){
    //playbackobj:null,
    //soundobj:null,
    //Currentaudio:{},
    //isPlaying:false,
    //currentaudioindex:null
    const [playbackobj,setplaybackobj]=useState(null)
    const [soundobj,setsoundobj]=useState(null)
    const [Currentaudio,setCurrentaudio]=useState({})
    const [isPlaying,setisPlaying]=useState(false)
    const [currentaudioid,setcurrentaudioid]=useState(null)
    const [Loader,setLoader]=useState(false)
    const [list,setlist]=useState([])
    if(!list.length){setlist(datacontroler)} 
    //console.log(list)
    const [reload,setreload]=useState(false)

    const handlePlayAudio=async(audio)=>{
      if(soundobj===null){
       const Playback=new Audio.Sound()
       const result=await Play(Playback,audio.url)
       console.log(result)
       const id=audio.id
       setplaybackobj(Playback)
       setCurrentaudio(audio)
       setcurrentaudioid(id),
       setsoundobj(result)
       setisPlaying(true)
       //console.log(soundobj)
      }
      if(soundobj.isLoaded && soundobj.isPlaying && currentaudioid===audio.id){
        const result=await Pause(playbackobj)  
        setsoundobj(result)
        setisPlaying(false)
      }
      
     if(soundobj.isLoaded && !soundobj.isPlaying && currentaudioid === audio.id){
       const result=await Resume(playbackobj)
       setsoundobj(result)
       setisPlaying(true)
     }
   
     if(soundobj.isLoaded && currentaudioid !== audio.id){
       const result=await Playnext(playbackobj,audio.url)
       const id=audio.id
       setsoundobj(result)
       setcurrentaudioid(id)
       setCurrentaudio(audio)
       setisPlaying(true)
     }
     }
  return (
    <ListContext.Provider value={{ Loader,list ,setLoader, reload , setreload ,playbackobj,soundobj,currentaudioid,Currentaudio,isPlaying,setCurrentaudio,setcurrentaudioid,setisPlaying,setsoundobj,setplaybackobj,handlePlayAudio}}>
        {children}
    </ListContext.Provider>
  )
}

export const useList=()=>useContext(ListContext)
