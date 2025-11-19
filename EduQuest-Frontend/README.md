# EduQuest-Frontend
Frontend for an educational competition platform — designed for interactive classroom teamwork and territory challenges.

<h1 align="center">🎓 GroupCards | Educational Team Game</h1>

<p align="center">
  <b>Interactive web-based card game for classroom teamwork and competition</b>  
  <br/>
  <i>Frontend MVP developed with React + TypeScript + Tailwind CSS</i>
</p>


---

## 🧩 Overview

**GroupCards** is an interactive educational card game designed for **elementary school students**.  
Three teams compete to **color as many cards as possible** by completing real-world challenges and making smart choices.  
The team with the most colored cards wins!

> 🧱 This repository includes the **Frontend MVP**, built as part of a paid educational project for a school client.

---

## 🃏 Game Flow

1. The main screen displays a **grid of 30 cards**.  
2. A **colored dice** randomly selects which team plays next (3 colors = 3 teams).  
3. The selected team chooses a card; the game operator clicks it.  
4. Each card type triggers a different outcome:

| 🪄 Card Type | 🧠 Description | 🏁 Result |
|--------------|----------------|-----------|
| **Task Card** | “You got a mission!” – external challenge | If successful → card turns team color |
| **Bonus Card** | “You earned another turn!” | Card turns color + team continues |
| **Loss Card** | “You lost your turn!” | No color change, turn ends |

5. When all cards are colored → the system announces the **winning team**.

---

## ⚙️ Tech Stack

| Stack | Usage |
|--------|--------|
| ⚛️ **React + TypeScript** | Component-based frontend architecture |
| 🎨 **Tailwind CSS** | Fast and responsive UI styling |
| 🧠 **Redux Toolkit** *(optional)* | State management for teams and game flow |
| ⚙️ **Vite** | Build and dev environment |

---

## 🚧 Project Status

> 🚀 **Currently in Active Development (MVP Phase)**  
> Includes layout, logic, and modals — backend, persistence, and animations will follow later.

---

## 📂 Project Structure

src/
├── components/ # Card, Dice, Modal, Scoreboard
├── pages/ # Game screen and layout
├── store/ # State management (turns, colors, score)
├── utils/ # Helpers and random functions
└── assets/ # Static files (icons, images)


---

## 🧠 Educational Purpose

The goal of **GroupCards** is to blend **teamwork, learning, and fun**.  
Students collaborate, think strategically, and celebrate success — all while engaging in meaningful classroom challenges.

---

## 🌟 Planned Upgrades

| Feature | Description |
|----------|--------------|
| ✨ **Card animations** | Flip, color transitions, hover effects |
| 💾 **Backend integration** | Save scores and match history |
| 🔊 **Sound & feedback** | Audio effects for events |
| 🎨 **Custom school theme** | Adapt branding and color palette |
| 🏆 **Results screen** | Summary and statistics for each match |

---

## 🛠️ Getting Started

```
git clone https://github.com/TamarBollak0077/EduQuest-Frontend
cd GroupCards-Frontend
npm install
npm run dev
```
Then open http://localhost:5173 in your browser.

---

## 📅 Development Roadmap

 Base structure and layout
 Game board and card grid
 Dice logic and turn system
 Card interactions (task, bonus, loss)
 Scoreboard and winner display
 UI polish and animations

---

## 👩‍💻 Developer

Developed by Tamar Bolak

Full Stack Developer | Educational Software Projects
📧 t0583230077.com

---

## 🪪 License

This project is proprietary and currently being developed for a private educational client.
All rights reserved © 2025.

---
