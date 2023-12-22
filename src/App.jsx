import { useEffect, useState } from "react";
import "./App.scss";

function App() {
  const [name, setName] = useState();
  const [date, setDate] = useState();
  const [description, setDescription] = useState();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTrasaction().then(setTransactions);
  }, []);

  async function getTrasaction() {
    const url = "https://money-traking-app.onrender.com/api/transactions";
    const response = await fetch(url);
    return await response.json();
  }

  function addNewTransaction(ev) {
    ev.preventDefault();
    const url = "https://money-traking-app.onrender.com/api/transaction";

    const price = name.split(" ")[0];

    fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: name.substring(price.length + 1),
        price,
        description,
        date,
      }),
    }).then((response) => {
      response.json().then((json) => {
        console.log("result ", json);
        alert("Transaction Added");
        getTrasaction().then(setTransactions);
      });
    });
  }

  let balance = 0;
  for (const transaction of transactions) {
    balance = balance + transaction.price;
  }
  return (
    <>
      <main>
        <h1>
          {balance}
          <span className="cents">.00</span>
        </h1>
        <form onSubmit={addNewTransaction}>
          <div className="basic">
            <input
              type="text"
              placeholder="-200 samsung tv"
              className="form-input"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <input
              type="datetime-local"
              className="form-input"
              value={date}
              onChange={(ev) => setDate(ev.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              className="form-input description"
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />
            <input
              type="submit"
              value={"Add new transaction"}
              className="submit"
            />
          </div>
        </form>
        {transactions.length > 0 &&
          transactions.map((transaction) => (
            <div key={transaction.name}>
              <div className="transactions">
                <div className="transaction">
                  <div className="left">
                    <div className="name">{transaction.name}</div>
                    <div className="description">{transaction.description}</div>
                  </div>

                  <div className="right">
                    <div
                      className={
                        "price " + (transaction.price > 0 ? "green" : "red")
                      }
                    >
                      {transaction.price}
                    </div>
                    <div className="datetime">{transaction.date}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </main>
    </>
  );
}

export default App;
