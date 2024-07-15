import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"
import "../styles/ResetPassword.scss";
import toastOptions from '../components/toast_options';
import { ToastContainer, toast } from "react-toastify";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { token } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault()


        if (handleValidation()) {
            try {
                const response = await fetch(`https://dreamhomes-backend.onrender.com/auth/reset-password/${token}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ password })
                })

                const result = await response.json()

                if (response.ok) {
                    toast.success("Password updated successfullly", toastOptions);
                    alert("Password updated successfullly");
                    navigate("/login");
                } else {
                    toast.error(result.message, toastOptions);
                }

            } catch (err) {
                console.log("Error updating email", err.message)
            }
        }
    }

    const handleValidation = () => {
        if (password === "") {
            toast.error("Please enter your password", toastOptions);
            return false;
        }
        return true;
    }

    return (
        <>
            <div className="forgot">
                <div className="forgot_content">
                    <form className="forgot_content_form" onSubmit={handleSubmit}>
                        <h2>Reset Password</h2>
                        <input
                            type="password"
                            placeholder="New password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Reset</button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default ResetPassword;
