import { useEffect } from "react"

export const useBookingNotificationWebSocket = (artistId:number) => {
    useEffect(()=>{
        const url = 'ws://127.0.0.1:8000/ws/notification/'
        const webSocket = new WebSocket(url)
        webSocket.onopen = () => {
            console.log('WebSocket connected')
            // webSocket.send(JSON.stringify({type: 'join', artistId}))
        }
        webSocket.onmessage = (event) => {
            console.log('Received message:', event.data)
            // handle incoming messages
        }
        webSocket.onclose = () => {
            console.log('WebSocket disconnected')
        }
        return () => webSocket.close()
    },[artistId])
}
