import React, {useContext} from 'react';
import ReactDOM from 'react-dom';
import TweetActionIcon from "./TweetActionIcon";
import Action from "./Action";
import styled from "styled-components";
import { TweetContext } from "./TweetContext";
import LikeButton from "./LikeButton";


const TweetActions = (props) => {

    //VARIABLES TO BE PROVIDED BY CONTEXT
    let isLiked = props.isLiked;
    let tweetID = props.tweetID;



    const {
      handleToggleLike
    } = useContext(TweetContext);

    const isRetweetedByCurrentUser = false;


    const handleToggleDummy = (ev) =>{//dummy toggle, for share, retweet, and reply actions 
      ev.preventDefault();//we need this and stoppropagation to prevent the event handleOpenTweetDetails() in the Homefeed.js component from firing
      ev.stopPropagation();
      console.log("toggle dummy");
      
    }


    return(
        <Wrapper>
        <Action  onClick={(ev) => handleToggleDummy(ev)} color="rgb(27, 149, 224)" size={40}>
          <TweetActionIcon kind="reply" />
        </Action>
        <Action  onClick={(ev) => handleToggleDummy(ev)} color="rgb(23, 191, 99)" size={40}>
          <TweetActionIcon
            kind="retweet"
            color={isRetweetedByCurrentUser ? "rgb(23, 191, 99)" : undefined}
          />
        </Action>
        {/* handleToggledLike is located handled by TweetContext */}
        <Action onClick={(ev) => handleToggleLike(ev, tweetID)} color="rgb(224, 36, 94)" size={40}>
          <LikeButton isLiked={isLiked} tweetID={tweetID}/>
          {/* <div>Like</div> */}
        </Action>
        <Action  onClick={(ev) => handleToggleDummy(ev)} color="rgb(27, 149, 224)" size={40}>
          <TweetActionIcon kind="share" />
        </Action>
      </Wrapper>        
    );
};

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  margin-bottom: 10px;
`;

export default TweetActions;
