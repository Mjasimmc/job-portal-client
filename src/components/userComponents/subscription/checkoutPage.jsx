import React from 'react';
import MyButton from '../../../ui/elements/myButton';
import useRazorpay from 'react-razorpay';
import { createRazorpayInstanceFromServer, savePaymentWithPaymentId } from '../../../service/userpayment';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { toast_config } from '../../../config/constants';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = ({ plan }) => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user);
    const [Razorpay] = useRazorpay();

    const makePayment = async () => {
        const { name } = plan;
        const productId = plan._id;
        const cost = plan.price;
        console.log(cost, name, productId, user);

        try {
            const res = await createRazorpayInstanceFromServer(cost, plan._id);
            console.log(res);
            const options = {
                key: res.key_id,
                amount: res.order.amount,
                currency: 'INR',
                name: 'Acme Corp',
                description: 'Test Transaction',
                image: 'http://localhost:3000/src/assets/logo.png',
                order_id: res.order.id,
                handler: async (response) => {
                    try {

                        console.log(res.order.receipt)
                        await savePaymentWithPaymentId({ ...response, ordeId: res.order.receipt });
                        navigate('/subscribtion')
                    } catch (error) {
                        console.log(error )
                    }
                },
                prefill: {
                    name: user.name,
                    email: user.email.mail_id,
                    contact: user.phone.number,
                },
                notes: {
                    address: 'Razorpay Corporate Office',
                },
                theme: {
                    color: '#3399cc',
                },
            };
            const rzp1 = new Razorpay(options);
            rzp1.on('payment.failed', function (response) {
                // alert(response.error.code);
                // alert(response.error.description);
                // alert(response.error.source);
                // alert(response.error.step);
                // alert(response.error.reason);
                // alert(response.error.metadata.order_id);
                // alert(response.error.metadata.payment_id);
                console.log(response.error.description)
                toast.error(response.error.description, toast_config)
            });
            rzp1.open();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <MyButton onClick={makePayment}>Buy</MyButton>
        </>
    );
};

export default CheckoutPage;

