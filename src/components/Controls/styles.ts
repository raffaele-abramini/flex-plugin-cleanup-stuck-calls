import { styled, Button } from "@twilio/flex-ui";

export const MainContainer = styled("div")`
    margin-left: auto;
    display: flex;
`;

export const ButtonContainer = styled("div")`
    display: flex;
    align-items: center;
    padding: 0 12px;
    position: relative;
    &:before,
    &:after {
        height: 16px;
        width: 1px;
        position: absolute;
        left: 0;
        background: #000; // hardcoded the color here as we don't have notfication theme object. Will need to update it once we have it.
        opacity: 0.2;
    }
    &:after {
        left: auto;
        right: 0;
    }
    & + &:before {
        content: "";
    }
`;

// @ts-ignore
export const StyledButton = styled(Button)`
    background: none;
    font-size: 12px;
    letter-spacing: 0;
    height: auto;
    padding: 0;

    &:hover {
        background: none;
        text-decoration: underline;
    }
`;
