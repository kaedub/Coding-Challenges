# ✅ **Challenge — Unified Parser Interface (Strategy Pattern)**

### **Difficulty:** Easy–Medium

### **Skills Tested:**

* Types/interfaces
* Module boundaries
* Strategy pattern
* Abstractions

---

## **Prompt**

You are building a system that ingests different types of text messages.  
Each source (Email, SMS, Slack, etc.) has its own message structure, but your system needs a single, unified output format.

---

## **Details**
Build a unified, type-safe parsing interface that normalizes messages from multiple sources (Email, SMS, Slack, etc.) into a single consistent shape. Implement `processQueue(queue: QueueItem[]): MappedQueueResults` that:
- For each `QueueItem`, selects the correct parser by `messageType` and maps source fields to `Message { sender, receiver, payload }`.
- Treats a message as invalid if any of `sender`/`receiver`/`content` is an empty string; record a failure with a clear error string.
- Returns a `MappedQueueResults` with shape `{ [messageType]: { messages: Message[]; failed: FailedMessage[] } }`, creating buckets even if the first item for a type fails.


Example MappedQueueResults structure:
```json
{
  "email": {
    "messages": [ ...valid email messages... ],
    "failed": [ ...invalid email failures... ]
  },
  "sms": {
    "messages": [ ...valid SMS messages... ],
    "failed": [ ...invalid SMS failures... ]
  },
  ...
}
```
---

## **Evaluation Criteria**

* Consistent, normalized return structure
* Ability to read code and understand APIs
* Handling of invalid messages
* Separation of concerns and readability
* Clean, minimal parsing API

---

## **Bonus**

* Support async parsers
* Extensibility: strategy/registry pattern or plugin pattern, so adding a new `MessageType` only requires a new parser, not core changes.
