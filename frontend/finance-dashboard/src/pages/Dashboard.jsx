import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import API from "../services/api";
const Dashboard = ()=>{
    const [form,setForm] = useState({
        type: "expense",
        category: "",
        amount: "",
        date: "",
    })
    const token = localStorage.getItem("token");

    let role = "";
    if (token) {
        try {
        const decoded = jwtDecode(token);
        role = decoded.role;
        } catch (error) {
        console.error("Invalid token");
        }
    }
    console.log(role);

    const [summary, setSummary] = useState({});
    const [recent, setRecent] = useState([]);

    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData = async()=>{
        try{
            const summaryRes = await API.get("/dashboard/summary");
            const recentRes = await API.get("/dashboard/recent");

            setSummary(summaryRes.data);
            setRecent(recentRes.data);

        }catch(error){
            console.error("Error Fetching Data", error);
        }
    }
    const handleAdd = async () => {
    try {
    await API.post("/records", form);

    // reset form
    setForm({
      type: "expense",
      category: "",
      amount: "",
      date: "",
    });

    fetchData();
    } catch (err) {
        
      console.error(err);
    }
  };
  const handleDelete = async (id) => {
  try {
    await API.delete(`/records/${id}`);
    fetchData();
  } catch (err) {
    console.error(err);
  }
};

    return (
        <div style={{ padding: "20px" }}>
        <h1>Finance Dashboard : Welcome {role}</h1>

        <h2>Summary</h2>
        <p><b>Income:</b> {summary.totalIncome}</p>
        <p><b>Expense:</b> {summary.totalExpense}</p>
        <p><b>Balance:</b> {summary.netBalance}</p>

        <h2>Recent Transactions</h2>
        {recent.length === 0 ? (
            <p>No records found</p>
        ) : (
            recent.map((item) => (
            <div key={item._id}>
                <p>
                {item.category} - ₹{item.amount}
                </p>
                {role === "admin" && (
        <button onClick={()=>handleDelete(item._id)}>Delete Records</button>
      )}
            </div>
            ))
        )}
        
      {role === "admin" && (
        <button>Update Records</button>
      )}
      {role === "admin" && (
        <>
        <button onClick={handleAdd}>ADD Records</button>
        

        <h2>Add Record</h2>

        <select
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
        </select>

        <br /><br />

        <input
        type="text"
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <br /><br />

        <input
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />

        <br /><br />

        <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <br /><br />
      </>)
      }

      {(role === "analyst" || role==="admin") && (
        <button>View Analytics</button>
      )}

      {role === "viewer" && (
        <p>Read Only Access</p>
      )}
        </div>
    );
    
};

export default Dashboard;