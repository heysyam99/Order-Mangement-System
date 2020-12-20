import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class OrderGateway {
  @WebSocketServer()
  webSocketServer: Server;

  newOrderAdded(payload): void {
    this.webSocketServer.emit('newOrderAdded', payload);
  }

  orderStatusUpdated(payload): void {
    this.webSocketServer.emit('orderStatusUpdated', payload);
  }
}
