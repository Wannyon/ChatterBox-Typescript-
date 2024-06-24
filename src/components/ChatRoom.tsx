import React, {useRef, useEffect, useState} from 'react';
import styled from "styled-components";
import MessageForm from './MessageForm';
import { Message } from "../App";

interface Props {
    roomname: string;
    messages: Message[];
    RefreshMessage: () => void;
}

const ChatRoom = ({ roomname, messages, RefreshMessage }: Props) => {
    const [messageSearch, setMessageSearch] = useState<string>("");
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const filteredMessages: Message[] = messages.filter(msg =>
        msg.text.toLowerCase().includes(messageSearch.toLowerCase()) ||
        msg.username.toLowerCase().includes(messageSearch.toLowerCase())
    );

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "end"
            } as ScrollIntoViewOptions);
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [filteredMessages]);

    return (
        <ChatRoomContainer className="chat-room">
            <h2>{roomname}</h2>
            <SearchBox
                type="text"
                value={messageSearch}
                onChange={(e) => setMessageSearch(e.target.value)}
                placeholder="Search (User & Message)"
            />

            <MessagesContainer className="messages">
                {filteredMessages.map(msg => (
                    <MessageItem key={msg.id} className="message" ref={messagesEndRef}>
                        <strong>{msg.username}</strong>
                        <p>
                            {msg.text}
                            <span>{new Date(msg.date).toLocaleString()}</span>
                        </p>

                    </MessageItem>
                ))}
            </MessagesContainer>
            <MessageForm roomname={roomname} RefreshMessage={RefreshMessage} />
        </ChatRoomContainer>
    );
};

const ChatRoomContainer = styled.div`
  width: 100%;
  max-width: 600px;
`;

const MessagesContainer = styled.div`
  min-height: 300px;
  border: 1px solid #ccc;
  padding: 10px;
  max-height: 300px;
  margin-bottom: 10px;
  overflow-y: auto;
  background-color: #7eb6b6;
`;

const MessageItem = styled.div`
  margin-bottom: 10px;
  font-size: medium;
  background-color: #eaece9;
  border-radius: 10px;
  padding: 1px 10px;

  strong {
    font-size: large;
    color: #333;
  }

  span {
    font-size: x-small;
  }
`;

const SearchBox = styled.input`
  font-size: 10px;
  margin-bottom: 10px;
  padding: 10px;
`;

export default ChatRoom;