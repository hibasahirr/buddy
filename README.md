
<p align="center"><img src="./img.png" alt="Project Banner" width="100%"></p>

[sipbuddy] 🎯
Basic Details
Team Name: [beto]

Team Members: [Hiba sahir MAMO ]

Hosted Project Link: [https://buddy-black.vercel.app/]

Project Description: [A productivity-focused hydration tracker designed for 8-hour workdays. To build consistent habits, the app features 7 daily levels, each with two stages. Users must upload a real-time photo of themselves drinking water to silence the scheduled alarms, ensuring accountability through "proof of hydration" before moving to the next level.]

The Problem & Solution: [Sedentary professionals working 7–8 hour shifts often suffer from "dehydration amnesia," where high-intensity tasks lead them to neglect basic water intake. Standard health apps fail to solve this because their notifications are easily dismissed or snoozed without the user actually drinking anything. This leads to a cycle of midday fatigue, reduced cognitive focus, and long-term health issues, as there is no physical accountability or incentive to follow through with the reminder. This application solves the accountability gap by introducing a "proof of hydration" mechanism within a structured 7-level workday framework. By requiring a real-time photo upload to silence alarms, the app forces a physical break from work to ensure the hydration task is actually completed. This gamified, two-stage-per-level approach transforms a repetitive habit into a series of achievable milestones, ensuring workers maintain optimal hydration levels and mental clarity from the start of their shift to the finish.]

Technical Details
Technologies Used: [Node,javascript,html]

Features
[Conditional Alarm Logic: A trigger mechanism that prevents the alarm from being dismissed until a photo file path is successfully returned by the camera API.

Sequential State Tracking: A nested logic system that manages the "7 Levels, 2 Stages" progress, ensuring users cannot skip ahead without completing the current step.

Background Task Scheduling: Implementation of a background service (like WorkManager or NSTimer) to trigger precise hydration alerts across a full 8-hour work shift.

Media Intent Integration: Code that interfaces with the device hardware to launch the camera, capture "proof of hydration," and store the image metadata as completion data.]



Project Documentation
Screenshots: [Add 3 placeholders with captions]

Diagrams:

System Architecture:

Workflow:

[IF BACKEND DETECTED]

API Documentation
Base URL: [URL]

Endpoints: [List actual GET/POST endpoints found in code with params/response]

[IF MOBILE APP DETECTED]

Mobile Specifics
App Flow Diagram:

Installation: [APK/IPA/Build instructions]

Project Demo
Video: [Link]

AI Tools Used
Tool: Cursor
Purpose: [Explain usage: e.g., debugging, boilerplate, README generation]
Prompts: [Insert 2-3 example prompts used during the hack]

Team Contributions
License
This project is licensed under the MIT License.

Made with ❤️ at TinkerHub
Final Instruction:

Produce the full Markdown code now. Use [INSERT HERE] only for personal info (names, links, images). Generate all technical sections (commands, stack, features, API) based strictly on my code.
