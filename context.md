# Project Context: Bitcoin India Forum Website

## Project Overview
A high-performance, visually stunning landing page for the "Bitcoin India" conference. Built with modern web technologies to deliver a premium, "golden" aesthetic.

## Technology Stack
- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Custom CSS (Glassmorphism, Animations)
- **Routing**: React Router DOM

## Key Features & Components

### 1. Navigation (`src/component/Navigation.jsx`)
- **Design**: Floating "Dynamic Island" style pill.
- **Animation**: Custom `BorderBeam` component.
    - **Dual Beams**: Two synchronized golden comets traveling 180° apart.
    - **Visuals**: "Solid Liquid Line" (overlapping dashes) with a white-hot incandescent core and plasma shadow.
    - **Tech**: SVG Motion Path (`offset-path`) with `ResizeObserver` for pixel-perfect border tracking.
- **Behavior**: Smooth scroll, glassmorphism blur, responsive sizing.

### 2. Hero Section (`src/component/Hero.jsx`)
- **Background**: Full-screen video background with overlay.
- **Elements**: 
    - Glitch text effect for "INDIA".
    - Countdown timer (`LiveRegistrationCounter.jsx`) with animated "glass shard" digits.
    - Call-to-Action buttons with hover effects.

### 3. Backgrounds
- **Starfield**: Canvas-based animated stars (`StarfieldBackground.jsx`).
- **Genesis Grid**: 3D grid effect.
- **Golden Aurora**: Subtle golden gradient overlays.

### 4. Interactive Sections
- **Ticket Tiers**: Cascading cards with glass effects (`TicketTiersSection.jsx`).
- **Live Counter**: Real-time ticker for registrations.
- **FAQ**: Accordion-style questions.
- **Sponsors**: Auto-scrolling marquee.

## Recent Changes (Session History - Jan 11 2026)
- **Visual & Functional Fixes**:
    - **Reverted Headings**: Changed section headings ("Secure Your Spot", "World Class Voices", etc.) back to **centered** alignment as per user preference.
    - **Indian Map Interactivity Fix**:
        - **Issue**: Map hover glow was blocked by the background grid (z-10).
        - **Solution**:
            - Applied `z-20` to the Map container (placing it just above the background).
            - **CRITICAL**: Added `pointer-events-auto` to the Map container. This ensures the map explicitly captures mouse events instead of letting them fall through to the background, even if visually layered correctly. This replicates the successful pattern used in the Hero section.

## Recent Changes (Session History - Jan 9 2026)
- **Visual Overhaul (White Theme)**:
    - Transformed site from Dark Mode (`bg-black`) to Light Mode (`bg-white`).
    - Standardized accent color to Bitcoin Orange (`#ff6501` & `#f7931a`).
    - Updated all major components (Registration Counter, Ticket Pricing, Speakers) to use:
        - White backgrounds
        - Solid Orange borders
        - Black text content
- **Header Redesign**:
    - Removed logo for a cleaner look.
    - Centered navigation links ("Dynamic Island" pill).
    - Moved "Get Tickets" button to the far right.
    - Added subtle orange fade background.
- **Hero Section Layout**:
    - Rebalanced layout: Left (25% - Image), Right (75% - Content).
    - Updated loading screen text colors.
- **Footer Revamp**:
    - Changed background to plain white (`bg-white`).
    - Added orange top border (`border-t border-[#ff6501]`).
    - Removed "BitIndia" logo and "Presented By" text for simplicity.
    - Removed separating lines/dividers.
- **Content Updates**:
    - Hid the Quote Section in the Speakers page.
    - Cleaned up redundant separators.

## Previous Changes (Archive)
- **Restored `BorderBeam.jsx`**: Fixed a critical crash where the component file was missing/deleted.
- **Refined Border Animation**:
    - Switched from CSS `conic-gradient` (inconsistent speed) to SVG `stroke-dasharray` and then to **CSS Motion Path**.
    - Evolved visuals from "Dots" to "Solid Liquid Line" (overlapping dashes).
    - Added "White-Hot Core" (internal gradient) and "Plasma Shadow".
    - Implemented Dual Beams (Opposing phase).
- **Navigation Tweaks**: Removed `overflow-hidden` to allow glow bleed; adjusted Z-indexing.

## File Structure Highlights
- `src/component/ui/BorderBeam.jsx`: The core animation component.
- `src/component/Navigation.jsx`: Main header logic.
- `src/index.css`: Global styles and Tailwind directives.
- `vite.config.js`: Build configuration.

## Active State
- The application is currently stable and running.
- Visuals are verified to match the "Premium Golden" aesthetic.
- `context.md` is added to `.gitignore` to keep this documentation local.
