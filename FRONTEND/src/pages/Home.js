import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";

function Home() {

    const navigate = useNavigate();

    return (

        <div className="
            h-screen
            flex
            flex-col
            items-center
            justify-center
            bg-slate-900
            text-white
            text-center
            px-4
        ">

            <img
                src={logo}
                alt="Logo"
                className="w-40 mb-8"
            />

            <h1 className="
                text-5xl
                font-bold
            ">

                Complaint Management System

            </h1>

            <p className="
                mt-5
                text-slate-300
                text-xl
                max-w-2xl
            ">

                Modern complaint tracking
                and analytics platform

            </p>

            <div className="
                mt-10
                flex
                gap-5
            ">

                <button
                    onClick={() =>
                        navigate("/login")
                    }
                    className="
                        px-8
                        py-3
                        bg-cyan-500
                        rounded-xl
                    "
                >

                    Login

                </button>

                <button
                    onClick={() =>
                        navigate("/register")
                    }
                    className="
                        px-8
                        py-3
                        border
                        border-white
                        rounded-xl
                    "
                >

                    Register

                </button>

            </div>

        </div>
    );
}

export default Home;