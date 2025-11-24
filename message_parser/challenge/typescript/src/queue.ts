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

const Q: QueueItem[] = [
    {
        messageType: MessageType.Email,
        body: {
            from: "sender@example.com",
            to: "recipient@example.com",
            datetime: new Date(),
            subject: "Hello",
            body: "This is a test email.",
        },
    },
    {
        messageType: MessageType.SMS,
        body: {
            sender: "+0123456789",
            to: "+0987654321",
            text: "This is a test SMS.",
        },
    },
    {
        messageType: MessageType.Slack,
        body: {
            fromUsername: "persona",
            toUsername: "recipient",
            timestamp: new Date().toISOString(),
            content: "This is a test Slack message.",
        },
    },
    {
        // Invalid Email (missing 'to' field)
        messageType: MessageType.Email,
        body: {
            from: "sender@example.com",
            to: "",
            datetime: new Date(),
            subject: "Hello",
            body: "This is a test email.",
        },
    },
    {
        // Invalid SMS (null 'sender' field)
        messageType: MessageType.SMS,
        body: {
            sender: "",
            to: "+0987654321",
            text: "Dead letter test SMS.",
        },
    }
];

export const readQueue = async () => Q;
