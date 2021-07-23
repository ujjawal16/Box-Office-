import React,{useState,useEffect} from 'react'
import MainPageLayout from '../components/MainPageLayout'
import ShowGrid from '../components/show/ShowGrid';
import {apiGet} from '../misc/config'
import { useShows } from '../misc/custom-hooks';

const Starred = () => {


    const [starred]=useShows();

    const [shows,setShows]=useState(null)
    const [isLoading,setIsLoading]=useState(true)
    const [isError,setIsError]=useState(null)

    useEffect(() => {
        if(starred&&starred.length>0)
        {
            const promises=starred.map(showId=>apiGet(`/shows/${showId}`))

            Promise.all(promises)
            .then(apiData=>apiData.map(show=>({show})))
            .then(results=>{
                console.log(results)
                setShows(results)
                setIsLoading(false)
            })
            .catch(error=>{
                setIsError(error.message)
                setIsLoading(false)
            })
        }
        else{
            setIsLoading(false)
        }
    }, [starred])

    return (
        <MainPageLayout>
            {isLoading&&<div>Shows are still loading</div>}
            {isError&&<div>Error occurred:{isError}</div>}
            {!isLoading &&!shows &&<div>No Shows starred!</div>}
            {!isLoading &&!isError && shows && <ShowGrid data={shows} />}
        </MainPageLayout>
    )
}

export default Starred
