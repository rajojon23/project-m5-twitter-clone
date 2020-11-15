import React , {useContext, useState, useEffect} from "react";

import TweetActions from "./TweetActions";
import TweetHeader from "./TweetHeader";
import TweetUserInput from "./TweetUserInput";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Loading from "./assets/catspin.gif";

import { CurrentUserContext } from "./CurrentUserContext";

import { FiBell, FiBookmark } from "react-icons/fi";
import { BiHomeAlt } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { AiOutlineRetweet } from "react-icons/ai";

const Homefeed = () => {

  const {
    currentUser, 
    status, 
    currentUserHomeFeed,
    homeFeedStatus,
    tweetArray,
    setTweetArray
  } = useContext(CurrentUserContext);



     
  let tweetArr= [];


  if(homeFeedStatus == "idle"){
    
    //we need this to order the tweets according to the tweetIds property 
    currentUserHomeFeed["tweetIds"].forEach((tweetID) =>{
      //add the matching tweet to the array that's going to contain the tweets objects ordered 
      tweetArr.push(Object.values(currentUserHomeFeed["tweetsById"]).find( tweet => tweet.id == tweetID));
    });

    console.log("set Tweet Array");
    // setTweetArray(tweetArr);
    
  }

  useEffect(() => {

    // setTweetArray(tweetArr);

  }, [tweetArr])


  console.log("Homefeed rendered");
  return (

    
    <Wrappera  style={{fontFamily : "'Roboto', sans-serif"}}>
      <TweetUserInput></TweetUserInput>
      { homeFeedStatus == "idle" ? (

        tweetArr.map((tweet) => (
            <TweetContainer tweet = {tweet} setTweetArray={setTweetArray} tweetArray={tweetArray}>
            </TweetContainer>
          )
        )) : (
            <img src={Loading} style={{width: 30, height :30, margin: "0 auto", marginTop: 30}}/>
        )}
      </Wrappera>

    
  )


};

const TweetContainer = ({tweet}) => {
  const history = useHistory();
  let id = tweet.id;
  console.log("tweetContainer rendered");
  
    const handleOpenTweetDetails = (ev) =>{

      console.log("tweeter details open clicked");

      

          history.push({
            pathname: `/tweet/${id}`,
            state: { tweetID: id }
          });
      
    }


 return (
    <TweetWrapper onClick={(ev) => handleOpenTweetDetails(ev)} aria-label="View Tweet" tabIndex="0">
      { tweet.hasOwnProperty('retweetFrom') && (//check if this is a retweeted tweet

      <div  className="retweet"><AiOutlineRetweet />{tweet.retweetFrom.displayName} Remeowed</div>


      )}
      <TweetHeader tweet = {tweet}>
      </TweetHeader>
      <TweetContent>
        {tweet.status}

        { tweet.media.length > 0 && (

          
          
          <img src={tweet.media[0].url} /> //very raw displaying of the media tweets, will come back to improve it if I have time
          
        )}

      </TweetContent>
        {/* <div>isLiked? {`${tweet.isLiked}`}</div> */}
      <TweetActions isLiked={tweet.isLiked}  tweetID={tweet.id}></TweetActions>
      <Divider />

    </TweetWrapper>

 );




};



const Wrappera = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .retweet{
    margin-top: 10px;
    font-size: 13px;
    color: lightslategrey;

    svg{
      transform: scale(1.5);
      margin-right: 10px;
      margin-left: 25px;
    }

  }
`;

const TweetContent = styled.div`
font-size: 18px;
padding: 16px 0;
margin-left: 64px;
margin-top: -35px;

  img{
    width: 100%;
    margin-top: 20px;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: rgb(230, 236, 240);
`;

const TweetWrapper = styled.div`
  cursor: pointer;
`;

const TweetInput = styled.div`
  display: flex;
  flex-direction: column;

  img{
    width: 30px;
    
  }

`;



export default Homefeed;