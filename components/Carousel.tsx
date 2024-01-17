import React from "react";
import styled from "styled-components";
import CarouselCard from "./CarouselCard";

const Container = styled.div``;

interface Props {
    posts: any[];
}

const Carousel: React.FC<Props> = (props) => {
    const { posts } = props;
    const recentPosts = posts.slice(0, 5);
    return (
        <Container>
            {recentPosts.map((post, i) => {
                return <CarouselCard key={i} post={post} />;
            })}
        </Container>
    );
};

export default Carousel;
