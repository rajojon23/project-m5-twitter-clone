import React, {useState, useEffect, useContext} from "react";

import { CurrentUserContext } from "./CurrentUserContext";

const date = new Date();

export const TweetContext = React.createContext(null);

export const TweetProvider = ({ children }) => {


  const {
    currentUserHomeFeed,
    setCurrentUserHomeFeed,
    homeFeedStatus
  } = useContext(CurrentUserContext);


    const [numOfLikes, setNumOfLikes] = useState(460);
    const [numOfRetweets, setNumOfRetweets] = useState(65);
    const [isLiked, setIsLiked] = useState([]);
    const [isRetweeted, setIsRetweeted] = useState(false);

    

    let isRetweetedByCurrentUser=isRetweeted;
    let isLikedByCurrentUser=isLiked; 
    let tweetDate = date;

    let newHomeFeed = currentUserHomeFeed;



    React.useEffect(() => {
      console.log("inside useEffect");
      let tweetLikedArr = [];
      if(homeFeedStatus == "idle"){

        
        Object.values(currentUserHomeFeed["tweetsById"]).forEach((tweet) => {
          if(tweet.isLiked == true){
            tweetLikedArr.push(tweet.id);
          }
        });
        console.log("tweet Liked array", tweetLikedArr);
        setIsLiked(tweetLikedArr);
      }
  
    }, [homeFeedStatus]);

    const handleToggleLike = (ev, tweetIDtoHandle) =>{
        ev.preventDefault();//we need this and stoppropagation to prevent the event handleOpenTweetDetails() in the Homefeed.js component to fire
        ev.stopPropagation();
        console.log("toggle like called by context");

        if(homeFeedStatus == "idle"){
          // console.log("currentUserHomeFeed", currentUserHomeFeed);
          console.log("tweetID to handle in context", tweetIDtoHandle);

            
          let tweetToLike = Object.values(currentUserHomeFeed["tweetsById"]).find( tweet => tweet.id == tweetIDtoHandle);
          
          let tweetLikedArr = [];
          if(isLiked.includes(tweetIDtoHandle)){//that tweet is already liked
            console.log("this tweet is already liked");
            newHomeFeed["tweetsById"][tweetIDtoHandle].isLiked = false;

            Object.values(currentUserHomeFeed["tweetsById"]).forEach((tweet) => {//iterate tweetbyIds
              if(tweet.isLiked == true && tweet.id != tweetIDtoHandle){// 
                  tweetLikedArr.push(tweet.id);
              }
            });


                fetch(`/api/tweet/${tweetIDtoHandle}/like`,{
                  method: "PUT",

                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ like: false })
                })
                .then((res) => res.json())
                .then((json) => {
                  console.log("received answer for tweet like query", json);
                  setIsLiked(tweetLikedArr);//change UI only after server change is done
              });


          }else{
            Object.values(currentUserHomeFeed["tweetsById"]).forEach((tweet) => {
              if(tweet.isLiked == true || tweet.id  == tweetIDtoHandle ){
                tweetLikedArr.push(tweet.id);
                newHomeFeed["tweetsById"][tweetIDtoHandle].isLiked = true;

              }
            });

            fetch(`/api/tweet/${tweetIDtoHandle}/like`,{
                method: "PUT",

                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ like: true })
              })
              .then((res) => res.json())
              .then((json) => {
                console.log("received answer for tweet like query", json);
                setIsLiked(tweetLikedArr);//change UI only after server change is done
            });
          }
          
          
          // setCurrentUserHomeFeed(newHomeFeed);
          console.log("tweet Liked array from click", tweetLikedArr);
          



        }
       

        // const incOrDec = isLiked ? -1 : 1;
        // setIsLiked(!isLiked);
        // setNumOfLikes(numOfLikes + incOrDec);
    }
    const handleToggleRetweet = () =>{
        const incOrDec = isRetweeted ? -1 : 1;
        setIsRetweeted(!isRetweeted);
        setNumOfRetweets(numOfRetweets + incOrDec);
    }
  
    return (
      <TweetContext.Provider
        value={{
            // tweetContents,
            // displayName,
            // username,
            // avatarSrc,
            isRetweetedByCurrentUser,
            isLikedByCurrentUser,
            isLiked,
            tweetDate,
            numOfLikes,
            numOfRetweets, 
            date,
            handleToggleLike,
            handleToggleRetweet
        }}
      >
        {children}
      </TweetContext.Provider>
    );
};