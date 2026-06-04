// backend/src/services/websocket.ts
import { Server as HttpServer } from 'http';
import { WebSocketServer } from 'ws';
import marketService from './marketService';

export class WebSocketServerService {
  private wss: WebSocketServer;

  constructor(server: HttpServer) {
    this.wss = new WebSocketServer({ server });

    this.wss.on('connection', (ws) => {
      console.log('📡 New client connected to market replay');

      ws.on('message', (message: string) => {
        try {
          const data = JSON.parse(message);
          
          if (data.type === 'start_replay') {
            marketService.startReplay(this.wss, data.speed || 1);
          }
        } catch (e) {
          console.error('WebSocket message error:', e);
        }
      });

      // Send welcome message
      ws.send(JSON.stringify({
        type: 'connection',
        message: 'Connected to Limitless Market Replay'
      }));
    });

    console.log('✅ WebSocket Server initialized');
  }
}

export default WebSocketServerService;