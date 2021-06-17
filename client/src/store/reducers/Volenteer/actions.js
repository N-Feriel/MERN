export const requestVolenteerData = () => ({
  type: "REQUEST_VOLENTEER_DATA",
});

export const receiveVolenteerData = (data) => ({
  type: "RECEIVE_VOLENTEER_DATA",
  data,
});

export const updateVolenteerData = (item) => ({
  type: "UPDATE_VOLENTEER_DATA",
  item,
});

export const removeVolenteer = (item) => ({
  type: "REMOVE_VOLENTEER",
  item,
});

export const receiveVolenteerDataError = (error) => ({
  type: "RECEIVE_VOLENTEER_DATA_ERROR",
  error,
});
