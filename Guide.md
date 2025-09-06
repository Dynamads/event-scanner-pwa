# 📘 Event QR Scanner Workflow Guide

This guide documents the full workflow for setting up and maintaining an **event check‑in system** using **Google Sheets (Apps Script)** and a **QR Scanner PWA (GitHub Pages)**.

---

## 1️⃣ Google Sheets Backend

### Sheet Structure
Each tab (guest list) must include:

| Col | Name         | Purpose                                            |
|-----|--------------|----------------------------------------------------|
| A   | ID           | Unique guest identifier                            |
| B   | Guest Name   | Full name of guest                                 |
| C   | Guest Email  | Optional                                           |
| D   | Guest Phone  | Optional                                           |
| E   | CheckIn_URL  | Unique check‑in URL for Apps Script WebApp         |
| F   | QR_URL       | Google Chart QR image link                         |
| G   | CheckedIn    | TRUE / FALSE status                               |
| H   | CheckIn_Time | Timestamp of check‑in                             |
| I   | Notes        | Freeform notes                                    |
| J   | SHORT_LINK   | TinyURL pointing to QR image (used for SMS/email) |

---

### Apps Script Functions
- **`generateAllTabs()`** → Builds IDs, CheckIn_URLs, QR_URLs, SHORT_LINKs.
- **`processNewRowsAllTabs()`** → Auto‑generate QR/link for new rows.
- **`onEdit(e)`** → Generates QR/link when cells are edited.
- **`resetCheckinsAllTabs()`** → Clears CheckedIn and CheckIn_Time across all tabs.

---

### Menu Setup
```js
function onOpen() {
  const ui = SpreadsheetApp.getUi();

  ui.createMenu('QR Tools')
    .addItem('Generate IDs + Links + QR (ALL TABS)', 'generateAllTabs')
    .addToUi();

  ui.createMenu('Check-in Tools')
    .addItem('Reset Check-ins (ALL TABS)', 'resetCheckinsAllTabs')
    .addToUi();
}

to open terminal: oladoyinfaturoti@Oladoyins-MacBook-Air scanner files % 
