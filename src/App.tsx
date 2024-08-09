import React, {useEffect, useState} from "react";
import axios from "axios";
import styled from "styled-components";

import ChatList from "./components/ChatList";
import ChatRoom from "./components/ChatRoom";
import CreateRoomForm from "./components/CreateRoomForm";
import Sidebar from "./components/Sidebar";
import Login from "./components/auth/Login";

export interface Message {
    id: string;
    username: string;
    roomname: string;
    message: string;
    date: string;
}

const App = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [rooms, setRooms] = useState<string[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<string>("");
    const [roomSearch, setRoomSearch] = useState<string>("");
    const [user, setUser] = useState<string | null>(null);

    const getMessages = async () => {
        try {
            const response = await axios.get<Message[]>("http://127.0.0.1:3000/classes/messages");
            setMessages(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('메시지를 가져오는 중 오류 발생:', error);
        }
    };

    // 컴포넌트가 마운트 될 때, 서버에서 메세지 가져옴.
    useEffect(() => {
        getMessages();
        const interval = setInterval(getMessages, 5000);
        return () => clearInterval(interval); // 언마운트될 때 인터벌 클리어.
    }, []);

    useEffect(() => {
        const uniqueRooms = [...new Set(messages.map(msg => msg.roomname))];
        setRooms(uniqueRooms);
    }, [messages])

    const handleRoomClick = (roomname: string) => {
        setSelectedRoom(roomname);
    };

    const handleCreateRoom = (newRoom: string) => {
        if (!rooms.includes(newRoom)) {
            setRooms([...rooms, newRoom]);
        }
        setSelectedRoom(newRoom);
    };

    const handleLogin = (username: string) => {
        setUser(username);
    };


    const returnClick = () => {
        setSelectedRoom(null);
    };

    const filteredRooms = rooms.filter(room =>
        room.toLowerCase().includes(roomSearch.toLowerCase())
    );

    return (
        <AppContainer>
            {!user ? (
                <div>
                    <Login onLogin={ handleLogin }/>
                </div>
            ) : (
                <>
                    <MainContent messages={ messages }>
                        <button className="return-btn" onClick={ returnClick }>return</button>
                        { !selectedRoom && <CreateRoomForm onCreateRoom={ handleCreateRoom }/> }
                        { !selectedRoom &&
                            <SearchBox
                                type="text"
                                value={ roomSearch }
                                onChange={(e) => setRoomSearch(e.target.value)}
                                placeholder="Search (ChatRoom)"
                            />
                        }
                        {!selectedRoom && <ChatList rooms={ filteredRooms } RoomClick={ handleRoomClick }/>}
                        {selectedRoom &&
                            <ChatRoom
                                roomname={ selectedRoom }
                                messages={ messages.filter(msg => msg.roomname === selectedRoom) }
                                RefreshMessage={ getMessages }
                            />
                        }
                    </MainContent>
                    <Sidebar messages={ messages } />
                </>
            )}
        </AppContainer>
    );
};

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
`;

const MainContent = styled.div`
  flex-grow: 1;
  max-width: 100%;
  min-width: 400px;
  width: 400px;
  margin: 0 100px;
`;

const SearchBox = styled.input`
  font-size: 16px;
  margin-bottom: 20px;
  padding: 10px;
`;

export default App;
