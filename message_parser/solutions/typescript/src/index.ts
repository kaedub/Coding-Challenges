import {
  EmailItem,
  Message,
  MessageType,
  MappedQueueResults,
  Parser,
  QueueItem,
  SlackItem,
  SMSItem,
} from "./types";
import { runTests } from "./tests/test";

export class ParserError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class EmailParser implements Parser<EmailItem> {
  async parse(data: EmailItem): Promise<Message> {
    const message: Message = {
      sender: data.from,
      receiver: data.to,
      payload: data.body,
    };
    return message;
  }
}

class SlackParser implements Parser<SlackItem> {
  async parse(data: SlackItem): Promise<Message> {
    const message: Message = {
      sender: data.fromUsername,
      receiver: data.toUsername,
      payload: data.content,
    };
    return message;
  }
}

class SMSParser implements Parser<SMSItem> {
  async parse(data: SMSItem): Promise<Message> {
    const message: Message = {
      sender: data.sender,
      receiver: data.to,
      payload: data.text,
    };
    return message;
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

export const processQueue = async (
  queue: QueueItem[]
): Promise<MappedQueueResults> => {
  const results = {} as MappedQueueResults;

  for (const item of queue) {
    const parser = getParser(item.messageType);
    try {
      const message = await parser.parse(item.body as any);
      if (!results[item.messageType]) {
        results[item.messageType] = {
          messages: [],
          failed: [],
        };
      }
      results[item.messageType].messages.push(message);
    } catch (e) {
      if (e instanceof ParserError) {
        const errorMessage = `${item.messageType} message error: ${e}`;
        results[item.messageType].failed.push({
          messageType: item.messageType,
          error: errorMessage,
        });
      } else {
        throw e;
      }
    }
  }

  return results;
};

const main = async () => {
  runTests();
};

main();
