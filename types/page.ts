import { NextRouter } from "next/router";

export interface PageProps {
    router: NextRouter;
}
export type PageComponent = React.ComponentType<PageProps>;
