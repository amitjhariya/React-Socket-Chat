export const HOST= process.env.REACT_APP_HOST ||'https://react-chat-service.onrender.com'
export const API=`${HOST}/api/v1`
export const GET_GROUPS =`${API}/groups`
export const USER_LOGIN =`${API}/auth/signin`
export const USER_FIND =`${API}/user/`
export const GET_GROUP_MESSAGES =`${API}/groups/messages`
// console.log(`API ENDPOINT : ${HOST}`)