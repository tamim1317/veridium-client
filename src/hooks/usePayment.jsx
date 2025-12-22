import { useState, useEffect } from 'react';
import useAxiosSecure from './useAxiosSecure';

/**
 * Professional Hook for handling Stripe Payment Intent
 * @param {number} price - The cost of the HR package (5, 10, or 20 USD)
 */
const usePayment = (price) => {
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState("");
    const [paymentError, setPaymentError] = useState(null);
    const [isPreparing, setIsPreparing] = useState(false);

    useEffect(() => {
        // Only fetch if price is valid and greater than 0
        if (price > 0) {
            setIsPreparing(true);
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                    setPaymentError(null);
                })
                .catch(err => {
                    console.error("Payment Intent Error:", err);
                    setPaymentError("Failed to initialize payment system.");
                })
                .finally(() => {
                    setIsPreparing(false);
                });
        }
    }, [price, axiosSecure]);

    return { 
        clientSecret, 
        paymentError, 
        isPreparing,
        setPaymentError 
    };
};

export default usePayment;