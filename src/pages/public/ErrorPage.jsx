import { useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError(); 
    console.error(error);

    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
            <h1 className="text-5xl font-bold text-red-500">Oops!</h1>
            <p className="text-xl">Something went wrong.</p>
            <p className="italic text-gray-500">
                {error.statusText || error.message}
            </p>
            <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
    );
};

export default ErrorPage;