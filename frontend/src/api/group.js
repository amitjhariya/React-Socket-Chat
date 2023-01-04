import { GET_GROUP_MESSAGES } from "../Constants/index.js";
export const getMessages = async (id) => {
    try {
      const response = await fetch(`${GET_GROUP_MESSAGES}/${id}`);
      return await response.json();
    } catch (error) {
      return { success: false, message: error };
    }
  };