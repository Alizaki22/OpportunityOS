import { 
  Connection, 
  PublicKey, 
  Transaction, 
  SystemProgram, 
  LAMPORTS_PER_SOL 
} from '@solana/web3.js';

/**
 * Sends a small amount of SOL on Devnet
 * @param connection Solana connection object
 * @param publicKey Sender's public key
 * @param sendTransaction Wallet adapter's sendTransaction function
 */
export async function sendTestTransaction(
  connection: Connection,
  publicKey: PublicKey,
  sendTransaction: (transaction: Transaction, connection: Connection) => Promise<string>
) {
  try {
    // Create a transaction to send 0.001 SOL back to the sender (as a test)
    // or to a known Devnet address. For a safe test, we'll send it to a random new account or a burner.
    // Actually, sending to itself is a common way to test signing.
    
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: publicKey, // Sending to yourself as a test
        lamports: 0.001 * LAMPORTS_PER_SOL,
      })
    );

    const {
      context: { slot: minContextSlot },
      value: { blockhash, lastValidBlockHeight }
    } = await connection.getLatestBlockhashAndContext();

    const signature = await sendTransaction(transaction, connection);

    await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature });

    return signature;
  } catch (error) {
    console.error('Transaction failed:', error);
    throw error;
  }
}

/**
 * Fetches the SOL balance for a given public key
 */
export async function getSolBalance(connection: Connection, publicKey: PublicKey) {
  try {
    const balance = await connection.getBalance(publicKey);
    return balance / LAMPORTS_PER_SOL;
  } catch (error) {
    console.error('Failed to fetch balance:', error);
    return 0;
  }
}
