import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"
import "../styles/ForgotPassword.scss";
import toastOptions from '../components/toast_options';
import { ToastContainer, toast } from "react-toastify";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (handleValidation()) {
            try {
                const response = await fetch("https://dreamhomes-backend.onrender.com/auth/forgot-password", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email })
                })

                const result = await response.json()

                if (response.ok) {
                    toast.success("we are sending email for reset password, please wait!", toastOptions);
                    alert("check your email for reset password link");
                    navigate("/login");
                } else {
                    toast.error(result.message, toastOptions);
                }

            } catch (err) {
                console.log("Error sending email", err.message)
            }
        }
    }

    const handleValidation = () => {
        if (email === "") {
            toast.error("Please enter your email", toastOptions);
            return false;
        }
        return true;
    }

    return (
        <>
            <div className="forgot">
                <div className="forgot_content">
                    <form className="forgot_content_form" onSubmit={handleSubmit}>
                        <h2>Forgot Password</h2>
                        <p>Forgotten your password? Enter your e-mail address below, and we'll send you an e-mail allowing you to reset it.</p>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit">Send</button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default ForgotPassword;
