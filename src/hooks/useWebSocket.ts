import { useEffect, useRef } from "react";

type Handler = (data: any) => void;

export function useWebSocket(onMessage: Handler) {
  const wsRef = useRef<WebSocket | null>(null);
  const handlerRef = useRef<Handler>(onMessage);

  useEffect(() => {
    handlerRef.current = onMessage;
  }, [onMessage]);

  useEffect(() => {
    let ws: WebSocket;
    let reconnectTimeout: ReturnType<typeof setTimeout>;

    const connect = () => {
      ws = new WebSocket(
        "wss://k8s.mectest.ru/test-app/ws?token=550e8400-e29b-41d4-a716-446655440000",
      );

      wsRef.current = ws;

      ws.onopen = () => {
        console.log("WS connected");
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          handlerRef.current(data);
        } catch {
          console.log("WS parse error");
        }
      };

      ws.onerror = (e) => {
        console.log("WS error", e);
        ws.close();
      };

      ws.onclose = () => {
        console.log("WS closed → reconnecting...");
        reconnectTimeout = setTimeout(connect, 2000);
      };
    };

    connect();

    return () => {
      ws?.close();
      clearTimeout(reconnectTimeout);
    };
  }, []);

  return wsRef;
}
