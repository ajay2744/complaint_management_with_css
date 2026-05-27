import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [role, setRole] = useState("user");

    const [message, setMessage] = useState("");

    const [loginSuccess, setLoginSuccess] = useState(false);


    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                "http://127.0.0.1:8000/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        username,
                        password,
                        role
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {

                setMessage("Login Successful ✅");

                setLoginSuccess(true);

                localStorage.setItem(
                    "role",
                    data.role
                );

                localStorage.setItem(
                    "user_id",
                    data.user_id
                );

                localStorage.setItem(
                    "username",
                    data.username
                );

            } else {

                setMessage(data.detail);
            }

        } catch (error) {

            console.log(error);

            setMessage("Server Error ❌");
        }
    };


    const goToDashboard = () => {

        const savedRole =
            localStorage.getItem("role");

        if (savedRole === "admin") {

            navigate("/admin-dashboard");

        } else {

            navigate("/user-dashboard");
        }
    };


    return (

        <div className="
            min-h-screen
            flex
            items-center
            justify-center
            bg-gradient-to-br
            from-slate-950
            via-blue-950
            to-slate-900
            px-4
        ">

            <motion.div

                initial={{ opacity: 0, y: 20 }}

                animate={{ opacity: 1, y: 0 }}

                transition={{ duration: 0.6 }}

                className="
                    w-full
                    max-w-md
                    bg-slate-900/70
                    backdrop-blur-xl
                    border
                    border-slate-700
                    rounded-3xl
                    shadow-2xl
                    p-10
                "
            >

                {/* Heading */}

                <div className="text-center mb-8">

                    <h1 className="
                        text-5xl
                        font-extrabold
                        text-white
                    ">

                        Welcome Back

                    </h1>

                    <p className="
                        mt-3
                        text-slate-400
                        text-lg
                    ">

                        Login to your account

                    </p>

                </div>


                {/* Form */}

                <form
                    onSubmit={handleLogin}
                    className="space-y-6"
                >

                    {/* Username */}

                    <div>

                        <label className="
                            block
                            mb-2
                            text-slate-300
                        ">

                            Username

                        </label>

                        <input
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                            className="
                                w-full
                                p-4
                                rounded-2xl
                                bg-slate-800
                                border
                                border-slate-700
                                text-white
                                placeholder-slate-500
                                focus:outline-none
                                focus:ring-2
                                focus:ring-cyan-400
                            "
                        />

                    </div>


                    {/* Password */}

                    <div>

                        <label className="
                            block
                            mb-2
                            text-slate-300
                        ">

                            Password

                        </label>

                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            className="
                                w-full
                                p-4
                                rounded-2xl
                                bg-slate-800
                                border
                                border-slate-700
                                text-white
                                placeholder-slate-500
                                focus:outline-none
                                focus:ring-2
                                focus:ring-cyan-400
                            "
                        />

                    </div>


                    {/* Role */}

                    <div>

                        <label className="
                            block
                            mb-2
                            text-slate-300
                        ">

                            Login As

                        </label>

                        <select
                            value={role}
                            onChange={(e) =>
                                setRole(e.target.value)
                            }
                            className="
                                w-full
                                p-4
                                rounded-2xl
                                bg-slate-800
                                border
                                border-slate-700
                                text-white
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


                    {/* Login Button */}

                    <button
                        type="submit"
                        className="
                            w-full
                            py-4
                            rounded-2xl
                            bg-cyan-500
                            hover:bg-cyan-400
                            transition-all
                            duration-300
                            text-white
                            font-bold
                            text-lg
                            shadow-xl
                        "
                    >

                        Login

                    </button>

                </form>


                {/* Message */}

                {
                    message && (

                        <div className="
                            mt-5
                            text-center
                            text-sm
                            text-cyan-300
                        ">

                            {message}

                        </div>
                    )
                }


                {/* Dashboard Button */}

                {
                    loginSuccess && (

                        <button
                            onClick={goToDashboard}
                            className="
                                w-full
                                mt-5
                                py-4
                                rounded-2xl
                                bg-emerald-500
                                hover:bg-emerald-400
                                transition-all
                                duration-300
                                text-white
                                font-bold
                            "
                        >

                            Go To Dashboard

                        </button>
                    )
                }


                {/* Register */}

                <div className="
                    mt-8
                    text-center
                    text-slate-400
                ">

                    Don't have an account?{" "}

                    <span
                        onClick={() =>
                            navigate("/register")
                        }
                        className="
                            text-cyan-400
                            hover:text-cyan-300
                            cursor-pointer
                            font-semibold
                        "
                    >

                        Register

                    </span>

                </div>

            </motion.div>

        </div>
    );
}

export default Login;