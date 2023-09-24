import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const numberZer0 = Number(0);
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('CHF')
  const [amount, setAmount] = useState(numberZer0)
  const [output, setOutput] = useState(numberZer0)
  const [isLoading, setIsLoading] = useState(false)
 

useEffect(() => {
  // fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`)
  async function convert () {
    if (amount === 0 || amount.length < 1 || to === from) {
      setOutput(numberZer0)
      setAmount(numberZer0)
      return
    };
    

    try{
      setIsLoading(true);

      const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`)

      if (!response.ok){
        throw new Error("Error while fetching data")
      }

      const data = await response.json();
      if (data.response === "False") throw new Error ('Invalid input')

      const rate = data.rates[to]
      setOutput(rate)
      console.log(rate)
    }catch (err){
      console.log(err.message)
    }
    finally{
      setIsLoading(false)
    }
  }
  convert();
}, [to, from, amount, output, numberZer0])

console.log(amount, to, from, output)
  return (
    
    <div className="App">
      this is not a drill
      <input type="text" value={amount} onChange={(e) => setAmount(Number(e.target.value))}/>
      <select value={from} onChange={(e) => setFrom(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
        <option value="BRL">BRL</option>
        <option value="CHF">CHF</option>
        <option value="NOK">NOK</option>
        <option value="SEK">SEK</option>
        <option value="ZAR">ZAR</option>

      </select>
      <select value={to} onChange={(e) => setTo(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
        <option value="BRL">BRL</option>
        <option value="CHF">CHF</option>
        <option value="NOK">NOK</option>
        <option value="SEK">SEK</option>
        <option value="ZAR">ZAR</option>
      </select>
      
    {isLoading ? <Loader /> : <p>OUTPUT : {output.toFixed(2)} {to}</p>}
    </div>
  );
}

const Loader = () => {
  return <p className="loader">LOADING...</p>
}
// https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD
export default App;
// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

