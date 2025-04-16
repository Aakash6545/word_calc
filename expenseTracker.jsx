import { useState,useEffect, useSyncExternalStore } from "react";

const ExpenseTracker = () =>{
    const [expenses,setExpenses] = useState([]);
    const [title, setTitle] = useState('');
    const [amount , setAmount] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [editingID, setEditingId] = useState(null);

    const [isFormVisible, setFormVisible] = useState(false);

    const handleSubmit = (e)=>{
        e.preventDefault();

        if(!title || !amount || isNaN(parseFloat(amount)) || parseFloat(amount)<=0){

        }
        if(editingID!=null){
            const updatedExpenses =expenses.map(expense =>
                expense.id === editingID.id ? {...expense,title, amount:parseFloat(amount),date}:expense

            );
            setExpenses(updatedExpenses);

        }else{
            const newExpense ={
                id:Date.now(),
                title,amount:parseFloat(amount),
                date
            }
            setExpenses(...expenses,newExpense)
        }
        resetForm();
    }
    const resetForm = ( )=>{
        setTitle('');
        setAmount('');
        setDate(new Date().toISOString().split('T')[0])
        setEditingId(null);
        setFormVisible(false);
    }
    const handleEdit = (expense)=>{
        setTitle(expense.title);
        setAmount(expense.amount.toString())
        setDate(expense.date);
        setEditingId(expense.id);
        setFormVisible(true);
    }
    const handleDelete = (expense)=>{
        setExpenses(expense.filter(expense => expense.id !== id))
    }
    const totalExpenses = expenses.reduce((total,expense)=> total+expense.amount ,0)
    return(
        <>
        <div className="app-container">
            <header>
                <h1> Expense Tracker</h1>
                <button className="btn ad-btn" onClick={setFormVisible(true)}>
                    Add New Expense
                </button>
            </header>
            {
                isFormVisible && (
                    <div className="form-overlay">
                        <div className="form-container">
                            <h2>{editingID!==null ? 'Edit Response': 'Add New Expense'}</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input 
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e)=>setTitle(e.target.value)}
                                required
                                 />
                                </div>
                                <div className="form-group">
                                <label htmlFor="title">Amount </label>
                                <input 
                                type="number"
                                id="amount"
                                step ="0.01"
                                min="0.01"
                                value={amount}
                                onChange={(e)=>setAmount(e.target.value)}
                                required
                                 />
                                </div>
                                <div className="form-group">
                                <label htmlFor="title">Date</label>
                                <input 
                                type="date"
                                id="date"
                                value={date}
                                onChange={(e)=> setDate(e.target.value)}
                                required
                                 />
                                </div>
                                <div className="form-actions">
                                    <button type= "submit" className="btn submit-btn">
                                        {
                                            editingID !== null ? 'Update' : 'Add'
                                        }

                                    </button>

                                     
                                </div>
                            </form>


                        </div>

                    </div>

                )
            }

            <div className="expense-sumary">
                <p> Total Expenses: <span className="total-amount"> ${totalExpenses.toFixed(2)}</span></p>

            </div>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense)=>(
                        <tr key={expense.id}>
                            <td>{expense.title}</td>
                            <td>{parseFloat(expense.amount).toFixed(2)}</td>
                            <td>{expense.date}</td>
                            <td>
                                <button onClick={()=>handleEdit(expense)}>
                                    Edit
                                </button>
                                <button onClick={()=>handleDelete(expense)}>
                                    Delete
                                </button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
        </>
    )
}

export default ExpenseTracker