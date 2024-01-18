import React, { useRef } from "react";
import styled from "styled-components";
import colors from "../lib/color";
import { FaSearch } from "react-icons/fa";

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const LabelArea = styled.div`
    display: flex;
    flex-direction: row;
`;

const Label = styled.div`
    font-size: 20px;
    color: ${colors.black};
    font-weight: 500;
    white-space: nowrap;
    margin-bottom: 10px;
`;

const SearchInputContainer = styled.div`
    position: relative;
    height: 100%;
`;

const CustomInput = styled.input`
    width: 100%;
    height: 100%;
    font-size: 16px;
    border: 2px solid ${colors.black};
    border-radius: 8px;
    padding: 10px 8px;
`;

const SearchIcon = styled(FaSearch)`
    position: absolute;
    top: 12px;
    right: 10px;
`;

export enum ValueFormat {
    HalfWidthNumber = 1,
    HalfWidthNumberReplaceWithZero = 2,
}

interface Props {
    label?: string;
    onChange: (value: string) => void;
    format?: ValueFormat;
    placeHolder?: string;
}

const SearchInput: React.FC<Props> = (props) => {
    const { label, onChange, format, placeHolder } = props;
    const ref = useRef<HTMLInputElement>(null);
    return (
        <Container>
            {label && (
                <LabelArea>
                    <Label>{label}</Label>
                </LabelArea>
            )}
            <SearchInputContainer>
                <SearchIcon />
                <CustomInput
                    ref={ref}
                    placeholder={placeHolder}
                    onChange={(ev) => {
                        const value = ev.target.value;
                        if (format && (format === ValueFormat.HalfWidthNumber || format === ValueFormat.HalfWidthNumberReplaceWithZero)) {
                            onChange(value.replace(/[^-|(0-9)]+/i, ""));
                            return;
                        }
                        onChange(value);
                    }}
                />
            </SearchInputContainer>
        </Container>
    );
};

const SearchInputForward = React.forwardRef(SearchInput as React.ForwardRefRenderFunction<HTMLInputElement, Props>);
SearchInputForward.displayName = "SearchInputForward";
export default SearchInputForward;
