import React , {useContext, useState, useEffect} from "react";

import styled from "styled-components";

import { CurrentUserContext } from "./CurrentUserContext";
import Loading from "./assets/catspin.gif";

const TweetUserInput = () =>{

    
    const {
        currentUser, 
        status,
        tweetArray,
        setTweetArray,
        newTweetStatus,
        setNewTweetStatus
      } = useContext(CurrentUserContext);

    const [disabled, setDisabled] = useState(false);    
    const [inputText,setInputText] = useState("");        
    const [charLeft,setCharLeft] = useState(280); 
    const [countColor,setCountColor] = useState("gray");             
          

    useEffect(() => {
        if(charLeft < 0){
            setDisabled(true);
            setCountColor("red");

        }else{
            setDisabled(false);
            setCountColor("gray");

            if(charLeft <= 55){
                setCountColor("orange");

            }
        }

    }, [inputText, setDisabled]);

    const handleChange = (ev) => {//input cahnge has been called 

        setInputText(ev.target.value);

        setCharLeft(280 - ev.target.value.length);
    }


    const handleSubmit = () => {//meow has been submitted and the text is inputText
        if(inputText.length > 0){
            fetch("/api/tweet", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({ status: `${inputText}` }),
              })
                .then((res) => res.json())
                .then((json) => {// received tweet post answer
                  setNewTweetStatus(!newTweetStatus);//changing this state in order to notify CurrentUserContext.js for rerendering using useEffect 
                    
                  
                });

        }
        else{
            alert("there is nothing to tweet, silly");
        }

    }


    if(status == "idle"){
        return (
            <Wrapper style={{fontFamily : "'Roboto', sans-serif"}}>
                <InputTop>
                    <Avatar src={currentUser.profile.avatarSrc} ></Avatar>
                    <InputTweet placeholder="Type your tweet here" rows="10" onChange={(ev) => handleChange(ev)}></InputTweet>

                </InputTop>
                <InputTweetBottom>
                        <span style={{color: countColor}}>{charLeft}</span>
                        <button disabled={disabled} style={ disabled ? { opacity:'0.5' } : {opacity:'1', cursor: 'pointer' } }   onClick={handleSubmit}>Meow</button>
                </InputTweetBottom>
            </Wrapper>
        );    
    }
    else{
        if(status == "error"){
            return <div>Error while fetching user profile</div>
        }else{
            return <img src={Loading} style={{width: 30, height :30, margin: "0 auto", marginTop: 30}}/>
        }

      
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
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
  
    &:focus{
        outline: none;
    }

    &::-webkit-input-placeholder {
        font-family: 'Roboto', sans-serif;
    }
    &:-moz-placeholder {
        font-family: 'Roboto', sans-serif;
    }
    &::-moz-placeholder {
        font-family: 'Roboto', sans-serif;
    }
    &:-ms-input-placeholder {
        font-family: 'Roboto', sans-serif;
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
        font-family: 'Roboto', sans-serif;
        padding: 6px 9px 6px 11px;
        border-radius: 30px;
        border: 1px solid hsl(258deg,100%,50%);
        font-weight: bold;
        background-color: hsl(258deg,100%,50%);
        color: #fff;
    }
`;
export default TweetUserInput;