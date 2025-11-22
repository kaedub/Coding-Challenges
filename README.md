# ✅ **Coding Challenges Collection**

Welcome! This repository contains a set of thoughtfully designed programming challenges focused on type safety, abstraction, and clean architecture. Each challenge is self-contained and targets specific skills relevant to modern software engineering. Solutions are implemented in Typescript, Rust, and Python.

---

## **Challenges Overview**

### **1. Unified Parser Interface (Strategy Pattern)**
Build a system that ingests different types of text messages (Email, SMS, Slack, etc.) and normalizes them into a single output format. Emphasizes interface design, the Strategy pattern, and clean module boundaries.

- Design a standard parsed message type
- Implement a parser interface and three concrete parsers
- Use a factory/registry for parser selection
- Demo with unified output

---

### **2. Event Handler Registry (Typed Dispatcher)**
Create a type-safe event system supporting multiple event types, each with a dedicated handler. Focuses on generics, registry patterns, and clean dispatch logic.

- Define base event and handler types
- Implement concrete event types and handlers
- Build a registry for handler management and event dispatch
- Demo registering and dispatching events

---

### **3. In-Memory Message Queue With Handlers**
Develop an in-memory message bus that dispatches messages to registered handlers by topic, with support for async processing and concurrency limits. Highlights event-driven design, async handling, and extensibility.

- Define message and handler interfaces
- Implement a message bus with subscribe, publish, and start methods
- Ensure FIFO processing and concurrency control
- Demo with multiple handlers and messages

---

## **How to Use**

Each challenge folder contains its own README with detailed requirements and evaluation criteria. Solutions can be added in the provided language subfolders. Explore, implement, and learn!
