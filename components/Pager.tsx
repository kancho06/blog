import React, { useEffect, useState } from "react";
import styled from "styled-components";
import colors from "../lib/color";

const Container = styled.div`
    display: flex;
    color: ${colors.grey};
    font-size: 1.8rem;
    align-items: center;
    padding: 20px 0;
`;

const TotalCount = styled.div`
    color: ${colors.black};
    font-size: 1.6rem;
    font-weight: bold;
`;

const PaginationItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    cursor: pointer;
`;

const PaginationSelectedItem = styled(PaginationItem)`
    color: ${colors.black};
    font-weight: bold;
`;

type PagerParam = {
    unit: number;
    offset: number;
};

interface Props {
    totalCount: number;
    param: PagerParam;
    onChange: (param: PagerParam) => void;
}

const Pager: React.FC<Props> = (props) => {
    const { totalCount, param, onChange } = props;
    const display = 6;
    const total = Math.ceil(totalCount / param.unit);
    const calcPage = (p: { unit: number; offset: number }) => {
        return Math.floor(p.offset / p.unit) + 1;
    };

    const current = calcPage(param);
    const [currentPage, setCurrentPage] = useState<number>(current);
    useEffect(() => {
        const page = calcPage(param);
        if (page !== currentPage) {
            setCurrentPage(page);
        }
    }, [param]);

    const range = (start: number, end: number) => {
        const length = end - start + 1;
        return Array.from({ length }, (_, i: number) => start + i);
    };

    const startPages = () => {
        // firstEllipsis(...)がない場合
        if (currentPage <= display - 2) {
            return range(1, display - 2);
        }
        // firstEllipsisがある場合
        return [1, "..."];
    };

    const middlePages = () => {
        if (currentPage >= display - 1 && currentPage < total - 2) {
            // displayから5を引くのは、1(最初) + firstEllipsis + lastEllipsis + total + 1
            return range(currentPage - (display - 5), currentPage);
        }
        return [];
    };

    const endPages = () => {
        // lastEllipsis(...)がある場合
        if (total - currentPage > 2) {
            return ["...", total];
        }
        // lastEllipsisがない場合
        return range(total - (display - 3), total);
    };

    // 表示ページが${display}ページ以下の場合はtotal分をすべて返却
    const pages: Array<number | string> = total <= display ? Array.from([...Array(total)], (_, index) => index + 1) : [...startPages(), ...middlePages(), ...endPages()];

    return (
        <Container>
            <TotalCount>Total {totalCount}</TotalCount>
            {pages.map((page: number | string, index: number) => {
                if (currentPage === page) {
                    return <PaginationSelectedItem key={`${page}${index}`}></PaginationSelectedItem>;
                }
                return (
                    <PaginationItem
                        key={`${page}${index}`}
                        onClick={() => {
                            if (page === "...") {
                                return;
                            }
                            setCurrentPage(+page);
                            onChange({
                                offset: param.unit * (Number(page) - 1),
                                unit: param.unit,
                            });
                        }}
                    >
                        {page}
                    </PaginationItem>
                );
            })}
        </Container>
    );
};

export default Pager;
