import React from "react";


export const CurrentUserContext = React.createContext(null);

export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = React.useState(null);
    const [status, setStatus] = React.useState("loading");

    const [currentUserHomeFeed, setCurrentUserHomeFeed] = React.useState({});
    const [homeFeedStatus, setHomeFeedStatus] = React.useState("loading");

    const [currentUserProfileFeed, setCurrentUserProfileFeed] = React.useState(null);
    const [profileFeedStatus, setProfileFeedStatus] = React.useState("loading");

    const [currentFollowers, setCurrentFollowers] = React.useState([]);
    const [followerStatus, setFollowerStatus] = React.useState("loading");
    
    const [tweetArray , setTweetArray] = React.useState([]);

    const [newTweetStatus , setNewTweetStatus] = React.useState(false);

    console.log("provider call");
    // Fetch the user data from the API (/me/profile)
    // fetch(`https://jsonplaceholder.typicode.com/posts/1`)


    React.useEffect(() => {
        
        fetch(`/api/me/profile`)
          .then((res) => res.json())
          .then((json) => {

            // When the data is received, update currentUser.
            // Also, set `status` to `idle`
            setCurrentUser(json);
            setStatus("idle");
          }).catch(function(error) {
            console.log("error is caught");
            setStatus("error");
          });
    
      }, []);

      React.useEffect(() => {
        
        fetch(`/api/me/home-feed`)
          .then((res) => res.json())
          .then((json) => {
    
            // When the data is received, update currentUserFeed.
            // Also, set `status` to `idle`
            setCurrentUserHomeFeed(json);


            setHomeFeedStatus("idle");
          }).catch(function(error) {
            console.log("error is caught");
            setHomeFeedStatus("error");
          });
    
      }, [newTweetStatus]);

 
      
      React.useEffect(() => {
        
        fetch(`/api/treasurymog/feed`)
          .then((res) => res.json())
          .then((json) => {
    
            console.log("feed data", json);
            // When the data is received, update currentUserFeed.
            // Also, set `status` to `idle`
            setCurrentUserProfileFeed(json);
            setProfileFeedStatus("idle");
          });
    
      }, []);

      React.useEffect(() => {
        
        fetch(`/api/treasurymog/followers`)
          .then((res) => res.json())
          .then((json) => {
    
            console.log("received followers data", json["followers"]);
            let followersArr = [];

            json["followers"].forEach( (follower) =>{
                followersArr.push(follower.handle);
            });

            console.log("followers set", followersArr);
            // When the data is received, update currentUserFeed.
            // Also, set `status` to `idle`

            setCurrentFollowers(followersArr);
            setFollowerStatus("idle");
          });
    
      }, []);

      React.useEffect(() => {
        

    
      }, []);

    const updateHomeFeed = (tweetID) => {
        console.log("updateHomeFeed called");
    }
  
    return (
      <CurrentUserContext.Provider value={{ 
          currentUser, 
          status, 
          currentUserHomeFeed,
          setCurrentUserHomeFeed,
          homeFeedStatus,
          currentUserProfileFeed,
          profileFeedStatus,
          currentFollowers,
          followerStatus,
          tweetArray,
          setTweetArray,
          newTweetStatus,
          setNewTweetStatus
          }}>
        {children}
      </CurrentUserContext.Provider>
    );
  };
