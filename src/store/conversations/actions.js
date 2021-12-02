import { CREATE_CONVERSATION } from "./types";
import { DELETE_CONVERSATION } from "../profile/types";

export const createConversation = (conversation) => ({
  type: CREATE_CONVERSATION,
  payload: conversation,
});

export const deleteConversation = (conversation) => ({
  type: DELETE_CONVERSATION,
  payload: conversation,
});