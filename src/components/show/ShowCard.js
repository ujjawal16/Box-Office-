import React from 'react'
import {Link} from 'react-router-dom'
import { Star } from '../styled';

import { StyledShowCard } from './ShowCard.Styled';

const ShowCard = ({ id, image, name, summary, onStarClick ,isStarred}) => {
    const summaryAsText = summary
      ? `${summary.split(' ').slice(0, 10).join(' ').replace(/<.+?>/g, "")}...`
      : 'No description';
  
    return (
      <StyledShowCard>
        <div className="img-wrapper">
          <img src={image} alt="show" />
        </div>
  
        <h1>{name}</h1>
  
        <p>{summaryAsText}</p>
  
        <div className="btns">
          <Link to={`/shows/${id}`}>Read more</Link>
          <button onClick={onStarClick} type="button"> <Star active={isStarred} /></button>
        </div>
      </StyledShowCard>
    );
  };
  

export default ShowCard