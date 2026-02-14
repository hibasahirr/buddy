# buddy
<p align="center"><img src="./img.png" alt="Project Banner" width="100%"></p>

SipBuddy 🎯
Basic Details
Team Name: [beto]

Team Members: [Hiba sahir MAMO ]

Hosted Project Link: [https://buddy-black.vercel.app/]


Project Description:
SipBuddy is a gamified hydration tracking web application designed to transform water intake into an engaging daily mission. Using a level-based system and interactive verification, it ensures users stay hydrated through a structured and motivating experience.

The Problem & Solution:
Many people struggle to maintain consistent hydration due to forgetfulness or lack of motivation. SipBuddy solves this by gamifying the process—dividing the daily intake into 7 progressive levels with mandatory cooldown periods and an AI-simulated "Live Verify" mechanism that requires photographic proof to stop hydration alarms.

Technical Details
Technologies Used:
- **Frontend**: React 19, Vite, TypeScript
- **Styling**: Vanilla CSS, Framer Motion (Animations), Lucide React (Icons)
- **Verification**: Web Camera API (File Upload/Capture), Web Audio API (Alarm System)
- **Data Persistence**: LocalStorage API

Features
1. **Gamified 7-Level Mission**: A daily quest where users must unlock 7 distinct levels, each representing a hydration milestone.
2. **AI Scanning Simulation**: A "Live Verify" feature that simulates AI detection of hydration activity using uploaded/captured photos with real-time status updates and visual feedback.
3. **Smart Alarm & Cooldown System**: Integrated auditory and visual alarms that activate when it's time to drink, coupled with mandatory cooldown periods between stages to ensure optimal water absorption.
4. **Interactive Analytics Dashboard**: A comprehensive view of the user's progress, showing daily stats, level completion status, and hydration history.

Implementation
Installation:
```bash
npm install
```

Run:
```bash
npm run dev
```

Project Documentation
Screenshots:
- ![Dashboard Overview](./Screenshot 2026-02-14 102036.png
)
  *Main Dashboard showing progressive levels and daily progress.*
- ![Live Verification](./Screenshot 2026-02-14 102049.png
)
  *The "Live Verify" interface with AI scanning simulation and camera integration.*
- ![Analytics View](./Screenshot 2026-02-14 102115.png
)
  *Detailed analytics showing hydration history and mission statistics.*

Diagrams:

System Architecture:
[INSERT ARCHITECTURE DIAGRAM HERE]

Workflow:
[INSERT WORKFLOW DIAGRAM HERE]

AI Tools Used
Tool: Cursor
Purpose: Used as the primary IDE for developing the entire application, including boilerplate generation, implementing core hydration logic via state management, creating the complex CSS-based animations, and generating this documentation.
Prompts:
- "Create a gamified hydration dashboard using Framer Motion with 7 levels that unlock sequentially."
- "Implement a simulated AI scanning overlay for a camera verification component in React."
- "Design a sleek, sky-blue glassmorphism theme with a custom alarm system using Web Audio API."

Team Contributions
- [hiba]: Frontend Development & UI/UX Design
- [hiba]: Core Logic & Verification System

License
This project is licensed under the MIT License.

Made with ❤️ at TinkerHub
