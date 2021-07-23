import React from 'react'
import ActorCard from './ActorCard'
import NotFound from '../../images/not-found.png'
import { FlexGrid } from '../styled'


const ActorGrid = ({data}) => {
    return (
        <FlexGrid>
            {
                data.map(({person})=>
                <ActorCard key={person.id}
                id={person.id}
                name={person.name}
                country={person.country?person.country.name:null}
                birthdate={person.birthdate}
                deathdaye={person.deathdate}
                gender={person.gender}
                image={person.image?person.image.medium:NotFound} />)
            }
        </FlexGrid>
    )
}

export default ActorGrid
