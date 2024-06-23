import { useRouteError } from 'react-router-dom';

export const ErrorBoundary = () => {
    const error = useRouteError();
    console.error(error);
    const msg: string =
        error && error instanceof Error ? error.message : 'unknown error';
    return <div>{msg}</div>;
};
