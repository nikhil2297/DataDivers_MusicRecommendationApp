'use client';

import MusicTitles from '@/components/music-tiles'
import SearchBar from '@/components/search-bar-with-box'
import { Box, Flex, Heading, List, Text, Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

const Recommendation = ({params}) => {
    const {id} = params;
    const [selectedTrack, setSelectedTrack] = useState({})
    const [recommendedTrack, setRecommendedTrack] = useState([])
    useEffect(() => {
        fetchTrackId();
        fetchRecommendedTrack();
    }, [])

    const fetchTrackId = () => {
        fetch('/api/local/find/' + id).then(res => res.json()).then(data => {
            console.log(" Response find : ", data);
            setSelectedTrack(data)
        })
    }

    const fetchRecommendedTrack = () => {
         fetch('/api/server/recommendations', {
             method: 'POST',
             body: id,
             
         }).then(res => res.json()).then(data => {
             console.log(" Recommendation : ", data);
             setRecommendedTrack(data)
         })
    }

    // useEffect(() => {

    //     // fetch('/api/server/recommendation', {
    //     //     method: 'POST',
    //     //     body: track_id
    //     // }).then(res => res.json()).then(data => {
    //     //     console.log(" Recommendation : ", data);
    //     //     setRecommendedTrack(data)
    //     // })
    // })

  return (  
    <Box width='100%' p={8}>
        <Box width='70%' alignItems={'center'} >
        {/* <SearchBar /> */}
        
        <Flex direction={'column'} mt={8} gap={'6'}>
            {/* 
            //TODO : Using prop pass the 
            */}
            <Heading size={'lg'}>Song '{selectedTrack.track}'</Heading>

            <Flex gap={'4'}>

            <Image 
                    maxW={100}
                    maxh={100}
                    src='/default_music.png'
             />


            <Flex direction={'column'} >
                <Text>Song Name : {selectedTrack.track}</Text>
                <Text>{selectedTrack.artist} . {selectedTrack.genre}</Text>
            </Flex>

            </Flex>
        </Flex>
        </Box>
        
        <Flex direction={'column'} mt={8} width='70%'>
            
            <Heading>You Might Also Like</Heading>
            
            <List mt={6} spacing={6} maxH={'md'} overflowY={'scroll'}>
                { recommendedTrack.map(item => <MusicTitles key={item.track_id}  track_id={item["track_id"]}
                    artist={item["artist"]}
                    track={item["track"]}
                    genre={item["genre"]}
                    pop={item["pop"]}
                    item={item}/>) }
            </List>
        </Flex>        
    </Box>
  )
}

export default Recommendation