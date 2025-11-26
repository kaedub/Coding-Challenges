/**
 * Input types
 */
export enum MessageType {
  Email="email",
  SMS="sms",
  Slack="slack",
}

export interface EmailItem {
  from: string;
  to: string;
  datetime: Date;
  subject: string;
  body: string;
}

export interface SMSItem {
  sender: string;
  to: string;
  text: string;
}

export interface SlackItem {
  fromUsername: string;
  toUsername: string;
  timestamp: string;
  content: string;
}

export interface QueueItem {
  messageType: MessageType,
  body: SlackItem | SMSItem | EmailItem,
}

/**
 * Output types
 */

export interface Message {
  sender: string;
  receiver: string;
  payload: string;
}

export interface FailedMessage {
  messageType: MessageType;
  error: string;
}

export type MappedQueueResults = Record<MessageType, {
  messages: Message[];
  failed: FailedMessage[];
}>

/**
 * Parser types - Bonus points if you use this pattern in your solution
 */

export type ParserFunction<T> = (data: T) => Promise<Message>;

export interface Parser<T> {
  parse: ParserFunction<T>;
}
