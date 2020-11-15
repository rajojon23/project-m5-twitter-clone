import React , {useContext } from "react";
import styled from "styled-components";

import Heart from "./Heart";
import PoppingCircle from "./PoppingCircle";

import { TweetContext } from "../TweetContext";
import { ScaleIn } from "./ScaleIn";

const PARTICLE_COLORS = ["#e53935", "#1e88e5", "#43a047", "#fdd835", "#fb8c00"];




const LikeButton = ({ size = 40, tweetID }) => {

  const {
    isLiked
  } = useContext(TweetContext);

  let isLikedByCurrentUser = false;



  isLiked.forEach((tweetIDToCompare)=>{
    if(tweetIDToCompare == tweetID ){
      isLikedByCurrentUser = true;
    }
  })

  const heartSize = size * 0.6;



  return (
    <Wrapper style={{ width: size, height: size }}>
      { (isLikedByCurrentUser) && 
        (<PoppingCircle size={size} color="#E790F7" />)
      }
      { isLikedByCurrentUser ?  //if liked by the user, scale in the heart
        <ScaleIn>
          <Heart width={heartSize} isToggled={isLikedByCurrentUser} />
        </ScaleIn>  : (  //otherwise, just display the heart 
          <Heart width={heartSize} isToggled={isLikedByCurrentUser} />
        )
      }
      
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default LikeButton;
