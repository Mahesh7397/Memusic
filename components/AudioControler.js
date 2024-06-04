export const Play=async(playback,uri)=>{
    try {
        return await playback.loadAsync({uri},{shouldPlay:true});
    } catch (error) {
        console.log('error inside play method',error.message)
    }
};

// pause audio


export const Pause=async(playback)=>{
    try {
        return await playback.setStatusAsync({shouldPlay:false});
    } catch (error) {
        console.log('error inside Pause method',error.message)
    }
};

// resume audio

export const Resume=async(playback)=>{
    try {
        return await playback.playAsync();
    } catch (error) {
        console.log('error inside Resume method',error.message)
    }
};

// select another audio

export const Playnext=async(playbackobj,uri)=>{
   try {
     await playbackobj.stopAsync()
     await playbackobj.unloadAsync();
     return await Play(playbackobj,uri);
   } catch (error) {
    console.log('error inside Playnext method',error.message)
   }
}