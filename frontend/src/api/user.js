import { USER_FIND } from "../Constants/index.js";
export const getUserByID = async (id) => {
    try {
      const response = await fetch(`${USER_FIND}/${id}`);
      return await response.json();
    } catch (error) {
      return { success: false, message: error };
    }
  };