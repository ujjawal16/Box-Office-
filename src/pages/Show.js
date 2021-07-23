/* eslint-disable no-underscore-dangle */

import React from 'react';
import { useParams } from 'react-router';
import Cast from '../components/show/Cast';
import Seasons from '../components/show/Seasons';
import Details from '../components/show/Details';
import ShowMainData from '../components/show/ShowMainData';

import { InfoBlock, ShowPageWrapper } from './Show.styled';
import { useShow } from '../misc/custom-hooks';






const Show = () => {
    const {id}=useParams()

    const {show,isLoading,error}=useShow(id)

    console.log(show);
    if(isLoading)
    {
        return <div>Data is being loaded</div>
    }
    if(error)
    {
        return <div>Error :{error}</div>
    }
    return (
    <ShowPageWrapper>
        <ShowMainData image={show.show.image} name={show.show.name}
                      rating={show.show.rating} summary={show.show.summary}
                      tags={show.show.genres} />
        
        <InfoBlock>
            <h2>Details</h2>
            <Details status={show.show.status} network={show.show.network} premiered={show.show.premiered} />
        </InfoBlock>
        <InfoBlock>
            <h2>Seasons</h2>
            <Seasons seasons={show.show._embedded.seasons} />
        </InfoBlock>
        <InfoBlock>
            <h2>Cast</h2>
            <Cast cast={show.show._embedded.cast} />
        </InfoBlock>
       
    </ShowPageWrapper> 
    )
}

export default Show
