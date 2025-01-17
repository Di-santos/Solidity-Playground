import React, {useState, useEffect } from "react";
import SimpleStorageContract from "../../contracts/SimpleStorage.json";
import getWeb3 from "../../hooks/getWeb3";

import "./index.css";

const TestContract = () => {
    const [storageValue, setStorageValue] = useState(0)
    const [web3, setWeb3] = useState(undefined)
    const [contract, setContract] = useState(undefined)
    const [accounts, setAccounts] = useState([])

    useEffect(() => {
        const init = async() =>{
            try {
                // Get network provider and web3 instance.
                const web3 = await getWeb3();
          
                // Use web3 to get the user's accounts.
                const accounts = await web3.eth.getAccounts();
          
                // Get the contract instance.
                const networkId = await web3.eth.net.getId();
                const deployedNetwork = SimpleStorageContract.networks[networkId];
                const contract = new web3.eth.Contract(
                  SimpleStorageContract.abi,
                  deployedNetwork && deployedNetwork.address,
                );
          
                // Set web3, accounts, and contract to the state, and then proceed with an
                // example of interacting with the contract's methods.
                setWeb3(web3);
                setAccounts(accounts)
                setContract(contract)
              } catch (error) {
                // Catch any errors for any of the above operations.
                alert(
                  `Failed to load web3, accounts, or contract. Check console for details.`,
                );
                console.error(error);
              }
        }
        init()
    },[])

    useEffect(() => {
        if (typeof contract !== "undefined"){
            getData()
        }
    }, [web3, accounts, contract])

    const getData = async() => {
        // Get the value from the contract to prove it worked.
        const response = await contract.methods.get().call();
        // Update state with the result.
        setStorageValue(response)
    }

    const attStorageOnBlockchain = async() =>{
        // Stores a given value, 5 by default.
        await contract.methods.set(Number.parseInt(storageValue) + 1).send({ from: accounts[0] });
        getData()

    }

    return (
        <div>
            {typeof web3 === "undefined" && typeof contract === "undefined"
            ?  <div>Carregando recursos da Web3...</div>
            :  <div className="App">
                    <h1>Tudo certo!</h1>
                    <p>Ao clicar no botão, você envia uma requisição ao método do contrato
                        para aumentar o valor armazenado na blockchain em um!</p>
                    <div>Valor atual: {storageValue}</div>
                    <button onClick={() => attStorageOnBlockchain()}>
                        aumentar em 1
                    </button>
                </div>
            }
        </div>
        
    )
}

export default TestContract