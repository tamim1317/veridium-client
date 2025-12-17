import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {

    console.error(error);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-6 text-center">
            
            <div className="max-w-md space-y-6">
                <div className="flex items-center justify-center space-x-4">
                    <h1 className="text-9xl font-extrabold text-primary">404</h1>
                    <span className="text-5xl font-light text-gray-500">|</span>
                    <h2 className="text-5xl font-bold text-gray-800">Not Found</h2>
                </div>
                
                <p className="text-xl text-gray-600 mt-4">
                    Oops! The page you were looking for doesn't exist.
                    It might have been moved or deleted.
                </p>
                
                <p className="text-sm text-error font-mono">
                    {/* Display the error status if available */}
                    {error?.statusText || error?.message || "Client-side routing error."}
                </p>

                <Link 
                    to="/" 
                    className="btn btn-primary btn-lg mt-6 shadow-lg transform hover:scale-105 transition duration-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Go Back to Home Page
                </Link>
            </div>
            
        </div>
    );
};

export default ErrorPage;