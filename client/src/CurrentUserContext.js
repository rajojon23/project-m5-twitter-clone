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

    // provider call


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
          }).catch(function(error) {//error is caught

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
            setHomeFeedStatus("error");
          });
    
      }, [newTweetStatus]);//add this dependency in order to refetch and update homefeed by rerendering, state is changed inside TextUserInput.js component

 
      
      React.useEffect(() => {
        
        fetch(`/api/treasurymog/feed`)
          .then((res) => res.json())
          .then((json) => {
            // When the data is received, update currentUserFeed.
            // Also, set `status` to `idle`
            setCurrentUserProfileFeed(json);
            setProfileFeedStatus("idle");
          });
    
      }, []);

      React.useEffect(() => {
        
        fetch(`/api/treasurymog/followers`)
          .then((res) => res.json())
          .then((json) => {//received followers data

            let followersArr = [];

            json["followers"].forEach( (follower) =>{
                followersArr.push(follower.handle);//followers set
            });

            // When the data is received, update currentUserFeed.
            // Also, set `status` to `idle`

            setCurrentFollowers(followersArr);
            setFollowerStatus("idle");
          });
    
      }, []);

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
