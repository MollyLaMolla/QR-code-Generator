# 🔳 QR Code Gen

A fast and interactive QR code generator.  
Enter text or a URL, preview the QR instantly, zoom it, and download it as a PNG.

---

## 🧠 Overview

QR Code Gen is a full‑stack QR generator built with **Node.js**, **Express**, **HTML, CSS, JavaScript**, and the **qr-image** library.  
The app takes any text or URL, sends it to a backend endpoint, and returns a freshly generated PNG QR code.

The interface includes prefix options, live preview, zoom mode, a loader animation, and a one‑click download button.  
Everything is smooth, animated, and responsive.

---

## 🔥 Features

- ✏️ **Text/URL input** with editable field  
- 🔗 **Prefix selector** (`https://`, or none)  
- ⚡ **Instant QR generation** via `/qr?text=...` endpoint  
- 🖼️ **Live preview** of the QR code  
- 🔍 **Zoom mode** (click to enlarge / shrink)  
- ⏳ **Loader animation** while generating  
- 📥 **Download button** (auto‑names the PNG file)  
- 🚫 **No caching** — always generates a fresh QR  
- 🧪 Optional artificial delay for testing loaders  
- 📱 Fully responsive UI  
- 🎨 Smooth animations and transitions  

---

## 🛠️ How It Works

### **Backend (Node + Express)**
- Serves static front‑end files  
- Exposes `/qr` endpoint  
- Generates PNG QR codes using **qr-image**  
- Supports:
  - Custom text  
  - Error correction level  
  - Size and margin  
  - Optional delay for debugging  
- Sends the PNG stream directly to the client  
- Disables caching for consistent results  

### **Frontend**
- Builds the final URL from:
  - Selected prefix  
  - User input  
- Sends request to `/qr?text=...`  
- Shows loader until the QR is fully loaded  
- Updates:
  - Preview image  
  - Download link  
  - Truncated text preview  
- Zooms the QR on click  
- Handles Enter/Escape keyboard shortcuts  

---

## 🧩 Tech Stack

**Frontend:**
- HTML  
- CSS  
- JavaScript  
- jQuery

**Backend:**
- Node.js  
- Express   
- Body‑parser  

---

## 👊 Installation

```text
# Clone the project
git clone https://github.com/MollyLaMolla/QR-code-Generator.git
cd qr-code-generator

# Install dependencies
npm install

# Start the server
npm start
```
## 🌐 Live Demo
[Try it here](https://qr-code-generator-fog7.onrender.com/)

## 📄 License
This project is licensed under the ISC License.
