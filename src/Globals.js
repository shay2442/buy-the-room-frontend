// export const baseUrl = "http://localhost:3001";
export const baseUrl = "https://buy-the-room-backend.herokuapp.com";
export const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const getToken = () => {
  return {
    Authorization: `bearer ${localStorage.getItem("jwt")}`,
  };
};
