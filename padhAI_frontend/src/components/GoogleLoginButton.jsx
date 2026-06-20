import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = () => {
    const navigate = useNavigate();


    const handleSuccess = async (response) => {
        const googleToken = response.credential;
        // Sanitize API URL: Remove trailing slash if present
        const API_URL = import.meta.env.VITE_API_URL.replace(/\/$/, "");

        // alert("Got Google Token! Sending to backend...");

        try {
            console.log("Sending to:", `${API_URL}/api/auth/google`);
            const res = await fetch(`${API_URL}/api/auth/google`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: googleToken })
            });

            // Read text first to debug HTML errors
            const textStr = await res.text();
            console.log("Backend Response:", res.status, textStr);

            let data;
            try {
                data = JSON.parse(textStr);
            } catch (e) {
                // If it fails to parse, it's likely an HTML error page (404/500)
                // alert(`Login Failed! Server Status: ${res.status}\nResponse: ${textStr.slice(0, 150)}...`);
                return;
            }

            if (res.ok) {
                localStorage.setItem("token", data.token);
                if (data.user && data.user.goal) {
                    localStorage.setItem("userDomain", data.user.goal);
                }

                if (data.user.goal) {
                    navigate("/space");
                } else {
                    navigate("/domain-selection");
                }
            } else {
                console.error("Google Auth failed on backend:", data);
                // alert("Backend Error: " + (data.msg || "Unknown error"));
            }

        } catch (error) {
            console.error("Error sending token to backend:", error);
            // alert("Network Error: " + error.message);
        }
    };

    return (
        <div className="w-full flex justify-center mt-6">
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={() => console.log("Google Login Failed")}
                theme="filled_blue"
                size="medium"
                shape="pill"
                text="continue_with"
                width="300"
            />
        </div>
    );
};

export default GoogleLoginButton;
