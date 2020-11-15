import React  from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import TweetActions from "./TweetActions";
import moment from "moment";
import Loading from "./assets/catspin.gif";
import { useHistory } from "react-router-dom";

const TweetDetails = () => {


  const [tweetDetails, setTweetDetails] = React.useState({});
  const [tweetDetailStatus, setTweetDetailStatus] = React.useState("loading");


  const location = useLocation();

  console.log("location found", location.state.tweetID); 


  const history = useHistory();


      React.useEffect(() => {
        let tweetID = location.state.tweetID;//get the profileHandle data from history.push used

        fetch(`/api/tweet/${tweetID}`)
          .then((res) => res.json())
          .then((json) => {

            console.log("received tweet info", json );
            setTweetDetails(json);//this has to be called before the change of status to 'idle'
            setTweetDetailStatus("idle");


          });

      }, []);


      const handleOpenProfile = (ev) => {
        ev.preventDefault();//we need this and stoppropagation to prevent the event handleOpenTweetDetails() in the Homefeed.js component from firing
        ev.stopPropagation();
        console.log("profile opening called from tweetdetails", tweetDetails.tweet.author.handle);

        let handle = tweetDetails.tweet.author.handle;


        history.push({
          pathname: `/${handle}/profile`,
          state: { profileHandle: handle }
        });

    }


      if(tweetDetailStatus == "idle"){
        return (
            <Wrapper   style={{fontFamily : "'Roboto', sans-serif"}}>
                
                <TweetTop>
                  <Avatar src={tweetDetails.tweet.author.avatarSrc} />
                  <User>
                    <div className="displayname" onClick={(ev) => handleOpenProfile(ev)}>{tweetDetails.tweet.author.displayName}</div>
                    <div className="handle">@{tweetDetails.tweet.author.handle}</div>

                  </User>
                </TweetTop>
                <TweetContent>
                  <div>{tweetDetails.tweet.status}</div>
                  {/* <div>{tweetDetails.tweet.media[0]}</div> */}
                  {tweetDetails.tweet.media.map((mediaContent) => (
                     <img src={`${mediaContent.url}`}></img>
                  ))}
                </TweetContent>

                <Date>{moment(tweetDetails.tweet.timestamp).format("HH:mm A · MMM d YYYY")} ·  Critter web app</Date>

                <Divider />
                <TweetActions  isLiked={tweetDetails.tweet.isLiked}  tweetID={tweetDetails.tweet.id}></TweetActions>
            </Wrapper>

        )
      }
      else{
          return <img src={Loading} style={{width: 30, height :30, margin: "0 auto", marginTop: 30}}/>
      }


};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TweetTop = styled.div`
  display: flex;
  flex-direction: row;
`;
const TweetContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0 20px 0;
  font-size: 20px;


  img{
    width:100%;
    margin: 20px 0 0 0;
  }
`;
const Date = styled.div`
  color: gray;
  margin-bottom: 20px;
`;
const User = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 30px;

  .displayname{
    font-size: 20px;
    line-height: 20px;
    font-weight: bold;

  }
  .displayname:hover{
    cursor: pointer;
    text-decoration: underline;
  }
  .handle{
    font-size: 20px;
    line-height: 20px;
    color: rgb(101,119,134);
  }
`;

const Avatar = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
`;
const Divider = styled.div`
  height: 1px;
  background: rgb(230, 236, 240);
`;

export default TweetDetails;