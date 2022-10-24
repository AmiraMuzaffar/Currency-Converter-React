import Converter from './Converter';
import './App.css';
import React, {useEffect, useState} from 'react';
import logo from './arrow.png';

const URL = "https://v6.exchangerate-api.com/v6/835af88344d7ca9dde581fe8/latest/USD";


const App = () => {

  const [curOptions, setCurOption] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency,setToCurrency] = useState();
  const [exchangeRate,setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountFromCur, setAmountFromCur] = useState(true);

  let toAmount, fromAmount ;
  if(amountFromCur) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  }else{
    toAmount = amount
    fromAmount = amount / exchangeRate
  }


  useEffect(() => {
    fetch(URL)
    .then(res => res.json())
    .then(data => {
      const currency = Object.keys(data.conversion_rates)[1];
      setCurOption([...Object.keys(data.conversion_rates)])
      setFromCurrency(data.base_code)
      setToCurrency(currency)
      setExchangeRate(data.conversion_rates[currency])
       
    })
    },[])


    useEffect(() => {
      if (fromCurrency != null && toCurrency != null) {
        fetch(`${URL}?base=${fromCurrency}&symbols=${toCurrency}`)
          .then(res => res.json())
          .then(data => setExchangeRate(data.conversion_rates[toCurrency]))
      }
    }, [fromCurrency, toCurrency])

    
    function handleFromAmountChange(e) {
      setAmount(e.target.value)
      setAmountFromCur(true)
    }
  
    function handleToAmountChange(e) {
      setAmount(e.target.value)
      setAmountFromCur(false)
    }

  return (
    <div class="main">
  <h1>Convert</h1> 
  <Converter curOptions={curOptions}
  selectedCurrency={fromCurrency}
  onChangeCurrency={event => setFromCurrency(event.target.value)}
  onChangeAmount={handleFromAmountChange}
  amount={fromAmount}
  />
  <div>
    <img src={logo} alt="currency arrow" />
  </div>
  <Converter curOptions ={curOptions} 
  selectedCurrency ={toCurrency} 
  onChangeCurrency ={event => setToCurrency(event.target.value)}
  amount = {+toAmount}
  onChangeAmount = {handleToAmountChange} 
  />
  </div>
  );
}

export default App;
