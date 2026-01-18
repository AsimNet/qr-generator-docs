# ⚡ Fast QR Generator for Google Sheets

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Platform](https://img.shields.io/badge/platform-Google%20Sheets-34A853.svg)
[![Support](https://img.shields.io/badge/Support-Ko--fi-FF5E5B.svg)](https://ko-fi.com/asimnet)
[![Twitter](https://img.shields.io/badge/Twitter-@asimnet-1DA1F2.svg)](https://twitter.com/asimnet)

**Generate hundreds of QR codes in seconds, directly in your Google Sheets!**

[Install Add-on](#installation) • [Features](#features) • [How to Use](#how-to-use) • [Support](#support)

</div>

---

## 🌟 Features

| Feature | Description |
|---------|-------------|
| ⚡ **Ultra-Fast** | Parallel generation using Web Workers (1000+ QR/second) |
| 🔒 **100% Offline** | All processing happens in your browser - no data sent externally |
| 📑 **Multi-Sheet** | Process multiple sheets simultaneously |
| 🌐 **Bilingual** | Full Arabic & English interface |
| 🎨 **Customizable** | Adjust QR code size (80-400 pixels) |
| 🆓 **Free Forever** | No limits, no watermarks, no hidden costs |

---

## 📸 Screenshots

<div align="center">

| Main Interface | Generation Progress | Results |
|:--------------:|:-------------------:|:-------:|
| ![Interface](screenshots/interface.png) | ![Progress](screenshots/progress.png) | ![Results](screenshots/results.png) |

</div>

---

## 🚀 Installation

### From Google Workspace Marketplace (Recommended)

1. Open any Google Sheet
2. Go to **Extensions** → **Add-ons** → **Get add-ons**
3. Search for **"Fast QR Generator"**
4. Click **Install**

### Manual Installation (For Developers)

1. Open [Google Apps Script](https://script.google.com)
2. Create a new project
3. Copy `Code.gs` and `Sidebar.html` into your project
4. Save and refresh your Google Sheet
5. Find **QR Generator** in the menu

---

## 📖 How to Use

### Step 1: Open the Add-on
```
Menu → 🔲 QR Generator → Open Generator
```

### Step 2: Configure
1. ✅ Select the sheets you want to process
2. 📊 Choose **Source column** (data to encode)
3. 🎯 Choose **Target column** (where QR codes will appear)
4. 📐 Set QR code size (default: 150px)

### Step 3: Generate
Click **⚡ Start Generation** and watch the magic happen!

---

## 🔧 Technical Details

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  PHASE 1: Browser (Parallel Generation)                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Web Worker 1 ─┐                                     │   │
│  │  Web Worker 2 ─┼──→ Generate QR codes in parallel   │   │
│  │  Web Worker 3 ─┤     (uses all CPU cores)           │   │
│  │  Web Worker 4 ─┘                                     │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  PHASE 2: Google Sheets (Batch Save)                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Write 50 images per batch → Single flush()         │   │
│  │  Minimized API calls for maximum speed              │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Performance

| Data Size | Generation Time | Save Time |
|-----------|-----------------|-----------|
| 100 rows | ~0.1 seconds | ~5 seconds |
| 500 rows | ~0.5 seconds | ~25 seconds |
| 1000 rows | ~1 second | ~50 seconds |

*Note: Save time depends on Google Sheets API limits*

### Technologies Used

- **QR Generation**: [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) library
- **Parallel Processing**: Web Workers API
- **UI Framework**: Vanilla JavaScript + CSS
- **Platform**: Google Apps Script

---

## 📁 Project Structure

```
fast-qr-generator/
├── Code.gs                 # Main Apps Script backend
├── Sidebar.html            # Frontend UI with embedded QR library
├── appsscript.json         # Manifest file
├── privacy-policy.html     # Privacy Policy page
├── terms-of-service.html   # Terms of Service page
├── README.md               # This file
└── screenshots/            # Screenshots for documentation
    ├── interface.png
    ├── progress.png
    └── results.png
```

---

## 🔒 Privacy & Security

**We take your privacy seriously:**

- ✅ All QR generation happens **locally in your browser**
- ✅ **No data** is sent to external servers
- ✅ **No analytics** or tracking
- ✅ **No cookies** used
- ✅ We have **zero access** to your spreadsheet data

📄 [Read Full Privacy Policy](privacy-policy.html)

---

## 💡 Use Cases

- 📦 **Inventory Management** - Track assets with QR codes
- 🎫 **Event Tickets** - Generate ticket QR codes in bulk
- 💼 **Business Cards** - Create vCard QR codes
- 🏷️ **Product Labels** - Generate product QR codes
- 🎓 **Student IDs** - Batch create student ID QR codes
- 🍽️ **Restaurant Menus** - Link tables to digital menus
- 📧 **Marketing** - Track campaign URLs

---

## 🌐 Language Support

The add-on supports:

| Language | Status |
|----------|--------|
| 🇸🇦 Arabic (العربية) | ✅ Full RTL support |
| 🇺🇸 English | ✅ Complete |

Toggle between languages with the **EN/ع** button.

---

## ❓ FAQ

<details>
<summary><b>Why are QR codes not appearing?</b></summary>

- Make sure the target column is different from the source column
- Check that source cells contain data
- Try refreshing the page and running again

</details>

<details>
<summary><b>How many QR codes can I generate?</b></summary>

There's no limit! However, very large datasets (10,000+) may take longer due to Google Sheets API limits.

</details>

<details>
<summary><b>Can I use this for commercial purposes?</b></summary>

Yes! The add-on is free for personal and commercial use.

</details>

<details>
<summary><b>Is my data safe?</b></summary>

Absolutely. All processing happens in your browser. We never see or store your data.

</details>

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. 🐛 Report bugs via [Issues](../../issues)
2. 💡 Suggest features via [Issues](../../issues)
3. 🔧 Submit pull requests

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## ☕ Support the Developer

If you find this add-on useful, consider supporting development:

<div align="center">

[![Ko-fi](https://img.shields.io/badge/Buy%20me%20a%20coffee-Ko--fi-FF5E5B?style=for-the-badge&logo=ko-fi)](https://ko-fi.com/asimnet)

</div>

---

## 📞 Contact

- **Twitter/X:** [@asimnet](https://twitter.com/asimnet)
- **Ko-fi:** [ko-fi.com/asimnet](https://ko-fi.com/asimnet)

---

<div align="center">

Made with ❤️ by [Asim](https://twitter.com/asimnet)

**If this project helped you, please ⭐ star the repository!**

</div>
