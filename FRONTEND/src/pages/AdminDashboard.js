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


function AdminDashboard() {

    const navigate = useNavigate();

    const [complaints,
        setComplaints] = useState([]);

    const [filteredComplaints,
        setFilteredComplaints] =
        useState([]);


    const handleLogout = () => {

        localStorage.clear();

        navigate("/");
    };


    // FETCH ALL COMPLAINTS

    const fetchComplaints = () => {

        fetch(
            // "http://127.0.0.1:8000/complaints"
            "https://complaint-management-with-css.onrender.com/complaints"
        )
        .then(res => res.json())
        .then(data => {

            setComplaints(data);

            setFilteredComplaints(data);

        })
        .catch(err =>
            console.log(err)
        );
    };


    useEffect(() => {

        fetchComplaints();

    }, []);


    // COUNTS

    const openCount =
        complaints.filter(
            c => c.status === "Open"
        ).length;


    const closedCount =
        complaints.filter(
            c => c.status === "Closed"
        ).length;


    const pendingCount =
        complaints.filter(
            c => c.status === "Pending"
        ).length;


    // CHART DATA

    const chartData = [

        {
            name: "Open",
            value: openCount
        },

        {
            name: "Closed",
            value: closedCount
        },

        {
            name: "Pending",
            value: pendingCount
        }
    ];


    const COLORS = [
        "#3B82F6",
        "#10B981",
        "#F59E0B"
    ];
    const updateComplaintStatus =
        async (complaint_id, status) => {

        try {

        await fetch(

            `https://complaint-management-with-css.onrender.com/complaints/${complaint_id}/status`,

            {

                method: "PUT",

                headers: {

                    "Content-Type":
                    "application/json"
                },

                body: JSON.stringify({
                    status: status
                })
            }
        );

        // Refresh complaints
        fetchComplaints();

        } catch (error) {

        console.log(error);
        }
    };


    return (

        <div className="flex min-h-screen bg-gray-100">


            {/* SIDEBAR */}

            <div className="w-64 bg-black text-white p-6">

                <h1 className="text-2xl font-bold mb-10">

                    Admin Panel

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


            {/* MAIN CONTENT */}

            <div className="flex-1 p-8">


                {/* HEADER */}

                <div className="mb-8">

                    <h1 className="text-4xl font-bold">

                        Admin Dashboard

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Complaint Management Analytics

                    </p>

                </div>


                {/* SUMMARY CARDS */}

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">


                    <div className="bg-white shadow rounded-2xl p-6">

                        <h2 className="text-gray-500">

                            Total Complaints

                        </h2>

                        <p className="text-4xl font-bold mt-3">

                            {complaints.length}

                        </p>

                    </div>


                    <div className="bg-white shadow rounded-2xl p-6">

                        <h2 className="text-gray-500">

                            Open

                        </h2>

                        <p className="text-4xl font-bold text-blue-500 mt-3">

                            {openCount}

                        </p>

                    </div>


                    <div className="bg-white shadow rounded-2xl p-6">

                        <h2 className="text-gray-500">

                            Closed

                        </h2>

                        <p className="text-4xl font-bold text-green-500 mt-3">

                            {closedCount}

                        </p>

                    </div>


                    <div className="bg-white shadow rounded-2xl p-6">

                        <h2 className="text-gray-500">

                            Pending

                        </h2>

                        <p className="text-4xl font-bold text-yellow-500 mt-3">

                            {pendingCount}

                        </p>

                    </div>

                </div>


                {/* CHART */}

                <div className="bg-white rounded-2xl shadow p-6 mb-10">

                    <h2 className="text-2xl font-bold mb-5">

                        Complaint Analytics

                    </h2>

                    <ResponsiveContainer
                        width="100%"
                        height={350}
                    >

                        <PieChart>

                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                outerRadius={120}
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


                {/* COMPLAINT TABLE */}

                <div className="bg-white rounded-2xl shadow p-6">

                    <h2 className="text-2xl font-bold mb-6">

                        All Complaints

                    </h2>


                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead>

                                <tr className="border-b bg-gray-100">

                                    <th className="text-left p-4">

                                        User

                                    </th>

                                    <th className="text-left p-4">

                                        Machine

                                    </th>

                                    <th className="text-left p-4">

                                        Boutique

                                    </th>

                                    <th className="text-left p-4">

                                        City

                                    </th>

                                    <th className="text-left p-4">

                                        Status

                                    </th>

                                    <th className="text-left p-4">

                                        Time

                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {
                                    filteredComplaints.map((c) => (

                                        <tr
                                            key={c.complaint_id}
                                            className="border-b hover:bg-gray-50"
                                        >

                                            <td className="p-4">

                                                {c.username}

                                            </td>

                                            <td className="p-4">

                                                {c.machine_name}

                                            </td>

                                            <td className="p-4">

                                                {c.boutique_name}

                                            </td>

                                            <td className="p-4">

                                                {c.city}

                                            </td>

                                            <td className="p-4">

    <select

        value={c.status}

        onChange={(e) =>
            updateComplaintStatus(
                c.complaint_id,
                e.target.value
            )
        }

        className="border rounded-lg px-3 py-2"
    >

        <option value="Open">

            Open

        </option>

        <option value="In Progress">

            In Progress

        </option>

        <option value="Closed">

            Closed

        </option>

    </select>

</td>

                                            <td className="p-4 text-sm text-gray-500">

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

                                            </td>

                                        </tr>
                                    ))
                                }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;