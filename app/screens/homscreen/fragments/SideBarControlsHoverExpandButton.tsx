import React from "react";
import { AnimatePresence, motion } from "framer-motion";

interface SideBarControlsHoverExpandButtonPropsInterface {
    onClick: () => void;
    hoverExpandChildren: React.ReactNode;
    children: React.ReactNode;
}

export default function SideBarControlsHoverExpandButton({
    onClick,
    hoverExpandChildren,
    children,
}: SideBarControlsHoverExpandButtonPropsInterface) {
    const [isHovered, setIsHovered] = React.useState<boolean>(false);
    return (
        <motion.button
            layout
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{
                scale: 0,
                filter: "blur(10px)",
            }}
            animate={{
                scale: 1,
                filter: "blur(0px)",
            }}
            exit={{
                scale: 0,
                filter: "blur(10px)",
            }}
            onClick={onClick}
            className="p-3 bg-[#1A1A1A] rounded-xl cursor-pointer pointer-events-auto absolute top-[1.5rem] left-[1rem] flex items-center gap-[1rem] overflow-hidden"
        >
            {children}

            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        layout
                        exit={{ opacity: 0, filter: "blur(10px)" }}
                        initial={{ opacity: 0, filter: "blur(10px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                    >
                        {hoverExpandChildren}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
}
