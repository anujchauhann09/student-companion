# Student Companion 🎓

**Generative UI Student Assistant built with Tambo**

Student Companion is an intent-driven study assistant that dynamically adapts its user interface based on what a student says — not menus, tabs, or dashboards.

Instead of forcing students to navigate static workflows, the UI responds intelligently to intents like planning exams, revising topics, tracking progress, focusing with Pomodoro sessions, or getting motivation.

---

## 🚀 Why Student Companion?

Students often struggle not because of lack of content, but because of **decision fatigue**:
- What should I study next?
- Am I on track?
- How do I stay focused?
- What should I do when I feel overwhelmed?

Student Companion solves this by combining **Generative UI + Natural Language**, making studying simpler, calmer, and more human.

---

## ✨ Key Features

### 📅 Study Plan Generator
- Instantly generates a study plan when exams are mentioned
- Escalates from high-level plan to detailed daily schedules
- Adapts to remaining days and subjects

### 🔁 Revision Mode
- Highlights key high-priority topics
- Interactive revision checklist (Done / Pending)
- Designed for fast, focused revision

### 📊 Progress Tracker
- Overall progress snapshot with visual feedback
- Section-wise progress breakdown
- Transparent, estimated progress (no fake tracking)

### ⏱ Focus / Pomodoro Tool
- Natural language controlled focus sessions
- Dynamic timer durations (e.g. “Focus for 10 minutes”)
- Simple session counter and controls

### 🌱 Motivation & Guidance
- Calm encouragement when users feel stressed
- Practical tips (no toxic positivity)
- Clear next-step suggestions

---

## 🧠 How It Works (Architecture)

Student Companion is built around **Generative UI principles**:

1. The user types in natural language
2. Tambo AI interprets the intent
3. The AI selects the most relevant UI component
4. Props are passed using validated schemas
5. React renders the interface dynamically

There are **no hardcoded flows or if-else routing**.

UI is used where structure matters.  
Text is used where content matters.

---

## 🧩 Tech Stack

- **Frontend**: React, Next.js
- **Generative UI**: Tambo AI SDK
- **Styling**: Tailwind CSS
- **Schema Validation**: Zod

No backend or database is required for the core experience.

---

## ⚙️ Setup & Running Locally

### 1️⃣ Clone the repository
```bash
git clone <your-repo-url>
cd student-companion
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Initialize Tambo
```bash
npx tambo init
```

This will:
- Create a Tambo project
- Generate an API key
- Save it automatically to `.env.local`

### 4️⃣ Start the development server
```bash
npm run dev
```

Open **http://localhost:3000**  
Click **“Start Studying”** to enter the chat experience.

---

## 📝 Notes

- The app uses **client-side Generative UI** via `TamboProvider`
- All UI components are registered in `src/lib/tambo.ts`
- No backend services are required for demo or judging
- Progress and plans are intentionally transparent & user-driven

---

## 📈 Learning & Growth

This project helped reinforce:
- Designing AI-powered products responsibly
- Avoiding overengineering in hackathons
- Building trust through transparency
- Using UI intentionally, not excessively

---

**Student Companion is not about more features — it’s about the right UI at the right moment.**
