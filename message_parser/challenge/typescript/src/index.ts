/**
Message Parsing System — Coding Challenge (45 minutes)

You are building a system that can parse different kinds of inbound messages.
Each message type (email, SMS, Slack, etc.) arrives in its own data format,
but the rest of the system needs a single, normalized representation of a message.

Your goal is to design a small, extensible message parsing framework. Complete the
`processQueue` function in to handle an array of incoming messages of various types,
parse them into a common format, and return the results. Currently, the function is
a stub that returns nothing, but you will implement the full logic and return value.

Your framework should:
- Be extensible to support new message types in the future.
- Clearly separate parsing logic for each message type.
- Validate the input data and surface any errors in a consistent way.
- Return a mapping of message types to arrays of normalized messages.

Take a look at ./tests/test.ts for examples of the input data formats
and the expected normalized output.

*/

import { MappedQueueResults, QueueItem } from "./types";


export const processQueue = async (queue: QueueItem[]): Promise<MappedQueueResults> => {
  const results: MappedQueueResults = {} as MappedQueueResults;

  // START HERE: implement the message parsing logic

  return results;
}
