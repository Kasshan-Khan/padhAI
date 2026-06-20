# 🚀 padhAI: The Ultimate AI-Powered Learning Space

padhAI is a next-generation, highly immersive AI educational platform designed to supercharge your learning. Stop reading passive material and start engaging with intelligent tools that build personalized study plans, infinite quizzes, and generate highly structured notes directly from lectures.

Featuring a hyper-complex, glassmorphic UI locked into a stunning OLED Dark Mode, padhAI doesn't just work beautifully—it looks premium.

---

## ✨ Core Features

*   **🎙️ Iron Man Voice AI:** Banku isn't just a text bot. Talk directly to him using your microphone via the native Web Speech API, and he will read his AI-generated responses out loud!
*   **🌊 Liquid UI (Framer Motion):** The interface doesn't just load; it breathes. Enjoy physics-based spring animations, fluid layout morphing, and cascading staggers that make the app feel incredibly premium.
*   **📝 AI Notes Maker:** Paste any YouTube lecture URL, and our AI will transcribe, analyze, and generate highly structured, beautifully formatted markdown notes in seconds.
*   **🤖 Banku AI Tutor:** Your 24/7 AI study companion. Stuck on a concept? Ask Banku for instant, friendly, and context-aware explanations.
*   **⏱️ Smart Study Planner:** Stop procrastinating. Utilize the built-in **Pomodoro Planner** and the **AI Priority Engine (Eisenhower Matrix)** to effortlessly organize your day.
*   **🎓 Domain Personalization:** Whether you are studying for JEE, NEET, or Engineering, padhAI curates your workspace, offering interactive video lectures, cinematic teacher profiles, and dynamic quizzes tailored to your path.
*   **🎨 Hyper-Complex Aesthetics:** Experience a stunning frontend powered by TailwindCSS and DaisyUI, featuring deep gradients, interactive floating navigations, and 3D hover effects.

---

## 🔒 Enterprise-Grade Security

padhAI is built with security as a first-class citizen. Before hitting production, the API is hardened against the most common web vulnerabilities:

*   **Helmet.js:** Enforces strict HTTP security headers to protect against Cross-Site Scripting (XSS), clickjacking, and other injection attacks.
*   **Express Rate Limiter:** Protects the authentication and API endpoints from brute-force login attacks and basic DDoS flooding.
*   **Strict CORS Policy:** The backend only accepts traffic from verified frontend origins, preventing malicious cross-origin requests.
*   **JWT & Bcrypt:** All user sessions are secured using encrypted JSON Web Tokens, and user passwords are salted and hashed using Bcrypt.

---

## 🛠️ Installation & Local Setup

padhAI consists of three main architectures: a React/Vite Frontend, a Node.js/Express Backend, and a Python AI Model server.

### Prerequisites
*   [Node.js](https://nodejs.org/) (v18+)
*   [Python 3](https://www.python.org/)
*   [MongoDB](https://www.mongodb.com/) (Local or Atlas)

### 1. Setup the Node.js Backend
```bash
cd padhAI_backend
npm install
```
Create a `.env` file in `padhAI_backend`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_super_secret_jwt_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id
NODE_ENV=development
PYTHON_SERVER_URL=http://localhost:8000 # (Change to live Python URL in production)
FRONTEND_URL=http://localhost:5173 # (Change to live Vercel URL in production)
```
Start the server:
```bash
npm start
```

### 2. Setup the Python AI Server
```bash
cd padhAI_model
pip install -r requirements.txt
```
Create a `.env` file in `padhAI_model`:
```env
GOOGLE_API_KEY=your_google_gemini_api_key
```
Start the local server:
```bash
python server.py
```

### 3. Setup the React Frontend
```bash
cd padhAI_frontend
npm install
```
Create a `.env` file in `padhAI_frontend`:
```env
VITE_API_URL=http://localhost:5000 # (Change to live Node backend URL in production)
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```
Start the development server:
```bash
npm run dev
```

Your application should now be running securely at `http://localhost:5173`!

---

## 🌍 Production Deployment

For the best performance and scalability, we strongly recommend a **Decoupled Architecture**:

### 1. Python AI Server (Render)
*   **Root Directory:** `padhAI_model`
*   **Build Command:** `pip install -r requirements.txt`
*   **Start Command:** `gunicorn server:app` (Crucial for handling concurrent production traffic!)
*   **Env Variables:** `GOOGLE_API_KEY`

### 2. Node.js Backend (Render)
*   **Root Directory:** `padhAI_backend`
*   **Build Command:** `npm install`
*   **Start Command:** `node app.js`
*   **Env Variables:** Copy everything from your local `.env`, but set `NODE_ENV=production`, `PYTHON_SERVER_URL` to your live Python Render URL, and `FRONTEND_URL` to your Vercel URL (for CORS security).

### 3. React Frontend (Vercel)
*   **Root Directory:** `padhAI_frontend`
*   **Framework Preset:** Vite
*   **Env Variables:** Set `VITE_API_URL` to your live Node.js Render URL, and add your `VITE_GOOGLE_CLIENT_ID`.

---
*Built with ❤️ for students.*
