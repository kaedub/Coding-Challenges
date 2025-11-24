import { EmailItem, Message, MessageType, Parser, ParserError, ParserResult, QueueItem, QueueItemData, SlackItem, SMSItem } from "./types";

class EmailParser implements Parser<EmailItem> {
    async parse(data: EmailItem): Promise<ParserResult> {

        const sender = data.from;
        const receiver = data.to;
        const content = data.body;

        if (!sender || !receiver || !content) {
            const error: ParserError = {
                errorMessage: "Invalid Email message: missing required fields.",
                payload: JSON.stringify(data),
            };
            return {
                valid: false,
                error,
            };
        }

        const message: Message = {
            sender,
            receiver,
            body: content,
        }

        return {
            valid: true,
            message,
        };
    }
}

class SMSParser implements Parser<SMSItem> {
    async parse(data: SMSItem): Promise<ParserResult> {

        const sender = data.sender;
        const receiver = data.to;
        const content = data.text;

        if (!sender || !receiver || !content) {
            const error: ParserError = {
                errorMessage: "Invalid SMS message: missing required fields.",
                payload: JSON.stringify(data),
            };
            return {
                valid: false,
                error,
            };
        }

        const message: Message = {
            sender,
            receiver,
            body: content,
        }

        return {
            valid: true,
            message,
        };
    }
}

class SlackParser implements Parser<SlackItem> {
    async parse(data: SlackItem): Promise<ParserResult> {
        const sender = data.fromUsername;
        const receiver = data.toUsername;
        const content = data.content;
        
        if (!sender || !receiver || !content) {
            const error: ParserError = {
                errorMessage: "Invalid Slack message: missing required fields.",
                payload: JSON.stringify(data),
            };
            return {
                valid: false,
                error,
            };
        }
        const message: Message = {
            sender,
            receiver,
            body: content,
        }

        return {
            valid: true,
            message,
        };
    }
}

export function getParser<T>(messageType: MessageType): Parser<T> {
    switch (messageType) {
        case MessageType.Email:
            return new EmailParser() as Parser<T>;
        case MessageType.SMS:
            return new SMSParser() as Parser<T>;
        case MessageType.Slack:
            return new SlackParser() as Parser<T>;
        default:
            throw new Error(`Unsupported message type: ${messageType}`);
    }
}