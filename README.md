# Tusi Couple Illusion

This is a **React + TypeScript + Vite** application that visualizes the famous [Tusi Couple](https://en.wikipedia.org/wiki/Tusi_couple) mathematical illusion.

The Tusi Couple is a mathematical device in which a small circle rotates inside a larger circle twice its diameter. The rotation of the smaller circle causes a point on its circumference to oscillate back and forth effectively in a straight line along a diameter of the larger circle.

## Features

- **Interactive Visualization**: Watch the illusion form in real-time on an HTML5 Canvas.
- **Customizable Controls**:
  - **Size**: Adjust the radius of the main circle.
  - **Points**: Change the number of diameters (and points) to see how the collective motion creates the illusion of a rotating circle.
  - **Speed**: Control the animation speed.
  - **Show Diameters**: Toggle visibility of the lines along which the points travel to better understand the mechanics.

## Technical Details

- **Frontend**: React 19 (Hooks: `useRef`, `useEffect`, `useState`)
- **Graphics**: HTML5 Canvas API (2D Context)
- **Build Tool**: Vite
- **Language**: TypeScript

## How to Run

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/tusi-couple.git
    cd tusi-couple
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open your browser at `http://localhost:5173` (or the port shown in your terminal).

## How it Works

The core logic is implemented in `src/Canvas.tsx`. It uses the `requestAnimationFrame` loop to update the position of the points. Each point moves back and forth along a specific diameter using a simple harmonic motion equation:

`x(t) = A * cos(theta - alpha)`

Where `theta` is the current rotation angle and `alpha` is the angle of the specific diameter.
