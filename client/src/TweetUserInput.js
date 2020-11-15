import React , {useContext, useState, useEffect} from "react";

import styled from "styled-components";

import { CurrentUserContext } from "./CurrentUserContext";
import Loading from "./assets/catspin.gif";

const TweetUserInput = () =>{

    
    const {
        currentUser, 
        status,
        tweetArray,
        setTweetArray
      } = useContext(CurrentUserContext);

    const [disabled, setDisabled] = useState(false);    
    const [inputText,setInputText] = useState("");        
    const [charLeft,setCharLeft] = useState(280);        
          

    useEffect(() => {
        if(charLeft < 0){
            setDisabled(true);
        }else{
            setDisabled(false);
        }

    }, [inputText, setDisabled]);

    const handleChange = (ev) => {
        console.log("input change" , ev.target.value);
        console.log("input length" , ev.target.value.length);
        setInputText(ev.target.value);

        setCharLeft(280 - ev.target.value.length);
    }


    const handleSubmit = () => {
        console.log("submitted" , inputText);
        let tweetArr = tweetArray;

        tweetArr.push({id: "120979172109941", "timestamp":"2020-01-12T04:31:00+00:00",
        "status":"Test tweet",
        "media":[
           {
              "type":"img",
              "url":"/assets/diplomog-yarn.png"
           }
        ],
        "author":{
           "handle":"treasurymog",
           "displayName":"testDisplayname",
           "avatarSrc":"/assets/diplomog-avatar.jpg",
           "bannerSrc":"/assets/diplomog-banner.jpeg",
           "location":"Whitehall",
           "url":"http://fco.gov.uk",
           "joined":"2016-02-02T12:00",
           "bio":"Best friends with @treasurymog.",
           "numFollowing":1,
           "numFollowers":1,
           "numLikes":1,
           "isFollowingYou":true,
           "isBeingFollowedByYou":true
        },
        "isLiked":false,
        "isRetweeted":false,
        "numLikes":0,
        "numRetweets":0});



        setTweetArray(tweetArr);

        console.log("new tweetArray", tweetArray);

    }


    if(status == "idle"){
        return (
            <Wrapper>
                <InputTop>
                    <Avatar src={currentUser.profile.avatarSrc} ></Avatar>
                    <InputTweet placeholder="Type your tweet here" rows="10" onChange={(ev) => handleChange(ev)}></InputTweet>

                </InputTop>
                <InputTweetBottom>
                        <span>{charLeft}</span>
                        <button disabled={disabled} onClick={handleSubmit}>Meow</button>
                </InputTweetBottom>
            </Wrapper>
        );    
    }
    else{
      return <img src={Loading} style={{width: 30, height :30, margin: "0 auto", marginTop: 30}}/>
    }



 


}

const Wrapper = styled.div`
  display: flex;
  margin-top: 10px;
  flex-direction: column;
  border: 1px solid lightgray;
  padding-bottom: 10px;
`;

const InputTop = styled.div`
  display: flex;
  margin-top: 10px;
  
  width: 98%;

  padding-top: 10px;
  padding-left: 10px;



`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;
const InputTweet = styled.textarea`
    margin-left: 10px;
    resize: none;
    border: none;
    width: 100%;
  
    &:focus{
        outline: none;
    }
`;

const InputTweetBottom = styled.div`
    
    display: flex;
    justify-content: flex-end;
  
    span{
        margin-right: 20px;
        margin-right: 20px;
        margin-top: 5px;
        color: lightslategrey;
    }

    button{
        padding: 6px 9px 6px 11px;
        border-radius: 30px;
        border: 1px solid hsl(258deg,100%,50%);
        font-weight: bold;
        background-color: hsl(258deg,100%,50%);
        color: #fff;
        cursor: pointer;
    }
`;
export default TweetUserInput;