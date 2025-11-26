import { processQueue } from "..";
import { MessageType, MappedQueueResults, QueueItem } from "../types";

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message);
  }
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
      fromUsername: "sender",
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
  },
];

const expectedResults: MappedQueueResults = {
  email: {
    messages: [
      {
        sender: "sender@example.com",
        receiver: "recipient@example.com",
        payload: "This is a test email.",
      },
    ],
    failed: [
      {
        messageType: MessageType.Email,
        error:
          "email message error: Error: Invalid message: missing required fields",
      },
    ],
  },
  sms: {
    messages: [
      {
        sender: "+0123456789",
        receiver: "+0987654321",
        payload: "This is a test SMS.",
      },
    ],
    failed: [
      {
        messageType: MessageType.SMS,
        error:
          "sms message error: Error: Invalid message: missing required fields",
      },
    ],
  },
  slack: {
    messages: [
      {
        sender: "sender",
        receiver: "recipient",
        payload: "This is a test Slack message.",
      },
    ],
    failed: [],
  },
};

const runTest = async (name: string, fn: () => Promise<void>) => {
  try {
    await fn();
    console.log(`✅ PASSED :: ${name}`);
  } catch (error) {
    console.error(`❌ FAILED :: ${name}`);
    console.error(error);
  }
};

export const runTests = async () => {
  runTest("Proccesses Queue", async () => {
    const results = await processQueue(Q);
    assert(
      JSON.stringify(results) === JSON.stringify(expectedResults),
      JSON.stringify(results, null, 2) +
        " \n!== \n" +
        JSON.stringify(expectedResults, null, 2)
    );
    console.log(JSON.stringify(results, null, 2));
  });
};
