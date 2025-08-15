import axios from "axios";
import { apiUrl } from "./api";
import { ConversationDto } from "@/types/Conversation";

export async function createConversation(payload: ConversationDto) {
  try {
    const response = await axios.post(`${apiUrl}/conversations`, payload);
    return response.data;
  } catch (error: unknown) {
    console.error("Error creating conversation:", error);
    throw error;
  }
}
