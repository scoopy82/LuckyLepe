const fetch = require('node-fetch');

const allAccounts = await connection.getProgramAccounts('AUvefEAqndQ5VsEaCpy1gWsi9FnbGxHxuwT5skB1MLm8', {
        commitment: 'confirmed',
        filters: [
            {
                memcmp: {
                    offset: 0,
                    bytes: mint.toString(),
                },
            },
        ],
    });
    const accountsToWithdrawFrom = [];
    for (const accountInfo of allAccounts) {
        const account = unpackAccount(accountInfo.account, accountInfo.pubkey, 'AUvefEAqndQ5VsEaCpy1gWsi9FnbGxHxuwT5skB1MLm8');
        const transferFeeAmount = getTransferFeeAmount(account);
        if (transferFeeAmount !== null && transferFeeAmount.withheldAmount > BigInt(0)) {
            accountsToWithdrawFrom.push(accountInfo.pubkey);
        }
    }

getProgramAccounts();


     await withdrawWithheldTokensFromAccounts(
         connection,
         payer,
         mint,
         destinationAccount,
         withdrawWithheldAuthority,
         [],
         [destinationAccount],
         undefined,
         'A7PcG9wNYYtAyRrgDcjZvAFEEyheFafxXKTwrPLT8ezk'
     );

