# 📘 Event QR Scanner Workflow Guide

This guide documents the full workflow for setting up and maintaining an **event check‑in system** using **Google Sheets (Apps Script)** and a **QR Scanner PWA (GitHub Pages)**.

---

## 1️⃣ Google Sheets Backend

### Sheet Structure
Each tab (guest list) must include:

- A: ID
- B: Guest Name
- C: Guest Email
- D: Guest Phone
- E: CheckIn_URL (Apps Script endpoint)
- F: QR_URL (Google Chart QR image)
- G: CheckedIn (TRUE/FALSE status)
- H: CheckIn_Time (Timestamp)
- I: Notes
- J: SHORT_LINK (TinyURL)

---

### Apps Script Functions
- `generateAllTabs()` → Builds IDs, CheckIn_URLs, QR_URLs, SHORT_LINKs
- `processNewRowsAllTabs()` → Auto‑generate QR/link for new rows
- `onEdit(e)` → Generates QR/link when cells are edited
- `resetCheckinsAllTabs()` → Clears CheckedIn and CheckIn_Time across all tabs

---

### Menu Setup
```
function onOpen() {
  const ui = SpreadsheetApp.getUi();

  ui.createMenu('QR Tools')
    .addItem('Generate IDs + Links + QR (ALL TABS)', 'generateAllTabs')
    .addToUi();

  ui.createMenu('Check-in Tools')
    .addItem('Reset Check-ins (ALL TABS)', 'resetCheckinsAllTabs')
    .addToUi();
}
```

---

## 2️⃣ QR Scanner PWA (GitHub Pages)

### File Structure
```
/event-scanner-pwa
 ├── index.html
 ├── manifest.json
 ├── service-worker.js
 ├── icon-192.png
 └── icon-512.png
```

---

### Manifest.json (PWA)
```
{
  "name": "Event QR Scanner",
  "short_name": "Scanner",
  "start_url": "./",
  "display": "standalone",
  "background_color": "#f7f7f7",
  "theme_color": "#2d7ef7",
  "icons": [
    { "src": "icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

Add to `<head>`:
```
<link rel="manifest" href="manifest.json" />
<link rel="icon" href="icon-192.png" type="image/png" />
```

---

## 3️⃣ Git/GitHub Workflow

Basic Workflow:
```
git status
git add -A
git commit -m "Update message"
git pull origin main --rebase
git push origin main
```

---

## 4️⃣ Debug/Reset Playbook

- **Menu missing** → run `onOpen()` manually in Apps Script
- **QRs not generating** → run `QR Tools → Generate IDs + Links + QR`
- **Scanner not updating** → hard refresh, redeploy index.html
- **PWA icon generic** → check manifest + icons, clear cache, reinstall
- **Push fails** → `git pull origin main --rebase`, then push again

---

## 5️⃣ Terminal Workflow Process (Git Commands + Opening Files)

### Basic Commands
```bash
# Check status
git status

# Stage all files
git add -A

# Commit with message
git commit -m "Commit message" //commit message fescribes the changes made

# Sync with remote before push
git pull origin main --rebase

# Push changes
git push origin main
```

### Opening Files From Terminal
- **On Mac (open in default editor):**
```bash
open index.html
open manifest.json
```

- **View content directly in terminal:**
```bash
cat index.html
cat manifest.json
```

### Common Fixes
- **Push rejected (remote has new commits):**
```bash
git pull origin main --rebase
git push origin main
```

- **Wrong identity:**
```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

- **Repo moved:**
```bash
git remote set-url origin https://github.com/Dynamads/event-scanner-pwa.git
```

✅ Always **pull with rebase before push** to avoid conflicts.

---
