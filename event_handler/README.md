# ✅ **Challenge — Event Handler Registry (Typed Dispatcher)**

### **Difficulty:** Medium

### **Skills Tested:**

* Generics
* Type-safety
* Registry pattern
* API design
* Clean dispatch logic

---

## **Prompt**

Build a small, type-safe event system that supports multiple event types, each with a dedicated handler.

---

## **Tasks**

**1. Define a base `Event` type**
* `type: string`
* `payload: unknown`

**2. Define a generic `EventHandler` interface**

```ts
interface EventHandler<TEvent extends Event, TResult> {
  handle(event: TEvent): TResult;
}
```

**3. Create two concrete event types, for example:**
* `"user.signup"` (payload: name + email)
* `"payment.received"` (payload: userId + amount)

**4. Implement a handler for each event.**

**5. Build an `EventRegistry` that:**
* Registers handlers by event type
* Dispatches events to the correct handler
* Returns the handler's result in a typed way

**6. Write a small demo showing:**
* Registering handlers
* Dispatching each event
* Receiving the normalized result

---

## **Evaluation Criteria**

* Appropriate use of generics
* Correct separation between event shape and handler logic
* Clean registry data structure (Map, Record, or similar)
* Extensibility (adding new events should be simple)
* Quality of types and error handling

---

## **Optional Bonus**

* Support async handlers
* Add validation of payloads
* Introduce a unified `DispatchResult` shape