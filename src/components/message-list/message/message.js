import { format } from "date-fns";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { withCounter } from "../../../hocs/with-counter";
import { deleteMessageById } from "../../../store/messages";
import styles from "./message.module.css";

export const Message = withCounter(
  ({ message, increment, decrement, count }) => {
    const dispatch = useDispatch();
    const { roomId } = useParams();

    return (
      <div
        className={classNames(styles.message, {
          [styles.currentMessage]: message.author === "User",
        })}
      >
        <h3>{message.message}</h3>
        <p>{message.author}</p>
        <p>{format(message.date, "yyyy-MM-dd HH:MM:SS")}</p>

        <button onClick={() => dispatch(deleteMessageById(message.id, roomId))}>
          X
        </button>
        {/* <hr />
        <span>{count}</span>
        <button onClick={decrement}>decrement</button>
        <button onClick={increment}>increment</button> */}
      </div>
    );
  }
);