const useWeb3 = () => {
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
}