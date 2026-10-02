# SyncSpace — Interactive Digital Health Platform

SyncSpace is a modern, interactive landing page concept for a next-generation digital health platform designed to make online therapy more engaging through secure video sessions and real-time collaborative therapeutic activities.

This project was developed as a **Frontend Developer Intern Screening Assignment**.

## Tech Stack

- **React 19** — Component-based frontend development
- **TypeScript 6** — Type-safe application development
- **Vite 8** — Development server and production build tooling
- **Tailwind CSS 4** — Responsive and utility-first styling
- **Framer Motion** — Animations, transitions, micro-interactions, and interactive UI effects
- **Lucide React** — UI icons
- **clsx** — Conditional class name handling
- **tailwind-merge** — Tailwind class merging
- **PostCSS** — CSS processing
- **Autoprefixer** — Cross-browser CSS compatibility
- **Oxlint** — JavaScript/TypeScript linting

---

## Features

### 1. Hero Section with Live UI Mockup

The hero section communicates SyncSpace's core value proposition for psychologists, counselors, and specialized/neurodiverse learners.

It includes a fully coded live-session UI mockup featuring:

- Therapist video area
- Client video area
- Live session status
- Session timer
- Session controls
- Collaborative activity area
- Synchronization indicators
- Security/status indicators

The mockup is responsive and animated using React and Framer Motion.

---

### 2. Interactive Module Playground

The main technical highlight is an interactive showcase of four real-time therapeutic modules:

| Module | Purpose |
|---|---|
| **Maze** | Executive functioning & focus |
| **Bubble Splash** | Sensory regulation & reflexes |
| **Talking Calculator** | Numeracy & SLD support |
| **Memory Match** | Working memory & pattern recall |

Users can switch between modules without reloading the page, with smooth animated transitions.

---

### 3. Playable Memory Match

The Memory Match module is fully playable directly inside the landing page.

It includes:

- Interactive card flipping
- Matching logic
- Match tracking
- Mismatch handling
- Completion state
- Replay functionality
- Animated feedback

This demonstrates real React state management and interactive component development rather than a static product mockup.

---

### 4. Interactive Bubble Splash

Bubble Splash provides an interactive sensory-style experience where users can click or tap floating bubbles.

Interactions include:

- Bubble popping
- Animated feedback
- Interaction tracking
- Responsive touch interaction

---

### 5. Talking Calculator

The Talking Calculator provides an interactive calculator experience for the Numeracy & SLD support module.

It includes:

- Number input
- Arithmetic operations
- Clear functionality
- Result calculation
- Animated button interactions

---

### 6. Interactive Maze

The Maze module represents the Executive Functioning & Focus activity.

It provides an interactive maze experience with movement, goal completion, and reset functionality.

---

### 7. Plug-in Architecture

The landing page includes a visual representation of SyncSpace's plug-in architecture.

The concept allows new therapeutic activities to be introduced without changing the core session experience.

```text
SyncSpace Session
        ↓
   Module Engine
        ↓
 ┌──────┼────────────┬────────────────┐
 ↓      ↓            ↓                ↓
Maze   Memory    Bubble Splash    Calculator
       Match
```

---

### 8. Who It's For

The platform highlights support for:

- ADHD
- Specific Learning Disabilities
- Autism
- Anxiety
- Depression
- Intellectual Disabilities

It also highlights the primary providers:

- Psychologists
- Counselors

---

### 9. Platform Capabilities

A responsive bento-style section showcases:

#### Smart Session Scheduling

An interactive scheduling interface representing session planning and upcoming appointments.

#### Live Side-by-Side Clinical Note-Taking

A UI concept showing clinical note-taking alongside an active session.

#### End-to-End Encrypted Video

A visual representation of secure video-session functionality.

#### Real-Time Synchronization

A visual demonstration of shared interactions between therapist and client interfaces.

These features are represented as frontend product concepts for the assignment and do not claim to implement production healthcare infrastructure.

---

### 10. Interactive Booking / Demo Modal

The **Book a Demo** and **Book a Session** buttons open a working multi-step booking modal.

The flow includes:

**Step 1**
- Psychologist
- Counselor
- Client

**Step 2**
- Name
- Email
- Preferred date

**Step 3**
- Confirmation

Client-side validation is included for required fields and email format.

A successful submission displays an animated confirmation state.

---

## Micro-Interactions & Animations

The project places strong emphasis on smooth and accessible interactions.

Animations include:

- Hero entrance animations
- Scroll-based section reveals
- Navbar transitions
- Button hover states
- Card hover interactions
- Module switching animations
- Memory Match card flips
- Bubble popping animations
- Calculator interactions
- Booking modal transitions
- Form state transitions
- Success animations
- Live-session indicators
- Synchronization visualizations

Framer Motion is used for the primary animation and transition system.

---

## Responsive Design

The landing page is designed for:

- Desktop
- Laptop
- Tablet
- Mobile

The layout adapts across different screen sizes with responsive grids, navigation, interactive modules, bento cards, and booking flows.

The interactive components are also designed to remain usable on touch devices.

---

## Component Architecture

The application is built using reusable React components.

The project uses reusable components and React state to keep the implementation modular and maintainable.

---

## Feature I'm Most Proud Of

### Interactive Memory Match

The feature I'm most proud of is the playable **Memory Match** module.

Instead of presenting the therapeutic activities as static cards, users can directly interact with the activity inside the landing page.

It demonstrates:

- React state management
- Interactive game logic
- Conditional rendering
- Event handling
- Component-based architecture
- Animation sequencing
- Responsive interaction design

---

## Design Approach

The visual direction was designed around the idea of a **calm, human, and interactive digital therapy space**.

The interface uses:

- Warm neutral backgrounds
- Charcoal typography
- Soft accent colors
- Rounded UI surfaces
- Subtle borders and shadows
- Modern typography
- Purposeful animations
- Interactive product previews

The goal was to balance engaging interactions with the calm and accessible experience expected from a digital health platform.

---

## Assignment Requirements Covered

- [x] React / TypeScript landing page
- [x] Tailwind CSS
- [x] Responsive design
- [x] Hero section with coded live UI mockup
- [x] Therapist and client video-session interface
- [x] Interactive Module Playground
- [x] Maze
- [x] Bubble Splash
- [x] Talking Calculator
- [x] Memory Match
- [x] Playable therapeutic module
- [x] Plug-in Architecture concept
- [x] Conditions and providers section
- [x] Smart Session Scheduling
- [x] Live Side-by-Side Clinical Note-Taking
- [x] End-to-End Encrypted Video UI concept
- [x] Interactive Booking / Demo Modal
- [x] Client-side validation
- [x] Micro-interactions
- [x] Scroll animations
- [x] Responsive layouts
- [x] Reusable component architecture

---

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

### Preview Production Build

```bash
npm run preview
```

---

## Note

SyncSpace is a frontend product concept created for an internship screening assignment.

Features such as video infrastructure, end-to-end encryption, real-time backend synchronization, authentication, scheduling infrastructure, and clinical data storage are represented as frontend product concepts and would require appropriate backend and infrastructure systems for production use.

No real patient or clinical data is used in this project.

---

## Built With

**React · TypeScript · Vite · Tailwind CSS · Framer Motion · Lucide React**