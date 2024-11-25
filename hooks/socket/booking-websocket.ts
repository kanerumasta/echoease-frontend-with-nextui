import { useEffect } from "react";

export const useBookingNotificationWebSocket = (artistId: number) => {
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_NOTIFICATION_WEBSOCKET;

    console.log("CONNECTING TO SOCKET NOTIF NOW:", url);
    if (!url) {
      console.log("SOCKET URL NOT FOUND!");

      return;
    }
    const webSocket = new WebSocket(url);

    webSocket.onopen = () => {
      console.log("WebSocket connected");
      // webSocket.send(JSON.stringify({type: 'join', artistId}))
    };
    webSocket.onmessage = (event) => {
      console.log("Received message:", event.data);
      // handle incoming messages
    };
    webSocket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => webSocket.close();
  }, [artistId]);
};
