import { USER_LOGIN } from "../Constants/index.js";
export const signin = async (user) => {
    try {
      const response = await fetch(USER_LOGIN, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      return await response.json();
    } catch (error) {
      return { success: false, message: error };
    }
  };