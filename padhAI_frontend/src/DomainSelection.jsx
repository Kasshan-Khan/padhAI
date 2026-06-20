import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css'; // Reuse existing styles for consistency

const DomainSelection = () => {
    const navigate = useNavigate();
    const [selectedDomain, setSelectedDomain] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSelect = async (domain) => {
        setSelectedDomain(domain);
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first");
            navigate("/login");
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/domain`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ domain })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("userDomain", domain);
                navigate("/space");
            } else {
                alert(data.msg || "Failed to update domain");
            }
        } catch (error) {
            console.error(error);
            alert("Error updating domain");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mainContainer">
            <div className="loginsignup-container" style={{ height: 'auto', padding: '50px', maxWidth: '800px' }}>
                <div className="loginsignup-header">
                    <h1 className="text_ab_ab_sngup" style={{ marginBottom: '30px' }}>Select Your Goal</h1>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', alignItems: 'center' }}>
                    {["JEE", "NEET", "ENGINEERING"].map((domain) => (
                        <button
                            key={domain}
                            className="loginsignup-submit"
                            style={{ width: '300px', backgroundColor: '#10612d' }}
                            onClick={() => handleSelect(domain)}
                            disabled={loading}
                        >
                            {loading && selectedDomain === domain ? "Updating..." : domain}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DomainSelection;
