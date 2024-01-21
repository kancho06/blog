import { PageComponent } from "../../types/page";
import styled from "styled-components";
import MainLayout from "../../layout/MainLayout";

const Container = styled.div`
    width: 100%;
    margin: 80px 0 0 20px;
`;

const Index: PageComponent<null> = (props) => {
    const { router } = props;
    return (
        <MainLayout router={router}>
            <Container></Container>
        </MainLayout>
    );
};

export default Index;
