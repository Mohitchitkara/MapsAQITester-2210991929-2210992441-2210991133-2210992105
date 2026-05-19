import styled from "styled-components";

const HomeScreenFloatingActionButton = styled.button.attrs(
    (props: { className?: string }) => ({
        className: props.className,
    }),
)`
    height: 5rem;
    width: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background-color: #1a1a1a;
    cursor: pointer;
    pointer-events: auto;
    position: absolute;
    transition: all 250ms;

    &:hover {
        background-color: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(10px);
    }
`;

export default HomeScreenFloatingActionButton;
