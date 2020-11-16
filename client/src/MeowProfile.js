import React , {useContext} from "react";
import styled from "styled-components";
import TweetActions from "./TweetActions";
import TweetHeader from "./TweetHeader";

import { useLocation } from "react-router-dom";

import { CurrentUserContext } from "./CurrentUserContext";
import { useHistory } from "react-router-dom";
import { AiOutlineRetweet, AiOutlineCalendar } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import moment from "moment";
import Loading from "./assets/catspin.gif";


const MeowProfile = () => {
    const [meowProfile, setMeowProfile] = React.useState({});//initial value has to be set according to the type of the state, if it's an object, then use {}
    const [meowProfileStatus, setMeowProfileStatus] = React.useState("loading");

    const [meowProfileFeed, setMeowProfileFeed] = React.useState({});
    const [meowFeedStatus, setMeowFeedStatus] = React.useState("loading");

    const {
      currentFollowers,
      followerStatus,


    } = useContext(CurrentUserContext);
    
    let isFollowingYou = false;

    const location = useLocation();




    React.useEffect(() => {
        let profileHandle = location.state.profileHandle;//get the profileHandle data from history.push used

        fetch(`/api/${profileHandle}/profile`)
          .then((res) => res.json())
          .then((json) => {//received profile info

            setMeowProfile(json);//this has to be called before the change of status to 'idle'
            setMeowProfileStatus("idle");
            
          });
    
    }, []);

    React.useEffect(() => {
      let profileHandle = location.state.profileHandle;//get the profileHandle data from history.push used

      fetch(`/api/${profileHandle}/feed`)
        .then((res) => res.json())
        .then((json) => {//received profile feed
          setMeowProfileFeed(json);
          setMeowFeedStatus("idle");
        });
  
    }, []);  
    
    let tweetArr = [];

    if(meowFeedStatus == "idle"){
      //we need this to order the tweets according to the tweetIds property 
      meowProfileFeed["tweetIds"].forEach((tweetID) =>{
        //add the matching tweet to the array that's going to contain the tweets objects ordered 
       tweetArr.push(Object.values(meowProfileFeed["tweetsById"]).find( tweet => tweet.id == tweetID));
      });
      
    }    



    if(meowProfileStatus == "idle"){

      if(followerStatus == "idle"){

        if(currentFollowers.includes(meowProfile.profile.handle)){//if true, this cat follows you 

          isFollowingYou = true;
        }
      }
        return (
            <Wrapper   style={{fontFamily : "'Roboto', sans-serif"}}>
                {/* <div>{JSON.stringify(meowProfile.profile.bannerSrc)}</div> */}
            <ProfileTop>
                <Banner style={{backgroundImage: `url(${meowProfile.profile.bannerSrc})` }}></Banner>
                <Avatar style={{backgroundImage: `url(${meowProfile.profile.avatarSrc})` }}> </Avatar>

                <button>Follow</button>

            </ProfileTop>
    
            <DisplayName>{meowProfile.profile.displayName}</DisplayName>
            <Handle>
              @{meowProfile.profile.handle}
              { isFollowingYou && (

                <span className="follows_you"> Follows you </span>


              )}
            
            
            </Handle>
            <Bio>{meowProfile.profile.bio}</Bio>
            <LocationJoined>
              {/* location is optional because some profiles don't have it */}
                  { meowProfile.profile.location && ( 

                      <Location><HiOutlineLocationMarker/> {meowProfile.profile.location}</Location>


                  )}
                  
                  <Joined><AiOutlineCalendar/> joined {moment(meowProfile.profile).format("MMMM YYYY")}</Joined>
            </LocationJoined>

            <Followering>
              <div className="following"> <span>{meowProfile.profile.numFollowing}</span> Following </div>
              <div className="follower"> <span>{meowProfile.profile.numFollowers}</span> Followers </div>

            </Followering>

            <div className="sections">
              <div>Tweets</div>
              <div>Media</div>
              <div>Likes</div>
            </div>
            
            { meowFeedStatus == "idle" ? (
              tweetArr.map((tweet) => (
                <TweetContainer key={tweet.id} tweet = {tweet} >
                </TweetContainer>
              )
            )) : (
              <img src={Loading} style={{width: 30, height :30, margin: "0 auto", marginTop: 30}}/>
            )}

            
            </Wrapper>

        )
    }
    else{
        return <img src={Loading} style={{width: 30, height :30, margin: "0 auto", marginTop: 30}}/>
    }
};


const TweetContainer = ({tweet}) => {
  const history = useHistory();
  let id = tweet.id;

  
    const handleOpenTweetDetails = (ev) =>{//tweeter details open clicked

          history.push({
            pathname: `/tweet/${id}`,
            state: { tweetID: id }
          });
      
    }


 return (
    <TweetWrapper onClick={(ev) => handleOpenTweetDetails(ev)} aria-label="View Tweet" tabIndex="0">
      { tweet.hasOwnProperty('retweetFrom') && (//check if this is a retweeted tweet

      <div  className="retweet"><AiOutlineRetweet className="retweet"/>{tweet.retweetFrom.displayName} Remeowed</div>


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

 );

};


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .retweet{
    margin-top: 10px;
    font-size: 13px;
    color: gray;

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

  button{
    width: 70px;
    align-self: flex-end;
    margin-top: -45px;
    padding: 6px 0 6px 0;
    border-radius: 30px;
    border: 1px solid black;
    font-weight: bold;
    cursor:pointer;
    border: 1px solid hsl(258deg,100%,50%);
    background-color: #fff ;
    color: hsl(258deg,100%,50%);

  
  }
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

    .follows_you{
      background-color: #e3e2f7;
      margin-left: 10px;
      border-radius: 6px;
      padding: 1px 2px 1px 2px;      
    }
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
    width:100%;
  }

`;
const TweetWrapper = styled.div`
  cursor: pointer;
`;
const Divider = styled.div`
  height: 1px;
  background: rgb(230, 236, 240);
`;

export default MeowProfile;