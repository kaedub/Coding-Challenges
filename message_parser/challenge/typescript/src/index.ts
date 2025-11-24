/*
Build a system that ingests different types of text messages (Email, SMS, Slack, etc.)
and normalizes the valid and invalid messages.

Write a function processQueue that will parse each message and output a MappedQueueResults
object that contains valid messages and errors grouped by MessageType. A message is invalid
if any of the required fields are empty string.

Definitions:
- A valid message contains a sender, receiver, and body.
- An invalid message has empty strings in any of the required fields.

Requirements:
- Implement the processQueue function that takes an array of QueueItem objects.
- Return a MappedQueueResults object as defined below.


Example output structure:
{
  "email": {
    "messages": [ ...valid email messages... ],
    "errors": [ ...invalid email errors... ]
  },
  "sms": {
    "messages": [ ...valid SMS messages... ],
    "errors": [ ...invalid SMS errors... ]
  },
  ...
}
*/

import { readQueue, MessageType, QueueItem, EmailItem, SMSItem, SlackItem } from "./queue";

interface Message {
    sender: string;
    receiver: string;
    payload: string;
}

interface Error {
    errorMessage: string;
    payload: string;
}

type MappedQueueResults = Record<MessageType, {
    messages: Message[];
    errors: Error[];
}>



const processQueue = async (queue: QueueItem[]): Promise<MappedQueueResults> => {
    const results = {} as MappedQueueResults;

    /*
    TODO: Implement the logic to process the queue items.
    */

    return results;
}

const main = (async () => {
    const queue: QueueItem[] = await readQueue();
    const results = await processQueue(queue);
    console.log(JSON.stringify(results, null, 2));
});

main();