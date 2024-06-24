import {useState} from "react";
import styled from "styled-components";

import CreateRoomForm from "./CreateRoomForm.jsx";
import ChatList from "./ChatList.jsx";
import ChatRoom from "./ChatRoom.jsx";

interface Props {
    messages: string[]
}

const MainContent = ({ messages }: Props) => {
    const rooms = [...new Set(messages.map(msg => msg.roomname))];

    const [selectedRoom, setSelectedRoom] = useState<string>();
    const [roomSearch, setRoomSearch] = useState<string>("");

    const handleRoomClick = (roomname: string) => {
        setSelectedRoom(roomname);
    };

    const handleCreateRoom = (newRoom: string) => {
        if (!rooms.includes(newRoom)) {
            setRooms([...rooms, newRoom]);
        }
        setSelectedRoom(newRoom);
    };

    const returnClick = () => {
        setSelectedRoom(null);
    };

    const filteredRooms = rooms.filter(room =>
        room.toLowerCase().includes(roomSearch.toLowerCase())
    );

    return (
        <MainContent>
            <button className="return-btn" onClick={returnClick}>return</button>
            {!selectedRoom && <CreateRoomForm onCreateRoom={handleCreateRoom}/>}
            {!selectedRoom &&
                <SearchBox
                    type="text"
                    value={roomSearch}
                    onChange={(e) => setRoomSearch(e.target.value)}
                    placeholder="Search (ChatRoom)"
                />
            }
            {!selectedRoom && <ChatList rooms={filteredRooms} RoomClick={handleRoomClick}/>}
            {selectedRoom &&
                <ChatRoom
                    roomname={selectedRoom}
                    messages={messages.filter(msg => msg.roomname === selectedRoom)}
                    RefreshMessage={getMessages}
                />
            }
        </MainContent>
    );
};

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

export default MainContent;