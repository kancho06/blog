import { PageComponent } from "../../types/page";
import styled from "styled-components";
import MainLayout from "../../layout/MainLayout";
import colors from "../../lib/color";
import { GetStaticProps } from "next";
import { Seo } from "../../types/seo";

const Container = styled.div`
    width: 100%;
    margin-top: 80px;
    padding-left: 20px;
`;

const Summary = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 20px;
`;

const Title = styled.div<{
    fontSize: number;
    paddingLeft?: number;
}>`
    margin-top: 10px;
    padding-left: ${(props) => (props.paddingLeft ? props.paddingLeft : 0)}px;
    font-weight: bold;
    font-size: ${(props) => props.fontSize}px;
    color: ${colors.black};
`;
const Line = styled.div`
    margin-top: 20px;
    width: 60%;
    border-bottom: 4px solid ${colors.darkGrey};
`;

const Index: PageComponent<null> = (props) => {
    const { router } = props;
    return (
        <MainLayout router={router}>
            <Container>
                <Summary>
                    <Title fontSize={20} paddingLeft={20}>
                        Web / App Engineer
                    </Title>
                    <Title fontSize={40} paddingLeft={80}>
                        Jaesung Lee
                    </Title>
                    <Line />
                </Summary>
            </Container>
        </MainLayout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const seo: Seo = {
        title: "Profile",
        description: "",
        url: "https://kancho06.github.io/blog/profile",
        imgPath: "",
    };
    return {
        props: {
            data: {
                seo,
            },
        },
    };
};

export default Index;
