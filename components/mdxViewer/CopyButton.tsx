import React, { useState } from "react";
import styled from "styled-components";
import { LuCopy } from "react-icons/lu";
import { FaCheck } from "react-icons/fa";
import colors from "../../lib/color";

const Container = styled.div``;

const CustomButton = styled.div`
    display: flex;
    padding: 5px 5px;
    border: 2px solid ${colors.grey};
    border-radius: 8px;
    cursor: pointer;
`;

const CopyIcon = styled(LuCopy)`
    width: 15px;
    height: 15px;
    color: ${colors.grey};
    margin-right: 3px;
`;

const CopyCheckIcon = styled(FaCheck)`
    width: 15px;
    height: 15px;
    color: ${colors.green};
    margin-right: 3px;
`;

interface Props {
    text: string;
}

const CopyButton: React.FC<Props> = (props) => {
    const { text } = props;
    const [isCopied, setIsCopied] = useState<boolean>(false);
    const copy = async () => {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);

        setTimeout(() => {
            setIsCopied(false);
        }, 2500);
    };

    return (
        <Container>
            <CustomButton onClick={copy}>
                {isCopied ? <CopyCheckIcon /> : <CopyIcon />}
                <span>{isCopied ? "Copied" : "Copy"}</span>
            </CustomButton>
        </Container>
    );
};

export default CopyButton;
