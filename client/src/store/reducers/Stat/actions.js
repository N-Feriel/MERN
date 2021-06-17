export const requestStatData = () => ({
  type: "REQUEST_STAT_DATA",
});

export const receiveStatData = (data) => ({
  type: "RECEIVE_STAT_DATA",
  data,
});

export const receiveVolenteerData = (data) => ({
  type: "RECEIVE_STAT_VOLENTEER_DATA",
  data,
});

export const receiveClientData = (data) => ({
  type: "RECEIVE_STAT_CLIENT_DATA",
  data,
});

export const receiveOneToData = (data) => ({
  type: "RECEIVE_STAT_ONETOONE_DATA",
  data,
});

export const updteStatData = (item, key, value) => ({
  type: "UPDATE_STAT_DATA",
  item,
  key,
  value,
});

export const removeStat = (item) => ({
  type: "REMOVE_STAT",
  item,
});

export const receiveStatDataError = (error) => ({
  type: "RECEIVE_STAT_DATA_ERROR",
  error,
});
