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
- **Molten Aurora** (`src/component/MoltenAurora.jsx`): Premium dark gradient with animated orange/amber orbs.
  - Deep black base (`#050505` to `#0A0A0A`)
  - 4 animated gradient orbs in Bitcoin orange/amber colors
  - Subtle noise texture and hero spotlight effect
  - CSS keyframe animations (18-25s cycles)
- *(Deprecated)* Starfield, Genesis Grid, BitcoinRevealBackground - replaced by Molten Aurora

### 4. Interactive Sections
- **Ticket Tiers**: Cascading cards with glass effects (`TicketTiersSection.jsx`).
- **Live Counter**: Real-time ticker for registrations.
- **FAQ**: Accordion-style questions.
- **Sponsors**: Auto-scrolling marquee.

## Recent Changes (Session History - Jan 14 2026)
- **Hero Tagline Update (Mobile View)**:
    - Replaced the stat-heavy tagline in the mobile hero section with: "Where **INDIA** meets **BITCOIN**. The historic gathering of the global community in Hyderabad."
    - **Highlighting**: Applied a richer, darker orange gradient (`#FF6501` to `#CC5200`) and extrabold weighting to the "Where INDIA meets BITCOIN" part for better brand alignment and visual impact.
    - Kept the original stat-inclusive tagline for desktop views to maintain layout consistency.
    - Reason: Avoid redundancy with the stats grid (50k+ attendees, 150+ speakers) that appears directly below the tagline on mobile.
- **Hero Section Refinement & UI Color Update**: (Jan 14 2026)
    -### 1. Hero Section Refinements
- **Desktop Heading**: Replaced "INDIA'S PREMIER BITCOIN GATHERING" with "Where **INDIA** meets **BITCOIN**" as the primary `h1` on laptop/desktop views (4-line layout).
- **Mobile Logo Integration**: Replaced the heading text with the official `logo.svg` image on mobile devices.
- **Mobile Tagline Removal**: Removed the separate "Where INDIA meets BITCOIN" tagline on mobile to keep the layout clean.
- **Concise Description**: Shortened the introductory description to 2 lines for mobile optimization: "Join 50,000+ attendees & 150+ speakers in Hyderabad for India's historic Bitcoin gathering."
- **Improved Spacing**: Reduced the top padding on mobile to `pt-20` for a tighter layout.
- **Starry Black Background**: Re-enabled the background system with a new `StarfieldBackground` component. It features twinkling white and orange stars on a solid black (`#000000`) background for a premium, cinematic feel.
    - **Header Modification**:
        - **Mobile Header**: Removed the standalone Bitcoin logo in the top-left to clean up the UI.
    - **Global Styling**:
        - **Button Redesign**: Unified all buttons to a high-contrast theme: black background (`#000000`), 2px vibrant orange borders (`#FF6501`), and white text (`#ffffff`).
        - **Background**: Swapped the starfield for a "Digital Network" (Plexus) effect. The stars are commented out in `Background.jsx` for easy reversion.
    - **Files Modified**: `src/component/Hero.jsx`, `src/component/Navigation.jsx`, `src/index.css`, and all files containing primary orange colors.

## Recent Changes (Session History - Jan 12 2026 - Part 2)
- **UI Refinements & Fixes**:
    - **Header**:
        - **Mobile Layout**: Split layout with independent logo (Top-Left) and hamburger menu (Top-Right).
        - **Visuals**: Removed empty space in the middle of the header pill; increased mobile logo size (`h-16`).
    - **Footer**:
        - **Mobile Layout**: Compacted design with links *below* social icons (using `flex-row-reverse` on mobile).
        - **Height**: Reduced top padding for a slimmer profile.
        - **Alignment**: Standardized alignment (Socials Left, Links Right) across devices.
    - **Typography**:
        - **Standardization**: Enforced `Outfit` font for all website headings (`h1` through `h6`), removing `Space Grotesk` override.
    - **Hero Section**:
        - **Interaction Fix**: Removed `pointer-events-auto` from text wrapper to allow click-through to background.
        - **Clickable Elements**: Whitelisted `main img` (and buttons) locally and globally (`index.css`) to ensure interactivity where needed.
    - **Forms**:
        - **Empty Button Fix**: Solved invisible text issue in `ApplySpeaker`, `ApplySponsor`, `ContactMediaPartnership`, and `ContactStudentVolunteer` by clearing default background gradients (`!bg-none`).


- **Background Reversion (Match Live)**:
    - **Reverted to Live Background**: Restored `Background.jsx` and `BackgroundRippleEffect.jsx` from `origin/main`.
    - **Theme Revert**: Restored `index.css` to the "live" version (White Theme overrides), replacing the Dark/Molten Aurora theme.
    - **Layout Update**: Swapped `<MoltenAurora />` for `<Background />` in `Layout.jsx`.
    - **Files Modified**: `Layout.jsx`, `index.css`, `Background.jsx` (restored), `BackgroundRippleEffect.jsx` (restored).
    - **Files Unused**: `MoltenAurora.jsx` (retained but inactive).

- **Dark Theme Conversion**:
    - **Global Revert**: Updated `index.css` to restore Dark Mode base (`bg-[#050505]`, text white), removing the temporary white theme overrides.
    - **Background Update**: Modified `Background.jsx` to use a dark base and compatible gradient, while keeping the "Live" structure.
    - **Visuals**: Enhanced contrast for the restored background on dark mode.


- **Major Theme Overhaul (Dark Mode with Molten Aurora)**:
    - **Removed Loading Screen**: Eliminated `LoadingScreen.jsx` from App.jsx for instant page load.
    - **New Background Design**: Created `MoltenAurora.jsx` component:
        - Premium dark gradient background replacing white theme
        - 4 animated floating orbs in Bitcoin orange/amber colors (`#ff6501`, `#f7931a`, `#cc5200`)
        - Subtle noise texture overlay for depth
        - Hero spotlight effect to draw focus
    - **Global CSS Updates** (`index.css`):
        - Body background changed from white (`#ffffff`) to near-black (`#050505`)
        - Default text color changed to white
        - Added aurora animation keyframes (`aurora-1` through `aurora-4`)
        - Fixed gray text classes for dark theme visibility
        - Updated scrollbar colors for dark theme
    - **Component Theme Updates**:
        - `Navigation.jsx`: Dark glassmorphism header (`bg-black/60 backdrop-blur-xl`)
        - `Footer.jsx`: Dark background with proper text contrast
        - `TicketTiersSection.jsx`: Dark glassmorphism cards replacing white
        - `LiveRegistrationCounter.jsx`: Dark glassmorphism panels
    - **Files Modified**: `App.jsx`, `Layout.jsx`, `index.css`, `Navigation.jsx`, `Footer.jsx`, `TicketTiersSection.jsx`, `LiveRegistrationCounter.jsx`
    - **Files Created**: `MoltenAurora.jsx`
    - **Files Now Unused**: `LoadingScreen.jsx`, `Background.jsx`, `BitcoinRevealBackground.jsx`

## Recent Changes (Session History - Jan 11 2026)
- **Visual & Functional Fixes**:
    - **Reverted Headings**: Changed section headings ("Secure Your Spot", "World Class Voices", etc.) back to **centered** alignment as per user preference.
    - **Indian Map Interactivity Fix**:
        - **Issue**: Map hover glow was blocked by the background grid (z-10).
        - **Solution**:
            - Applied `z-20` to the Map container (placing it just above the background).
            - **CRITICAL**: Added `pointer-events-auto` to the Map container. This ensures the map explicitly captures mouse events instead of letting them fall through to the background, even if visually layered correctly. This replicates the successful pattern used in the Hero section.
    - **Hero Section Interactivity**:
        - **Issue**: Content ("Get Tickets" buttons) was potentially blocked by background layers.
        - **Solution**: Applied `relative z-20 pointer-events-auto` to the Hero content wrapper.
    - **Background Animation Upgrade**:
        - **Disabled Bubbles**: Commented out `FloatingParticles` for a cleaner look.
        - **Overlapping Ripples**:
            - Refactored `BackgroundRippleEffect` to use the **Web Animations API** instead of React state.
            - This enables **simultaneous, overlapping ripples** (e.g., auto-trigger + manual click) without grid resets.
            - Adjusted auto-ripple interval to **5 seconds**.

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
