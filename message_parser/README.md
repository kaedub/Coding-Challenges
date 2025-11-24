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
Build a system that ingests different types of text messages (Email, SMS, Slack, etc.)
and normalizes the valid and invalid messages.

Write a function processQueue that will parse each QueueItem object and output a MappedQueueResults
object that contains valid messages and errors grouped by MessageType. A message is invalid
if any of the required fields are empty string.

Definitions:
- A valid message contains a sender, receiver, and body.
- An invalid message has empty strings in any of the required fields.

Requirements:
- Implement the processQueue function that takes an array of QueueItem objects.
- Return a MappedQueueResults object as defined below.


Example MappedQueueResults structure:
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

---

## **Evaluation Criteria**

* Clean, well-typed interface for the parser
* Consistent return shape across all implementations
* Sensible choice of data structures (factory, map, classes, etc.)
* Separation of concerns (no giant if/switch in parse methods)
* Readability & maintainability

---

## **Optional Bonus**

* Add basic error handling
* Make the registry extensible (plugin pattern)