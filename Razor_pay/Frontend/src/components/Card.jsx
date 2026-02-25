import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Card = (props) => {

    useEffect(() => {

    }, [])

    const onPayment = async (price, item) => {
        try {

            if (typeof price !== "number") {
                console.error("Invalid price:", price);
                return;
            }


            const { data } = await axios.post(
                "http://localhost:8100/api/payments/create-order",
                {
                    courseId: 1,
                    amount: price
                }
            );

            if (!data.success) {
                throw new Error("Order creation failed");
            }

            const order = data.order;

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY,
                amount: order.amount,
                currency: "INR",
                name: "ElectroHubs",
                description: item.title,
                order_id: order.id,
                handler: async function (response) {
                    try {
                        const verifyRes = await axios.post(
                            "http://localhost:8100/api/payments/verify-payment",
                            {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            }
                        );

                        if (verifyRes.data.success) {
                            alert("Payment Successful 🎉");
                        } else {
                            alert("Payment verification failed");
                        }

                    } catch (error) {
                        console.error("Verification Error:", error);
                    }
                },

                theme: {
                    color: "#6366f1"
                }
            };
            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error("Payment error:", error.response?.data || error.message);
        }
    };

    return (
        <>
            <div className="flex justify-center items-center border border-gray-500 rounded-lg shadow-lg">
                <div className="p-2">
                    <div className="mb-5 ">
                        <h3>{props.name} <span>{props.time}</span></h3>
                        <h2>{props.title}</h2>
                        <div className='mt-2 flex justify-start gap-2 items-center'>
                            <h4 className='border border-gray-200 shadow text-dark px-2 py-1 rounded-lg bg-gray-300'>{props.type1}</h4>
                            <h4 className='border border-gray-200 shadow text-dark px-2 py-1 rounded-lg bg-gray-300'>{props.type2}</h4>
                        </div>
                    </div>
                    <div className="flex justify-between items-centerborder border-dark-500">
                        <div>
                            {props.salary}
                        </div>
                        <div>
                            <button className='px-2 py-1 rounded-lg shadow hover:bg-gray-300 duration-300' onClick={() => onPayment(props.salary, props.name)}>Apply Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card