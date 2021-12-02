import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import debounce from "lodash.debounce";
import { Input, InputAdornment } from "@mui/material";
import { Send } from "@mui/icons-material";
import { Message } from "./message";
import { useStyles } from "./styles-list";
import { messagesSelector, sendMessage } from "../../store/messages";
import { conversationsSelector } from "../../store/conversations";
import { useDispatch, useSelector } from "react-redux";

export const MessageList = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const styles = useStyles();
  const messages = useSelector(messagesSelector(roomId));
  const conversations = useSelector(conversationsSelector);
  const [value, setValue] = useState("");

  const dispatch = useDispatch();

  const ref = useRef(null);
  const refWrapper = useRef(null);

  const send = useCallback(
    (author = "User", botMessage) => {
      if (value || botMessage) {
        dispatch(sendMessage({ author, message: value || botMessage }, roomId));
        setValue("");
      }
    },
    [value, roomId, dispatch]
  );

  useEffect(() => {
    if (refWrapper.current) {
      refWrapper.current.scrollTo(0, refWrapper.current.scrollHeight);
    }
  }, [messages]);

  useEffect(() => {
    const isValidRoomId = conversations.includes(roomId);

    if (!isValidRoomId && roomId) {
      navigate("/chat");
    }
  }, [roomId, conversations, navigate]);

  // useEffect(() => {
  //   let block = refWrapper.current;

  //   const cb = debounce(() => console.log("height", block?.scrollTop), 200);

  //   if (refWrapper.current) {
  //     block?.addEventListener("scroll", cb);
  //   }

  //   return () => block?.removeEventListener("scroll", cb);
  // }, []);

  useEffect(() => {
    const lastMessages = messages[messages.length - 1];
    let timerId = null;

    if (messages.length && lastMessages.author !== "Bot") {
      timerId = setTimeout(() => {
        send("Bot", "Hello from bot");
      }, 200);
    }

    return () => clearInterval(timerId);
  }, [messages, roomId, send]);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const handlePressInput = ({ code }) => {
    if (code === "Enter") {
      send();
    }
  };

  return (
    <>
      <div ref={refWrapper}>
        {messages.map((message, index) => (
          <Message message={message} key={index} />
        ))}
      </div>

      <Input
        fullWidth
        className={styles.input}
        ref={ref}
        placeholder="enter message..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handlePressInput}
        endAdornment={
          <InputAdornment position="end">
            <Send className={styles.icon} onClick={send} />
          </InputAdornment>
        }
      />
    </>
  );
};