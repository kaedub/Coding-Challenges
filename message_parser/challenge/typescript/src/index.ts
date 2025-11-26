/*
Coding Challenge: Normalize messages from a mixed queue.

Implement `processQueue(queue: QueueItem[]): Promise<MappedQueueResults>`.

Requirements:
- For each `QueueItem`, pick the correct parser by `messageType` and map source fields to `Message { sender, receiver, payload }`.
- A message is invalid if any of sender/receiver/content is an empty string.
- Return a `MappedQueueResults` object: `{ [messageType]: { messages: Message[]; failed: FailedMessage[] } }`.
- On valid message: push the normalized `Message` into `messages`.
- On invalid message: push `{ messageType, error: "some error message" }` into `failed`.

What to build:
- For each `QueueItem`, call the appropriate parse function and map to `Message { sender, receiver, payload }`.
- A message is invalid if any of sender/receiver/content is an empty string; record a failure with a clear error string.
- Return a `MappedQueueResults` where each `MessageType` has `{ messages: Message[]; failed: FailedMessage[] }`. Buckets should exist even if the first item for a type fails.

Tips:
- Review `types.ts` for input shapes, normalized output, and the `Parser<T>` contract.
- Favor an extensible design (e.g., Strategy/registry of parsers) so adding a new `MessageType` only requires a new parser, not core changes.
- Keep parsing and validation encapsulated per type.
*/

import {
  MappedQueueResults,
  QueueItem,
} from "./types";
import { runTests } from "./tests/test";

export const processQueue = async (
  queue: QueueItem[]
): Promise<MappedQueueResults> => {
  const results = {} as MappedQueueResults;
  /**
   * START HERE!
   */
  return results;
};

const main = async () => {
  runTests();
};

main();
