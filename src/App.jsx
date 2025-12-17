import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import router from './routes/Router';
import { AuthProvider } from './context/AuthContext';

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>

            <AuthProvider>

                <RouterProvider router={router} />

                <Toaster />
                
            </AuthProvider>
            
        </QueryClientProvider>
    );
};

export default App;