import fetch from "node-fetch";

const ETHER_TOKEN = process.env.ETHER_TOKEN;

export const fetchEth = async () => {
  try {
    const response = await fetch(
      `https://api.etherscan.io/v2/api?chainid=1&module=account&action=tokenbalance&contractaddress=0x57d90b64a1a57749b0f932f1a3395792e12e7055&address=0xe04f27eb70e025b78871a2ad7eabe85e61212761&tag=latest&apikey=${ETHER_TOKEN}`
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Failed to fetch Ethereum data:", error.message);
    throw error;
  }
};
