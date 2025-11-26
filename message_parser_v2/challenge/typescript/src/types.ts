/**
 * Input types
 */
export enum MessageType {
  Email = "email",
  SMS = "sms",
  Slack = "slack",
}

export interface EmailItem {
  from: string;
  to: string;
  datetime: string;
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
  timestamp: Date;
  body: string;
}

export interface FailedMessage {
  messageType: MessageType;
  timestamp: Date;
  error: string;
}

export type MappedQueueResults = Record<MessageType, {
  messages: Message[];
  failed: FailedMessage[];
}>
