let socketInstance = null;

export const setSocketServer = (io) => {
  socketInstance = io;
};

export const emitRealtimeEvent = (event, payload) => {
  if (!socketInstance) return;
  socketInstance.emit(event, payload);
};
