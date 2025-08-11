import { MessageDto } from "@/types/Message";
import { apiUrl } from "./api";
import axios from "axios";

export async function createConversation(payload: MessageDto) {
  try {
    const response = await axios.post(`${apiUrl}/conversations`, payload);
    const data = await response.data();
    return data;
  } catch (error: unknown) {
    console.error("Error creating conversation:", error);
  }
}

export async function sendMessage(payload: MessageDto) {
  try {
    const response = await axios.post(`${apiUrl}/messages`, payload);
    const data = await response.data();
    return data;
  } catch (error: unknown) {
    console.error("Error creating conversation:", error);
  }
}
