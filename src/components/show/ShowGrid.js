import React from 'react'
import ShowCard from './ShowCard'
import NotFound from '../../images/not-found.png'
import { FlexGrid } from '../styled'
import { useShows } from '../../misc/custom-hooks'


const ShowGrid = ({data}) => {
    const [starredShows,dispatchStarredShows]=useShows()


    return (
        <FlexGrid>
            {
                data.map(({show})=>{

                    const isStarred=starredShows.includes(show.id)

                    const onStarClick=()=>{
                        if(isStarred)
                        {
                            dispatchStarredShows({type:'REMOVE',showId:show.id})
                        }
                        else
                        {
                            dispatchStarredShows({type:'ADD',showId:show.id})
                        }
                    }

                    return (
                    <ShowCard key={show.id} id={show.id} name={show.name} 
                        image={show.image?show.image.medium:NotFound} 
                        summary={show.summary}
                        onStarClick={onStarClick} 
                        isStarred ={isStarred}/>)
                })
            }
            
        </FlexGrid>
                );
    
}

export default ShowGrid
