import {
    HOME_CONNECT_WALLET_BEGIN,
    HOME_CONNECT_WALLET_SUCCESS,
    HOME_CONNECT_WALLET_FAILURE,
    HOME_ACCOUNTS_CHANGED,
    HOME_NETWORK_CHANGED,

		HOME_DISCONNECT_WALLET_BEGIN,
		HOME_DISCONNECT_WALLET_SUCCESS,
		HOME_DISCONNECT_WALLET_FAILURE
} from './constants';
import Web3 from 'web3';

export function connectWallet(web3Modal) {
  return async dispatch => {
    dispatch({ type: HOME_CONNECT_WALLET_BEGIN });
    try {
      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);
      web3.eth.extend({
        methods: [
          {
            name: 'chainId',
            call: 'eth_chainId',
            outputFormatter: web3.utils.hexToNumber,
          },
        ],
      });
      const subscribeProvider = provider => {
        if (!provider.on) {
          return;
        }
        provider.on('close', () => {
          dispatch(disconnectWallet(web3, web3Modal));
        });
        provider.on('disconnect', async () => {
          dispatch(disconnectWallet(web3, web3Modal));
        });
        provider.on('accountsChanged', async accounts => {
          if (accounts[0]) {
            dispatch({ type: HOME_ACCOUNTS_CHANGED, data: accounts[0] });
          } else {
            dispatch(disconnectWallet(web3, web3Modal));
          }
        });
        provider.on('chainChanged', async chainId => {
          const networkId = web3.utils.isHex(chainId) ? web3.utils.hexToNumber(chainId) : chainId;
					console.log(networkId);
          dispatch({ type: HOME_NETWORK_CHANGED, data: networkId });
        });
      };
      subscribeProvider(provider);

      const accounts = await web3.eth.getAccounts();
      const address = accounts[0];
      let networkId = await web3.eth.getChainId();
      if (networkId === 86) {
        // Trust provider returns an incorrect chainId for BSC.
        networkId = 56;
      }

      dispatch({ type: HOME_CONNECT_WALLET_SUCCESS, data: { web3, address, networkId } });
    } catch (error) {
      dispatch({ type: HOME_CONNECT_WALLET_FAILURE });
    }
  };
}

export function disconnectWallet(web3, web3Modal) {
  return dispatch => {
    dispatch({ type: HOME_DISCONNECT_WALLET_BEGIN });

    const promise = new Promise(async (resolve, reject) => {
      try {
        if (web3 && web3.currentProvider && web3.currentProvider.close) {
          await web3.currentProvider.close();
        }
        await web3Modal.clearCachedProvider();
        dispatch({ type: HOME_DISCONNECT_WALLET_SUCCESS });
        resolve();
      } catch (error) {
        dispatch({ type: HOME_DISCONNECT_WALLET_FAILURE });
        reject(error);
      }
    });
    return promise;
  };
}