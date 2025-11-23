mod queue;

use crate::queue::{MessageType, QueueEntry};

#[derive(Debug)]
enum ParseError {
    InvalidFormat(String),
}

#[derive(Debug)]
struct Message {
    message_type: MessageType,
    sender: String,
    receiver: String,
    content: String,
}

trait ParseLine {
    fn parse_line(&self, section: &str, text: &str) -> Result<String, ParseError>;
}

struct EmailParser;

impl EmailParser {
    fn parse_email_line(&self, text: &str) -> String {
        let email = text.replace('<', "").replace('>', "");
        email.trim().to_string()
    }

    fn parse_body_line(&self, text: &str) -> String {
        text.trim().to_string()
    }
}

impl ParseLine for EmailParser {
    fn parse_line(&self, section: &str, text: &str) -> Result<String, ParseError> {
        match section.trim() {
            "To" => Ok(self.parse_email_line(text)),
            "From" => Ok(self.parse_email_line(text)),
            "Body" => Ok(self.parse_body_line(text)),
            _ => Err(ParseError::InvalidFormat(
                format!("Failed to parse Email line {}: {}", section, text,).to_string(),
            )),
        }
    }
}

struct SMSParser;

impl ParseLine for SMSParser {
    /*
    Sender: +1234567890
    Receiver: +0987654321
    Date: 2021-06-21 09:00:00
    Text: Hey! Just wanted to remind you about our meeting tomorrow at 10 AM.
     */
    fn parse_line(&self, section: &str, text: &str) -> Result<String, ParseError> {
        match section.trim() {
            "Sender" => Ok(text.trim().to_string()),
            "Receiver" => Ok(text.trim().to_string()),
            "Text" => Ok(text.trim().to_string()),
            _ => Err(ParseError::InvalidFormat(
                format!("Failed to parse SMS line {}: {}", section, text,).to_string(),
            )),
        }
    }
}

struct SlackParser;
impl ParseLine for SlackParser {
    fn parse_line(&self, section: &str, text: &str) -> Result<String, ParseError> {
        match section.trim() {
            "Sender" => Ok(text.trim().to_string()),
            "Receiver" => Ok(text.trim().to_string()),
            "Text" => Ok(text.trim().to_string()),
            _ => Err(ParseError::InvalidFormat(
                format!("Failed to parse Slack line {}: {}", section, text,).to_string(),
            )),
        }
    }
}

enum Parser {
    Email(EmailParser),
    SMS(SMSParser),
    Slack(SlackParser),
}

impl Parser {
    fn parse(&self, entry: QueueEntry) -> Result<Message, ParseError> {
        let mut content = String::new();
        let mut sender = String::new();
        let mut receiver = String::new();
        for line in entry.body.lines() {
            if let Some((section, text)) = line.split_once(": ") {
                let section = section.trim();
                let text = match self {
                    Parser::Email(p) => p.parse_line(section, text),
                    Parser::SMS(p) => p.parse_line(section, text),
                    Parser::Slack(p) => p.parse_line(section, text),
                };

                match section {
                    "To" | "Sender" => {
                        match text {
                            Ok(v) => sender = v,
                            Err(e) => println!("{:#?}", e),
                        }
                    }
                    "From" | "Receiver" => {
                        match text {
                            Ok(v) => receiver = v,
                            Err(e) => println!("{:#?}", e),
                        }
                    }
                    "Body" | "Text" => {
                        match text {
                            Ok(v) => content = v,
                            Err(e) => println!("{:#?}", e),
                        }
                    }
                    _ => {}
                }
            }
        }
        if content.is_empty() || sender.is_empty() || receiver.is_empty() {
            Err(ParseError::InvalidFormat(format!(
                "Could not parse {} message: `{}`",
                entry.message_type, entry.body
            )))
        } else {
            let msg = Message {
                content,
                sender,
                receiver,
                message_type: entry.message_type,
            };
            Ok(msg)
        }
    }
}

fn parse_message(entry: QueueEntry) -> Result<Message, ParseError> {
    let parser = match entry.message_type {
        MessageType::Email => Parser::Email(EmailParser),
        MessageType::SMS => Parser::SMS(SMSParser),
        MessageType::Slack => Parser::Slack(SlackParser),
    };
    Ok(parser.parse(entry)?)
}

fn main() {
    println!("Starting...");
    let queue = queue::build_queue();
    let mut messages = Vec::new();
    let mut errors: Vec<String> = Vec::new();
    for entry in queue {
        match parse_message(entry) {
            Ok(m) => messages.push(m),
        Err(e) => match e {
            ParseError::InvalidFormat(msg) => errors.push(msg),
        },
        }
    }
    println!("Messages: {}", messages.len());
    for m in &messages {
        println!("{}: {} -> {}", m.message_type, m.sender, m.receiver);
        println!("{}", m.content);
    }
    println!("Errors: {}", errors.len());
    for e in &errors {
        println!("{}", e);
    }
}
