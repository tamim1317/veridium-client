import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const StripePaymentForm = ({ packageData, clientSecret }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user, fetchUser } = useAuth();
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState('');

    const cardStyle = {
        style: {
            base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': { color: '#aab7c4' },
            },
            invalid: { color: '#9e2146' },
        },
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements || !clientSecret) {
            return;
        }

        setProcessing(true);
        setError(null);

        const card = elements.getElement(CardElement);

        const { error, paymentIntent } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user.email,
                        name: user.name,
                    },
                },
            }
        );

        if (error) {
            setError(`Payment Failed: ${error.message}`);
            setProcessing(false);
        } else if (paymentIntent.status === 'succeeded') {
            // 1. Log Payment in your DB
            const paymentInfo = {
                hrEmail: user.email,
                packageName: packageData.name,
                employeeLimit: packageData.employeeLimit,
                amount: packageData.price,
                transactionId: paymentIntent.id,
                paymentDate: new Date(),
            };
            
            const dbResponse = await axiosSecure.post('/payments/log-payment', paymentInfo);
            
            // 2. Update the user's package limit on the server

            setSuccess(`Payment Successful! Transaction ID: ${paymentIntent.id}`);
            
            // 3. Immediately refresh user state (assuming the server updated user package limits)
            // fetchUser(); 
            
            alert('Package Upgrade Successful! Your new employee limit is now active.');
            navigate('/dashboard/hr', { replace: true });
        }
        setProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-4 border border-gray-300 rounded-lg">
                <CardElement options={cardStyle} />
            </div>

            {error && <p className="text-error text-sm">{error}</p>}
            {success && <p className="text-success text-sm font-bold">{success}</p>}

            <button 
                type="submit" 
                className="btn btn-primary w-full" 
                disabled={!stripe || processing}
            >
                {processing ? 'Processing...' : `Pay $${packageData.price}`}
            </button>
        </form>
    );
};

export default StripePaymentForm;