import {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from "recharts";


function UserDashboard() {

    const navigate = useNavigate();

    const username =
        localStorage.getItem("username");

    const user_id =
        localStorage.getItem("user_id");

    const [complaints, setComplaints] =
        useState([]);

    const [filteredComplaints,
        setFilteredComplaints] =
        useState([]);

    const [machineName,
        setMachineName] =
        useState("");

    const [complaintDescription,
        setComplaintDescription] =
        useState("");

    const [file, setFile] =
        useState(null);


    const handleLogout = () => {

        localStorage.clear();

        navigate("/");
    };


    const fetchComplaints = () => {

        fetch(
            `http://127.0.0.1:8000/complaints/user/${user_id}`
        )
        .then(res => res.json())
        .then(data => {

            setComplaints(data);

            setFilteredComplaints(data);
        })
        .catch(err => console.log(err));
    };


    useEffect(() => {

        fetchComplaints();

    }, []);


    const openCount =
        complaints.filter(
            c => c.status === "Open"
        ).length;

    const closedCount =
        complaints.filter(
            c => c.status === "Closed"
        ).length;


    const chartData = [
        {
            name: "Open",
            value: openCount
        },
        {
            name: "Closed",
            value: closedCount
        }
    ];


    const COLORS = [
        "#3B82F6",
        "#10B981"
    ];


    const handleComplaintSubmit =
        async (e) => {

        e.preventDefault();

        const formData =
            new FormData();

        formData.append(
            "machine_name",
            machineName
        );

        formData.append(
            "complaint_description",
            complaintDescription
        );

        formData.append(
            "user_id",
            user_id
        );

        if (file) {

            formData.append(
                "file",
                file
            );
        }

        try {

            await fetch(
                "http://127.0.0.1:8000/complaints",
                {
                    method: "POST",
                    body: formData
                }
            );

            fetchComplaints();

            setMachineName("");
            setComplaintDescription("");
            setFile(null);

        } catch (error) {

            console.log(error);
        }
    };


    return (

        <div className="flex min-h-screen bg-gray-100">

            {/* Sidebar */}

            <div className="w-64 bg-black text-white p-6">

                <h1 className="text-2xl font-bold mb-10">

                    CMS Portal

                </h1>

                <ul className="space-y-5">

                    <li className="hover:text-blue-400 cursor-pointer">

                        Dashboard

                    </li>

                    <li className="hover:text-blue-400 cursor-pointer">

                        Complaints

                    </li>

                    <li className="hover:text-blue-400 cursor-pointer">

                        Analytics

                    </li>

                    <li
                        onClick={handleLogout}
                        className="hover:text-red-400 cursor-pointer"
                    >

                        Logout

                    </li>

                </ul>

            </div>


            {/* Main Content */}

            <div className="flex-1 p-8">

                {/* Header */}

                <div className="flex justify-between items-center mb-8">

                    <div>

                        <h1 className="text-4xl font-bold">

                            User Dashboard

                        </h1>

                        <p className="text-gray-500">

                            Welcome {username}

                        </p>

                    </div>

                </div>


                {/* Summary Cards */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

                    <div className="bg-white rounded-2xl shadow p-6">

                        <h2 className="text-gray-500">

                            Total Complaints

                        </h2>

                        <p className="text-4xl font-bold mt-3">

                            {complaints.length}

                        </p>

                    </div>

                    <div className="bg-white rounded-2xl shadow p-6">

                        <h2 className="text-gray-500">

                            Open Complaints

                        </h2>

                        <p className="text-4xl font-bold text-blue-500 mt-3">

                            {openCount}

                        </p>

                    </div>

                    <div className="bg-white rounded-2xl shadow p-6">

                        <h2 className="text-gray-500">

                            Closed Complaints

                        </h2>

                        <p className="text-4xl font-bold text-green-500 mt-3">

                            {closedCount}

                        </p>

                    </div>

                </div>


                {/* Chart + Form */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

                    {/* Chart */}

                    <div className="bg-white rounded-2xl shadow p-6">

                        <h2 className="text-2xl font-bold mb-5">

                            Complaint Analytics

                        </h2>

                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >

                            <PieChart>

                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    dataKey="value"
                                    label
                                >

                                    {
                                        chartData.map(
                                            (entry, index) => (

                                                <Cell
                                                    key={index}
                                                    fill={
                                                        COLORS[index]
                                                    }
                                                />
                                            )
                                        )
                                    }

                                </Pie>

                                <Tooltip />

                            </PieChart>

                        </ResponsiveContainer>

                    </div>


                    {/* Complaint Form */}

                    <div className="bg-white rounded-2xl shadow p-6">

                        <h2 className="text-2xl font-bold mb-5">

                            Create Complaint

                        </h2>

                        <form
                            onSubmit={
                                handleComplaintSubmit
                            }
                            className="space-y-4"
                        >

                            <input
                                type="text"
                                placeholder="Machine Name"
                                value={machineName}
                                onChange={(e) =>
                                    setMachineName(
                                        e.target.value
                                    )
                                }
                                className="w-full border p-3 rounded-xl"
                                required
                            />

                            <textarea
                                placeholder="Complaint Description"
                                value={complaintDescription}
                                onChange={(e) =>
                                    setComplaintDescription(
                                        e.target.value
                                    )
                                }
                                className="w-full border p-3 rounded-xl"
                                rows="4"
                                required
                            />

                            <input
                                type="file"
                                onChange={(e) =>
                                    setFile(
                                        e.target.files[0]
                                    )
                                }
                            />

                            <button
                                type="submit"
                                className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800"
                            >

                                Submit Complaint

                            </button>

                        </form>

                    </div>

                </div>


                {/* Complaint List */}

                <div>

                    <h2 className="text-3xl font-bold mb-6">

                        My Complaints

                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {
                            filteredComplaints.map((c) => (

                                <div
                                    key={c.complaint_id}
                                    className="bg-white rounded-2xl shadow p-5"
                                >

                                    <div className="flex justify-between">

                                        <h3 className="text-xl font-bold">

                                            {c.machine_name}

                                        </h3>

                                        <span
                                            className={`px-3 py-1 rounded-full text-sm text-white ${
                                                c.status === "Open"
                                                ? "bg-blue-500"
                                                : "bg-green-500"
                                            }`}
                                        >

                                            {c.status}

                                        </span>

                                    </div>

                                    <p className="mt-4 text-gray-600">

                                        {c.description}

                                    </p>

                                    <div className="mt-4 text-sm text-gray-500">

                                        <p>

                                            <b>Boutique:</b>
                                            {" "}
                                            {c.boutique_name}

                                        </p>

                                        <p>

                                            <b>City:</b>
                                            {" "}
                                            {c.city}

                                        </p>

                                    </div>

                                    <p className="mt-4 text-sm text-gray-400">

                                        {
                                            c.complaint_time
                                            ?
                                            new Date(
                                                c.complaint_time
                                            ).toLocaleString(
                                                "en-IN",
                                                {
                                                    timeZone:
                                                        "Asia/Kolkata"
                                                }
                                            )
                                            :
                                            "N/A"
                                        }

                                    </p>

                                    {
                                        c.image_path && (

                                            <img
                                                src={
                                                    `http://127.0.0.1:8000/uploads/${c.image_path}`
                                                }
                                                alt="complaint"
                                                className="mt-4 rounded-xl w-full h-52 object-cover"
                                            />
                                        )
                                    }

                                </div>
                            ))
                        }

                    </div>

                </div>

            </div>

        </div>
    );
}

export default UserDashboard;