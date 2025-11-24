import { MessageType, QueueItem } from "./types";

const Q: QueueItem[] = [
    {
        messageType: MessageType.Email,
        data: {
            from: "sender@example.com",
            to: "recipient@example.com",
            datetime: new Date(),
            subject: "Hello",
            body: "This is a test email.",
        },
    },
    {
        messageType: MessageType.SMS,
        data: {
            sender: "+0123456789",
            to: "+0987654321",
            text: "This is a test SMS.",
        },
    },
    {
        messageType: MessageType.Slack,
        data: {
            fromUsername: "persona",
            toUsername: "recipient",
            timestamp: new Date().toISOString(),
            content: "This is a test Slack message.",
        },
    },
    {
        // Invalid Email (missing 'to' field)
        messageType: MessageType.Email,
        data: {
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
        data: {
            sender: "",
            to: "+0987654321",
            text: "Dead letter test SMS.",
        },
    }
];

export const readQueue = async () => Q;
