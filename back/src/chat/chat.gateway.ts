import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import {
  BadRequestException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { AddMessageDto } from './add-message.dto';
import { message_status } from '@prisma/client';
import { MessageService } from '../message/message.service';
import { UserService } from 'src/user/user.service';
import { client } from 'src/auth/interface/client';
import { AuthService } from 'src/auth/auth.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173', // Autorise cette origine spécifique
    methods: ['GET', 'POST'], // Méthodes HTTP autorisées
    credentials: true, // Autorise les credentials (cookies, etc.)
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly messageService: MessageService,
    private userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @WebSocketServer()
  server: Server;
  private logger = new Logger('ChatGateway');

  @SubscribeMessage('chat') // subscribe to chat event messages
  async handleMessage(
    @MessageBody() payload: AddMessageDto,
    client: Socket,
  ): Promise<AddMessageDto> {
    this.logger.log(`Message received: ${payload.author} - ${payload.body}`);
    this.server.emit('chat', payload); // broadbast a message to all clients
    const receiver_socket = (
      await this.userService.getUserSocket(+payload.receiver_id)
    ).socket;

    await this.messageService.save({
      writer_id: payload.writer_id,
      receiver_id: payload.receiver_id,
      content: payload.body,
      status: this.server.sockets.sockets.get(receiver_socket)
        ? message_status.READ
        : message_status.NOT_OPENED,
    });
    console.log('message sauvegardé');
    return payload; // return the same payload data
  }

  checkLoggerId = async (client: client): Promise<number> => {
    try {
      const token = await this.authService.getTokenCookie(
        'refresh_token',
        client.handshake.headers.cookie,
      );

      if (!token) {
        throw new UnauthorizedException('Aucun token trouvé');
      }

      const payload = await this.authService.verifyToken(token);
      const compareToken = await this.authService.compareToken(
        payload.sub,
        token,
      );

      if (!compareToken) {
        client.disconnect();
        await this.userService.deleteSocket(payload.id, client.id);
        throw new UnauthorizedException('Mauvais token');
      }

      return payload.id;
    } catch (error) {
      client.disconnect();
      this.handleDisconnect(client);
      console.error('Erreur dans checkLoggerId:', error);
      throw error;
    }
  };

  async handleConnection(client: client) {
    this.logger.log(`User connected with ID: ${client.id}`);

    const id = await this.checkLoggerId(client);

    if (id) this.userService.updateSocket(id, client.id);
  }
  async handleDisconnect(client: client) {
    const id = await this.checkLoggerId(client);
    if (id) await this.userService.deleteSocket(id, client.id);
    console.log('id ' + id + 'socket' + client.id + ' déconnecté');
  }

  afterInit() {
    this.logger.log('Chat Gateway initialized');
  }
}
