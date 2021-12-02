import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { List } from "@mui/material";
import {
  conversationsSelector,
  createConversation,
} from "../../store/conversations";
import { Chat } from "./chat";

export const ChatList = () => {
  const { roomId } = useParams();
  const conversations = useSelector(conversationsSelector);

  const dispatch = useDispatch();

  const createConversationByName = () => {
    const name = prompt("Введите название комнаты");

    const isValidName = !conversations.includes(name);

    if (name && isValidName) {
      dispatch(createConversation(name));
    } else {
      alert("не валидная комната");
    }
  };

  return (
    <List component="nav">
      <button onClick={createConversationByName}>create</button>
      {conversations.map((chat) => (
        <Link key={chat} to={`/chat/${chat}`}>
          <Chat title={chat} selected={chat === roomId} dispatch={dispatch} />
        </Link>
      ))}
    </List>
  );
};