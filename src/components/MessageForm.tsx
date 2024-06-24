import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

interface Props {
    roomname: string;
    RefreshMessage: () => void;
}

interface NewMessage {
    username: string;
    roomname: string;
    text: string;
    date: string;
}

const MessageForm = ({ roomname, RefreshMessage }) => {
    const [text, setText] = useState<string>('');
    const [username, setUsername] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!username) {
            alert('UserName을 입력하세요');
            return;
        } else if (!text) {
            alert('Message를 입력하세요');
            return;
        }

        const newMessage: NewMessage = {
            username: username,
            roomname: roomname,
            text: text,
            date: new Date().toISOString()
        };

        // 서버로 메세지 전송.
        try {
            await axios.post("https://www.yungooso.com/api/messages", newMessage);
            setText("");
            RefreshMessage();   // 메세지 전송 후 메세지 리스트 갱신.
        } catch (error) {
            console.error("메세지를 전송하는 중 오류 발생", error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <UsernameInput
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="USERNAME"
            />

            <MessageInput
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="MESSAGE"
            />
            <Button type="submit">SEND</Button>
        </Form>
    );
};

const Form = styled.form`
  display: flex;
  height: 40px;
  margin-bottom: 20px;
`;

const UsernameInput = styled.input`
  padding: 10px;
  font-size: medium;
  margin-right: 10px;
  width: 100px;
`;

const MessageInput = styled.input`
  padding: 10px;
  font-size: medium;
  margin-right: 10px;
  width: 150px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: large;
  width: 80px;
  background-color: #424260;

  &:hover {
    background-color: #535bf2;
  }
`;

export default MessageForm;