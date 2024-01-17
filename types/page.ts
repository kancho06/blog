import { NextRouter } from "next/router";
import React from "react";

export interface PageProps<T> {
    router: NextRouter;
    data: T;
}
export type PageComponent<T> = React.ComponentType<PageProps<T>>;
