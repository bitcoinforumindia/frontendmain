import React, { useMemo, useRef, useEffect } from "react";
import { cn } from "../../lib/utils";

export const BackgroundRippleEffect = ({
    rows = 8,
    cols = 27,
    cellSize = 56,
}) => {
    // Array of refs to access DOM elements directly
    const cellRefs = useRef([]);

    // Initialize/Reset refs array
    cellRefs.current = [];

    const addToRefs = (el) => {
        if (el && !cellRefs.current.includes(el)) {
            cellRefs.current.push(el);
        }
    };

    const triggerRipple = (originRow, originCol) => {
        if (!cellRefs.current.length) return;

        cellRefs.current.forEach((cell, idx) => {
            if (!cell) return;

            const cellRow = Math.floor(idx / cols);
            const cellCol = idx % cols;

            const distance = Math.hypot(originRow - cellRow, originCol - cellCol);
            const delay = distance * 50;
            const duration = 200 + distance * 80;

            cell.animate(
                [
                    { opacity: 0.4 },
                    { opacity: 0.8, offset: 0.5 },
                    { opacity: 0.4 }
                ],
                {
                    duration: duration,
                    delay: delay,
                    easing: 'ease-out',
                    fill: 'forwards'
                }
            );
        });
    };

    // Auto-click bottom left corner every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            triggerRipple(rows - 1, 0);
        }, 5000);

        return () => clearInterval(interval);
    }, [rows, cols]);

    const cells = useMemo(
        () => Array.from({ length: rows * cols }, (_, idx) => idx),
        [rows, cols]
    );

    const gridStyle = {
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
        width: cols * cellSize,
        height: rows * cellSize,
        marginInline: "auto",
    };

    return (
        <div
            className={cn(
                "absolute inset-0 h-full w-full",
                // Bitcoin orange color scheme
                "[--cell-border-color:#FF9900] [--cell-fill-color:rgba(255,153,0,0.05)] [--cell-shadow-color:#ff9501]"
            )}
        >
            <div className="relative h-auto w-auto overflow-hidden">
                <div className="relative z-10 mask-radial-from-20% mask-radial-at-top opacity-600" style={gridStyle}>
                    {cells.map((idx) => {
                        const rowIdx = Math.floor(idx / cols);
                        const colIdx = idx % cols;

                        return (
                            <div
                                key={idx}
                                ref={addToRefs}
                                className={cn(
                                    "cell relative border-[0.5px] opacity-40 transition-all duration-150 will-change-transform cursor-pointer hover:opacity-80 hover:scale-105 shadow-[0px_0px_40px_1px_var(--cell-shadow-color)_inset]",
                                    "pointer-events-auto"
                                )}
                                style={{
                                    backgroundColor: "var(--cell-fill-color)",
                                    borderColor: "var(--cell-border-color)",
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    triggerRipple(rowIdx, colIdx);
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default BackgroundRippleEffect;




