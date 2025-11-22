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
Each source (Email, SMS, Slack, etc.) has its own raw message structure, but your system needs a single, unified output format.

---

## **Tasks**

**1. Define a standard type for a parsed message**  
(e.g., sender, content, timestamp, raw)

**2. Define a Parser interface**  
All parsers must implement the same `parse(raw: string)` method.

**3. Implement three parsers, one for each type:**
* Email
* SMS
* Slack

**4. Create a small factory or registry**  
Returns the appropriate parser based on a string key.

**5. Show working usage via a short demo function:**
* Takes an array of `{ type, raw }`
* Selects the correct parser
* Outputs the normalized `ParsedMessage`

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