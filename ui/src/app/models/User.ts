import { Subscription } from './Subscription';
export interface User {
  id?: number;
  username: string;
  email: string;
  gotify_token: string;
  gotify_server_ip: string;
  discord_webhook: string;
  notifications_preffered_mode: string;
  notifications_status: boolean;
  subscriptions?: Subscription[];
}
