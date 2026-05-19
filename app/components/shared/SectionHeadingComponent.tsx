import React from "react";

export default function SectionHeadingComponent({
    text,
    className,
}: {
    text: string;
    className?: string;
}): React.JSX.Element {
    return (
        <h3
            className={`font-bold font-roboto text-[1rem] text-white/40 mt-[1.5rem] mb-[0.5rem] ${className}`}
        >
            {text}
        </h3>
    );
}
