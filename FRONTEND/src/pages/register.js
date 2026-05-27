import { useState } from "react";

import { useNavigate }
from "react-router-dom";

import { motion } from "framer-motion";


function Register() {

    const navigate = useNavigate();

    const [username, setUsername] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [role, setRole] =
        useState("user");

    const [phone, setPhone] =
        useState("");

    const [city, setCity] =
        useState("");

    const [boutiqueName,
        setBoutiqueName] =
        useState("");

    const [boutiqueCode,
        setBoutiqueCode] =
        useState("");

    const [message, setMessage] =
        useState("");


    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                "https://complaint-management-with-css.onrender.com/register",

                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        username,

                        password,

                        role,

                        phone,

                        city,

                        boutique_name:
                            boutiqueName,

                        boutique_code:
                            boutiqueCode
                    })
                }
            );

            const data =
                await response.json();

            console.log(data);

            if (response.ok) {

                setMessage(
                    "Registration Successful ✅"
                );

                setTimeout(() => {

                    navigate("/login");

                }, 1500);

            } else {

                setMessage(data.detail);
            }

        } catch (error) {

            console.log(error);

            setMessage("Server Error ❌");
        }
    };


    return (

        <div
            className="
                min-h-screen
                flex
                items-center
                justify-center
                bg-gradient-to-br
                from-slate-950
                via-blue-950
                to-slate-900
                px-4
            "
        >

            <motion.div

                initial={{ opacity: 0, y: 30 }}

                animate={{ opacity: 1, y: 0 }}

                transition={{ duration: 0.6 }}

                className="
                    w-full
                    max-w-2xl
                    bg-white/10
                    backdrop-blur-lg
                    border
                    border-white/20
                    rounded-3xl
                    shadow-2xl
                    p-8
                    text-white
                "
            >

                {/* Title */}

                <div className="text-center mb-8">

                    <h1 className="
                        text-4xl
                        font-bold
                        text-cyan-400
                    ">
                        Create Account
                    </h1>

                    <p className="
                        text-slate-300
                        mt-2
                    ">
                        Register into Complaint Management System
                    </p>

                </div>


                {/* Form */}

                <form
                    onSubmit={handleRegister}
                    className="space-y-5"
                >

                    {/* Grid Layout */}

                    <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        gap-5
                    ">

                        {/* Username */}

                        <div>

                            <label className="
                                block
                                mb-2
                                text-sm
                                text-slate-300
                            ">
                                Username
                            </label>

                            <input
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) =>
                                    setUsername(
                                        e.target.value
                                    )
                                }
                                required
                                className="
                                    w-full
                                    p-3
                                    rounded-xl
                                    bg-white/10
                                    border
                                    border-slate-600
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-cyan-400
                                    placeholder-slate-400
                                "
                            />

                        </div>


                        {/* Password */}

                        <div>

                            <label className="
                                block
                                mb-2
                                text-sm
                                text-slate-300
                            ">
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                                required
                                className="
                                    w-full
                                    p-3
                                    rounded-xl
                                    bg-white/10
                                    border
                                    border-slate-600
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-cyan-400
                                    placeholder-slate-400
                                "
                            />

                        </div>


                        {/* Phone */}

                        <div>

                            <label className="
                                block
                                mb-2
                                text-sm
                                text-slate-300
                            ">
                                Phone
                            </label>

                            <input
                                type="text"
                                placeholder="Enter phone"
                                value={phone}
                                onChange={(e) =>
                                    setPhone(
                                        e.target.value
                                    )
                                }
                                required
                                className="
                                    w-full
                                    p-3
                                    rounded-xl
                                    bg-white/10
                                    border
                                    border-slate-600
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-cyan-400
                                    placeholder-slate-400
                                "
                            />

                        </div>


                        {/* City */}

                        <div>

                            <label className="
                                block
                                mb-2
                                text-sm
                                text-slate-300
                            ">
                                City
                            </label>

                            <input
                                type="text"
                                placeholder="Enter city"
                                value={city}
                                onChange={(e) =>
                                    setCity(
                                        e.target.value
                                    )
                                }
                                required
                                className="
                                    w-full
                                    p-3
                                    rounded-xl
                                    bg-white/10
                                    border
                                    border-slate-600
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-cyan-400
                                    placeholder-slate-400
                                "
                            />

                        </div>


                        {/* Boutique Name */}

                        <div>

                            <label className="
                                block
                                mb-2
                                text-sm
                                text-slate-300
                            ">
                                Boutique Name
                            </label>

                            <input
                                type="text"
                                placeholder="Enter boutique name"
                                value={boutiqueName}
                                onChange={(e) =>
                                    setBoutiqueName(
                                        e.target.value
                                    )
                                }
                                required
                                className="
                                    w-full
                                    p-3
                                    rounded-xl
                                    bg-white/10
                                    border
                                    border-slate-600
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-cyan-400
                                    placeholder-slate-400
                                "
                            />

                        </div>


                        {/* Boutique Code */}

                        <div>

                            <label className="
                                block
                                mb-2
                                text-sm
                                text-slate-300
                            ">
                                Boutique Code
                            </label>

                            <input
                                type="text"
                                placeholder="Enter boutique code"
                                value={boutiqueCode}
                                onChange={(e) =>
                                    setBoutiqueCode(
                                        e.target.value
                                    )
                                }
                                required
                                className="
                                    w-full
                                    p-3
                                    rounded-xl
                                    bg-white/10
                                    border
                                    border-slate-600
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-cyan-400
                                    placeholder-slate-400
                                "
                            />

                        </div>

                    </div>


                    {/* Role */}

                    <div>

                        <label className="
                            block
                            mb-2
                            text-sm
                            text-slate-300
                        ">
                            Register As
                        </label>

                        <select
                            value={role}
                            onChange={(e) =>
                                setRole(
                                    e.target.value
                                )
                            }
                            className="
                                w-full
                                p-3
                                rounded-xl
                                bg-slate-800
                                border
                                border-slate-600
                                focus:outline-none
                                focus:ring-2
                                focus:ring-cyan-400
                            "
                        >

                            <option value="user">
                                User
                            </option>

                            <option value="admin">
                                Admin
                            </option>

                        </select>

                    </div>


                    {/* Submit Button */}

                    <button
                        type="submit"
                        className="
                            w-full
                            py-3
                            rounded-xl
                            bg-cyan-500
                            hover:bg-cyan-400
                            transition-all
                            duration-300
                            text-lg
                            font-semibold
                            shadow-lg
                        "
                    >

                        Register

                    </button>

                </form>


                {/* Message */}

                {
                    message && (

                        <div
                            className="
                                mt-5
                                text-center
                                p-3
                                rounded-xl
                                bg-white/10
                            "
                        >

                            {message}

                        </div>
                    )
                }


                {/* Login Link */}

                <div className="
                    mt-6
                    text-center
                    text-slate-300
                ">

                    Already have an account?{" "}

                    <span
                        onClick={() =>
                            navigate("/login")
                        }
                        className="
                            text-cyan-400
                            hover:text-cyan-300
                            cursor-pointer
                            font-semibold
                        "
                    >

                        Login

                    </span>

                </div>

            </motion.div>

        </div>
    );
}

export default Register;