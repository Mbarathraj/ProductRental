import React, { useState } from 'react';
import { Modal, Button, Typography, Form, message } from 'antd';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const { Text } = Typography;
const stripePromise = loadStripe('pk_test_51QDXE1B4RWPMVvRR1E6Sbs60z3MKeHarHCk895l0YTWa4qyIg5BYU8kD2jGuCir14OY53ofHeu0OZnLHjNXJYaW100TTJuqqfj');

const PaymentModal = ({ isOpen, onRequestClose, totalPrice, onPaymentSuccess, products, product, setProducts, index, id, uid, setBookingModal, setPaymentModalOpen }) => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  let bookingResponse;

  const handlePayment = async () => {
    if (!stripe || !elements) {
      return; // Stripe.js hasn't loaded yet.
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5675/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: totalPrice }), // Convert to cents
      });

      const { clientSecret } = await response.json();
      const cardElement = elements.getElement(CardElement);

      // Confirm the payment with Stripe
      // const { error } = await stripe.confirmCardPayment(clientSecret, {
      //   payment_method: {
      //     card: cardElement,
      //   },
      // });

      // if (error) {
      //   // Handle payment error
      //   message.error(error.message);
      //   setLoading(false);
      // } else {
        // Payment was successful, proceed with booking
         bookingResponse = await axios.post("http://localhost:5675/toBook", { id, uid, product });

        if (bookingResponse.data === "ok") {
          setProducts(products.map((product, idx) => 
            idx === index ? { ...product, ...product.data.booked= true} : product
          ));
          product.booked = true;
          message.success("Payment Successful and booked!");
          onPaymentSuccess(); // Trigger success callback
          setPaymentModalOpen(false);
          onRequestClose(true) // Close the payment modal
          // setBookingModal(false)
          setLoading(false);
        } else {
          message.error("Booking failed. Please try again.");
          setLoading(false);
        }

      }
    catch (error) {
      console.error("Payment error:", error);
      message.error("An error occurred during payment.");
      setLoading(false);
    }
  };

  return (
    <Modal title="Payment" open={isOpen} footer={null} onCancel={()=>{onRequestClose(false)}}>
      <Text>Amount to pay: ${totalPrice}</Text>
      <Form style={{ marginTop: '20px' }} onFinish={handlePayment}>
        <Form.Item name="card" rules={[{ required: true, message: 'Please enter your card details!' }]}>
          <CardElement options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#32325d',
                letterSpacing: '0.025em',
                border: '1px solid #d9d9d9',
                padding: '10px',
              },
              invalid: {
                color: '#fa755a',
                iconColor: '#fa755a',
              },
            },
          }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} disabled={!stripe}>
            Confirm Payment
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const PaymentModalWrapper = (props) => (
  <Elements stripe={stripePromise}>
    <PaymentModal {...props} />
  </Elements>
);

export default PaymentModalWrapper;
