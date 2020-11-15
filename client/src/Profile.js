import React , {useContext} from "react";
import styled from "styled-components";
import TweetActions from "./TweetActions";
import TweetHeader from "./TweetHeader";

import { CurrentUserContext } from "./CurrentUserContext";
import { useHistory } from "react-router-dom";
import { AiOutlineRetweet, AiOutlineCalendar } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import moment from "moment";


const Profile = () => {
  const {
    currentUser, 
    status, 
    currentUserProfileFeed,
    profileFeedStatus
  } = useContext(CurrentUserContext);
  const history = useHistory();
  const handleOpenTweetDetails = (ev, tweet) =>{
    let id = tweet.id;
    console.log("tweeter details open clicked");

    

        history.push({
          pathname: `/tweet/${id}`,
          state: { tweetID: id }
        });
    
  }
  

  if(status == "idle"){

    return (
      <Wrapper  style={{fontFamily : "'Roboto', sans-serif"}}>
        <ProfileTop>
            <Banner style={{backgroundImage: `url(${currentUser.profile.bannerSrc})` }}></Banner>
            <Avatar style={{backgroundImage: `url(${currentUser.profile.avatarSrc})` }}> </Avatar>
            
        </ProfileTop>

        <DisplayName>{currentUser.profile.displayName}</DisplayName>
            <Handle>
              @{currentUser.profile.handle}
            </Handle>
            <Bio>{currentUser.profile.bio}</Bio>
            <LocationJoined>
              {/* location is optional because some profiles don't have it */}
                  { currentUser.profile.location && ( 

                      <Location><HiOutlineLocationMarker/> {currentUser.profile.location}</Location>


                  )}
                  
                  <Joined><AiOutlineCalendar/> joined {moment(currentUser.profile).format("MMMM YYYY")}</Joined>
            </LocationJoined>

            <Followering>
              <div className="following"> <span>{currentUser.profile.numFollowing}</span> Following </div>
              <div className="follower"> <span>{currentUser.profile.numFollowers}</span> Followers </div>

            </Followering>

            <div className="sections">
              <div>Tweets</div>
              <div>Media</div>
              <div>Likes</div>
            </div>        
        
        { profileFeedStatus == "idle" ? (
            Object.values(currentUserProfileFeed["tweetsById"]).map((tweet) => (
              <TweetWrapper onClick={(ev) => handleOpenTweetDetails(ev, tweet)} aria-label="View Tweet" tabIndex="0">
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
                <TweetActions isLiked={tweet.isLiked}  tweetID={tweet.id}></TweetActions>
                <Divider />
                </TweetWrapper>
            )
          )) : (
            <div> Loading Profile Feed </div>
          )}
        </Wrapper>

      
    )
  }
  else{
    return <div> Loading Profile </div>
  }




};


const Wrapper = styled.div`
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

  .sections{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-top: 20px;

    div:first-child{
      color: hsl(258deg,100%,50%);
      border-bottom: 2px solid hsl(258deg,100%,50%);
      
    }
    div{
      border-bottom: 1px solid lightgray;
      flex: 0.33;
      display: flex;
      justify-content: center;
      padding: 10px 0 10px 0;
      font-weight: bold;

    }
  }


`;

const ProfileTop = styled.div`
  display: flex;
  flex-direction: column;
`;

const Banner = styled.div`
  height: 215px;
  width: 100%;
  background-size: cover;
`;
const Avatar = styled.div`
  height: 120px;
  width: 120px;
  background-size: cover;
  border-radius: 50%;
  margin-top: -60px;
  margin-left: 15px;
  border: 3px solid #fff;
`;

const DisplayName = styled.div`
    margin-top: 24px;
    font-size: 18px;
    font-weight: bold;    

`;

const Handle = styled.div`
    color: gray;

`;

const Bio = styled.p`
    margin: 20px 0 20px 0;

`;
const LocationJoined = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 16px;
  color: gray;

`;

const Joined = styled.div`
`;

const Location = styled.div`
  margin-right: 23px;
`;

const Followering = styled.div`
  display: flex;
  flex-direction: row;
  color: gray;
  margin-top: 15px;

  span{
    font-weight: bold;
    color: #000;
  }

  .following{
    margin-right: 30px;

  }
  .followers{

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
const TweetWrapper = styled.div`
  cursor: pointer;
`;
const Divider = styled.div`
  height: 1px;
  background: rgb(230, 236, 240);
`;
export default Profile;