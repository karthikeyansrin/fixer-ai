# Fixer.ai

Fixer.ai is a multimodal AI agent that detects real-world problems using a camera and suggests fixes.

## Features

- Camera-based problem detection
- AI-powered analysis using Gemini
- Fix recommendations
- Mobile web interface

## Architecture

Mobile Web App → Cloud Run Backend → Gemini 2.5 Flash

## Live Demo

Frontend: https://fixer-frontend-7ppl7uazfa-uc.a.run.app/
Backend: https://fixer-backend-7ppl7uazfa-uc.a.run.app/analyze

## How It Works

1. The user opens the Fixer.ai web app.
2. The mobile camera preview appears.
3. The user points the camera at a scene.
4. The user taps **Scan Problem**.
5. The image is sent to the backend running on **Google Cloud Run**.
6. The backend sends the image to **Gemini 2.5 Flash** for multimodal analysis.
7. Gemini identifies problems and generates fix recommendations.
8. The results are displayed in the UI.

---
