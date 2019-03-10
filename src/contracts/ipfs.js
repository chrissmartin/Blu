//imports the IPFS API
import IPFS from 'ipfs-http-client';

/**
 * creates & exports new instance for 
 * IPFS using infura as host, for use.
 */
const ipfs = new IPFS({ host: 'cloudflare-ipfs.com', port: 5001, protocol: 'https' });
export default ipfs;
