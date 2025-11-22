# ✅ **Challenge — In-Memory Message Queue With Handlers**

### **Difficulty:** Medium

### **Skills Tested:**

* Abstraction boundaries
* Type modeling
* Event-driven design
* Async handling
* Concurrency thinking
* Extensibility via handlers
* Data-flow reasoning

---

## **Prompt**

You’re going to build a small **in-memory message bus**.

The system will receive messages with a topic, and dispatch them to one or more registered handlers for that topic.

---

## **Tasks**

**1. Define a `Message` type**
Each message has:

```ts
{
  topic: string;
  payload: any;
}
```

**2. Define a `MessageHandler` interface**
Each handler must implement:

```ts
handle(message: Message): Promise<void>;
```

**3. Implement a `MessageBus` class that can:**

* `subscribe(topic, handler)` — register a handler for a topic
* `publish(message)` — enqueue a message for processing
* `start()` — begin processing messages asynchronously
* Process messages **FIFO**
* Dispatch a message to **all** handlers registered to its topic
* Support a **concurrency limit** (e.g., only N messages processed at once)

**4. Demonstrate usage**
Show how to:

* Subscribe two handlers to `"user.created"`
* Publish three messages
* Start processing
* Show that all handlers receive the correct messages

---

## **What to Evaluate**

* Clean separation of queue logic vs handler logic
* Safety around async code (not blocking, no missed messages)
* Reasonable concurrency (simple semaphore, counter, or worker-pool)
* Types are crisp and clear
* Correctness of message flow
* Extensibility (adding new topics/handlers requires no core changes)
