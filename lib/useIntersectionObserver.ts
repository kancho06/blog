// component/TableOfContent.tsx 헤더감시
import React, { useEffect, useRef } from "react";

export const useIntersectionObserver = (setActiveId: React.Dispatch<React.SetStateAction<string>>, content: string) => {
    const headingElementsRef = useRef<any>({});

    useEffect(() => {
        headingElementsRef.current = {};
        const callback: IntersectionObserverCallback = (headings) => {
            headingElementsRef.current = headings.reduce((map: any, headingElement) => {
                map[headingElement.target.id] = headingElement;
                return map;
            }, headingElementsRef.current);

            const visibleHeadings: IntersectionObserverEntry[] = [];
            Object.keys(headingElementsRef.current).forEach((key) => {
                const headingElement = headingElementsRef.current[key];
                if (headingElement.isIntersecting) {
                    visibleHeadings.push(headingElement);
                }
            });

            const getIndexFromId = (id: string) => headingElements.findIndex((heading) => heading.id === id);
            // 목차가 아무것도 보이지 않는다면 마지막 목차를 액티브
            if (!visibleHeadings.length) {
                setActiveId(headingElements[headingElements.length - 1].id);
            } else {
                const sortedVisibleHeadings = visibleHeadings.sort((a, b) => getIndexFromId(a.target.id) - getIndexFromId(b.target.id));
                const visibleFirstIndex = getIndexFromId(sortedVisibleHeadings[0].target.id);
                // 제일 상단의 목차가 보이지 않는다면 현재 보이는 목차의 하나 전 목차를 액티브한다
                if (visibleFirstIndex === 0) {
                    setActiveId(sortedVisibleHeadings[0].target.id);
                } else {
                    setActiveId(headingElements[visibleFirstIndex - 1].id);
                }
            }

            // if (visibleHeadings.length === 1) {
            //     // 화면에 보이고 있는 제목이 1개라면 해당 element의 target.id를 setActiveId로 set해준다.
            //     setActiveId(visibleHeadings[0].target.id);
            // } else if (visibleHeadings.length > 1) {
            //     // 2개 이상이라면 sort로 더 상단에 있는 제목을 set해준다.
            //     const sortedVisibleHeadings = visibleHeadings.sort(
            //         (a, b) => getIndexFromId(a.target.id) - getIndexFromId(b.target.id)
            //     );
            //     const visibleFirstIndex = getIndexFromId(sortedVisibleHeadings[0].target.id);
            //     if (visibleFirstIndex === 0) {
            //         setActiveId(sortedVisibleHeadings[0].target.id);
            //     } else {
            //         setActiveId(headings[visibleFirstIndex - 1].target.id);
            //     }
            // }
        };
        const observer = new IntersectionObserver(callback, {
            rootMargin: "-60px 0px 0px 0px",
        });
        const headingElements = Array.from(document.querySelectorAll("h1, h2, h3, h4"));
        headingElements.forEach((element) => observer.observe(element));
        return () => observer.disconnect();
    }, [content]);
};
