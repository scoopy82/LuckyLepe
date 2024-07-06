const url = `https://mainnet.helius-rpc.com/?api-key=27eba405-f9dd-4912-9e0d-9cb086bb6422`;
const fs = require("fs");
const fetch = require('node-fetch');

const findHolders = async () => {
  let page = 1;
  let allOwners = new Set();

  while (true) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "getTokenAccounts",
        id: "helius-test",
        params: {
          page: page,
          limit: 1000,
          displayOptions: {},
          mint: "AUdcFeGwANaTUgWaVqqZVhKf14TsgYg1ozPL9BQgr4dx",
        },
      }),
    });
    const data = await response.json();

    if (!data.result || data.result.token_accounts.length === 0) {
      console.log(`No more results. Total pages: ${page - 1}`);

      break;
    }
    console.log(`Processing results from page ${page}`);
    data.result.token_accounts.forEach((account) =>
      allOwners.add(account.owner)
    );
    page++;
  }

  fs.writeFileSync(
    "output.json",
    JSON.stringify(Array.from(allOwners), null, 2)
  );
};

findHolders();
