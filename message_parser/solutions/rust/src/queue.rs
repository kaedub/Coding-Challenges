use std::fmt;

#[derive(Debug)]
pub enum MessageType {
    Email,
    SMS,
    Slack,
}
impl fmt::Display for MessageType {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let s = match self {
            MessageType::Email => "email",
            MessageType::SMS => "text",
            MessageType::Slack => "slack",
        };
        write!(f, "{}", s)
    }
}

#[derive(Debug)]
pub struct QueueEntry {
    pub body: String,
    pub message_type: MessageType,
}

const EMAIL: &str = "
    To: <buxbaum.bixby.bray@email.com>  
    From: <mordecai.oshea@email.com>

    Subject: Meeting Reminder
    Date: Mon, 21 Jun 2021 10:00:00 -0400

    Body: Don't forget about our meeting tomorrow at 10 AM!
";
const SMS: &str = "
    Sender: +1234567890
    Receiver: +0987654321
    Date: 2021-06-21 09:00:00
    Text: Hey! Just wanted to remind you about our meeting tomorrow at 10 AM.
";
const SLACK: &str = "\"Mordecai Oshea\"->\"Buxbaum Bixby\"::2025-11-22T21:22:45Z::\"Hey! Just wanted to remind you about our meeting tomorrow at 10 AM.\"";
const INVALID: &str = "This is an invalid message format.";

pub fn build_queue() -> [QueueEntry; 4] {
    [
        QueueEntry {
            message_type: MessageType::Email,
            body: String::from(EMAIL),
        },
        QueueEntry {
            message_type: MessageType::SMS,
            body: SMS.to_string(),
        },
        QueueEntry {
            message_type: MessageType::Slack,
            body: SLACK.to_string(),
        },
        QueueEntry {
            message_type: MessageType::Email,
            body: INVALID.to_string(),
        },
    ]
}
