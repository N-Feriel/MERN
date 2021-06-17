export const requestClientData = () => ({
  type: "REQUEST_CLIENT_DATA",
});

export const receiveClientData = (data) => ({
  type: "RECEIVE_CLIENT_DATA",
  data,
});

export const updateClientData = (item) => ({
  type: "UPDATE_CLIENT_DATA",
  item,
});

export const removeClient = (item) => ({
  type: "REMOVE_CLIENT",
  item,
});

export const receiveClientDataError = (error) => ({
  type: "RECEIVE_CLIENT_DATA_ERROR",
  error,
});
