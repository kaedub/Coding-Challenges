mod queue;

use crate::queue::MessageType;

#[derive(Debug)]
enum ParseError {
    InvalidFormat,
}

#[derive(Debug)]
struct Message {
    message_type: MessageType,
    // timestamp: String,
    // sender: String,
    // receiver: String,
    // content: String,
    raw: String,
}

trait Parse {
    fn parse(&self, raw: &str) -> Result<Message, ParseError>;
}

struct EmailParser;

impl Parse for EmailParser {
    fn parse(&self, raw: &str) -> Result<Message, ParseError> {
        let msg = Message {
            message_type: MessageType::Email,
            raw: raw.to_string(),
        };
        Ok(msg)
    }
}

struct SMSParser;

impl Parse for SMSParser {
    fn parse(&self, raw: &str) -> Result<Message, ParseError> {
        let msg = Message {
            message_type: MessageType::SMS,
            raw: raw.to_string(),
        };
        Ok(msg)
    }
}

struct SlackParser;

impl Parse for SlackParser {
    fn parse(&self, raw: &str) -> Result<Message, ParseError> {
        let msg = Message {
            message_type: MessageType::Slack,
            raw: raw.to_string(),
        };
        Ok(msg)
    }
}

enum Parser {
    Email(EmailParser),
    SMS(SMSParser),
    Slack(SlackParser),
}

impl Parse for Parser {
    fn parse(&self, raw: &str) -> Result<Message, ParseError> {
        match self {
            Parser::Email(p) => p.parse(raw),
            Parser::SMS(p) => p.parse(raw),
            Parser::Slack(p) => p.parse(raw),
        }
    }
}

fn parser_factory(msg_type: MessageType) -> Option<Parser> {
    match msg_type {
        MessageType::Email => Some(Parser::Email(EmailParser)),
        MessageType::SMS => Some(Parser::SMS(SMSParser)),
        MessageType::Slack => Some(Parser::Slack(SlackParser)),
    }
}

fn parse_message(entry: queue::QueueEntry) -> Result<Message, ParseError>{
    let body = entry.body;
    let parser = parser_factory(entry.message_type);
    if let Some(p) = parser {
        p.parse(&body)
    } else {    
        Err(ParseError::InvalidFormat)
    }
}

fn main() {
    let queue = queue::build_queue();
    let mut messages = Vec::new();
    for entry in queue {
        if let Ok(message) = parse_message(entry) {
            messages.push(message);
        }
    }
    println!("Parsed messages: {:?}", messages);
}
