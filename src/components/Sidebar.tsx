import styled from "styled-components";
import { useState } from "react";

import FriendList from "./FriendList";
import UserList from "./UserList";
import { Message } from "../App";

interface Props {
    messages: Message[];
}

const Sidebar = ({ messages }: Props) => {
    const users = [...new Set(messages.map(msg => msg.username))];

    const [userSearch, setUserSearch] = useState<string>("");
    const [friends, setFriends] = useState<string[]>([]);

    const handleAddFriend = (friend: string) => {
        if (!friends.includes(friend)) {
            setFriends([...friends, friend]);
        }
    };

    const handleRemoveFriend = (friend: string) => {
        setFriends(friends.filter(ex => ex !== friend));
    };

    const filteredUsers: string[] = users
        .filter(user => user.toLowerCase().includes(userSearch.toLowerCase()))
        .filter(user => !friends.includes(user)); // 친구 목록에 없는 사용자들만 필터링

    return (
        <Wrapper>
            <SearchBox
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="사용자 이름을 검색하세요"
            />
            <FriendList friends={friends} onRemoveFriend={handleRemoveFriend} />
            <UserList users={filteredUsers} onAddFriend={handleAddFriend} />
        </Wrapper>
    )
};

export default Sidebar;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  border-left: 1px solid #ccc;
`;

const SearchBox = styled.input`
  font-size: 16px;
  margin-bottom: 20px;
  padding: 10px;
`;
