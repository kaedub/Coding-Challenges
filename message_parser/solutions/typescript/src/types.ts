export enum MessageType {
    Email = "email",
    SMS = "sms",
    Slack = "slack",
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

export type QueueItemData = EmailItem | SMSItem | SlackItem;

export interface QueueItem {
    messageType: MessageType,
    data: QueueItemData,
}

export interface Message {
    sender: string;
    receiver: string;
    body: string;
}

export interface ParserError {
    errorMessage: string;
    payload: string;
}

export type MappedQueueResults = Record<MessageType, {
    messages: Message[];
    errors: ParserError[];
}>

export interface ParserResult {
    valid: boolean;
    message?: Message;
    error?: ParserError;
}

export type ParserFunction<T> = (data: T) => Promise<ParserResult>;

export interface Parser<T> {
    parse: ParserFunction<T>;
}