import { NextApiResponse } from 'next';
import { Server as NetServer, Socket } from 'net';
import { Server as SocketIOServer } from 'socket.io';

export type User = {
    avatar_url: string
    channels: string[] | null
    created_at: string | null
    email: string
    id: string
    is_away: boolean
    name: string | null
    phone: string | null
    type: string | null
    workplaces: string[] | null
}

export type Workplace = {
    channels: string[] | null
    created_at: string
    id: string
    image_url: string | null
    invite_code: string | null
    members: string[] | null
    name: string
    regulator: string[] | null
    slug: string
    super_admin: string
  }

export type Channel = {
    id: string
    members: string[] | null
    name: string
    regulator: string[] | null
    user_id: string
    workplace_id: string
  }

  export type SockerIoApiResponse = NextApiResponse & {
    socket: Socket & {
      server: NetServer & {
        io: SocketIOServer;
      };
    };
  };