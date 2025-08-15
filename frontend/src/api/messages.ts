import axios from "axios";
import { apiUrl } from "./api";
import { MessageDto } from "@/types/Message";

export async function sendConversationMessage(payload: MessageDto) {
  try {
    const response = await axios.post(`${apiUrl}/messages`, payload);
    return response.data;
  } catch (error: unknown) {
    console.error("Error sending message:", error);
    throw error;
  }
}
