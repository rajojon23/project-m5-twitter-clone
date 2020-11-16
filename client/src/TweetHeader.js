import React from "react";
import styled from "styled-components";
import moment from "moment";
import { useHistory } from "react-router-dom";

const TweetHeader = ({ displayName, username, avatarSrc, tweet }) => {
    const history = useHistory();


    const handleOpenProfile = (ev) => {//profile opening is called from a tweet (the handle has been clicked)
        ev.preventDefault();//we need this and stoppropagation to prevent the event handleOpenTweetDetails() in the Homefeed.js component from firing
        ev.stopPropagation();

        let handle = tweet.author.handle;


        history.push({
          pathname: `/${handle}/profile`,
          state: { profileHandle: handle }
        });

    }

 

  return (
    <Wrapper>
      <Avatar src={tweet.author.avatarSrc}  />
      <Name>
        <DisplayName onClick={(ev) => handleOpenProfile(ev)} tabIndex="0">{tweet.author.displayName} </DisplayName>
        <Username> @{tweet.author.handle} </Username>
        <Date> {moment(tweet.timestamp).format(" · MMM Do")}</Date>
      </Name>

    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex;
  margin-top: 10px;
  cursor: pointer;
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

const Name = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 0px 16px;
`;

const DisplayName = styled.div`
  font-size: 15px;
  line-height: 20px;
  font-weight: bold;

  &:hover{
      cursor: pointer;
      text-decoration: underline;
  }
`;

const Username = styled.div`
  font-size: 15px;
  line-height: 20px;
  color: rgb(101, 119, 134);
  margin: 0 3px 0 3px;
`;

const Date = styled.div`
  font-size: 15px;
  line-height: 20px;
  color: rgb(101, 119, 134);
`;

export default TweetHeader;
