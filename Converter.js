import React from 'react'

const Converter = (props) => {

    const {
        curOptions,
        selectedCurrency,
        onChangeCurrency,
        amount,
        onChangeAmount
    } = props

    return (
        <div>
            <input type = "number" className ="input" value = {amount} onChange ={onChangeAmount} />
            <select value ={selectedCurrency} onChange={onChangeCurrency} >
                {
                    curOptions.map(options => (
                        <option key ={options} value= {options}>{options}</option>
                    ))
                }
                
            </select>

        </div>
    )
}

export default Converter
