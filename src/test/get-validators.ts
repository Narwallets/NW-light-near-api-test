import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const sha256 = require('js-sha256');

// near-api-js
import * as nearAPI from 'near-api-js';
import { getConfig } from './config.js'

// NW-near-api-lite
import { KeyPairEd25519 } from "../lib/utils/key-pair.js"
import * as TX from "../lib/transaction.js"
import * as near from "../lib/near-rpc.js"
import { serialize, base_decode } from "../lib/utils/serialize.js"
import BN from 'bn.js';

//import * as KP from "./keypair.js"
//nearAPI.utils.key_pair = undefined;

//this is required if using a local .env file for private key
//require('dotenv').config();
const util = require('util');

/**
 * convert nears expressed as a js-number with MAX 6 decimals into a yoctos-string
 * @param n amount in near MAX 4 DECIMALS
 */
export function ntoy(n: number) {
  let millionsText = Math.round(n * 1e4).toString() // near * 1e4 - round
  let yoctosText = millionsText + "0".repeat(20) //  mul by 1e20 => yoctos = near * 1e(4+20)
  return yoctosText
}

/**
 * returns amount truncated to 4 decimal places
 * @param yoctos amount expressed in yoctos
 */
export function yton(yoctos: string) {
  if (yoctos.indexOf(".") !== -1) throw new Error("a yocto string can't have a decimal point: " + yoctos)
  let padded = yoctos.padStart(25, "0") //at least 0.xxx
  let nearsText = padded.slice(0, -24) + "." + padded.slice(-24, -20) //add decimal point. Equivalent to near=yoctos/1e24 and truncate to 4 dec places
  return Number(nearsText)
}

// configure accounts, network, and amount of NEAR to send
const sender = 'lucio.testnet';
const receiver = 'luciotato2.testnet';
const config = getConfig('testnet');
const amountY = ntoy(0.25);

// sets up NEAR connection based on networkId
const provider = new nearAPI.providers.JsonRpcProvider(config.nodeUrl);

// creates keyPair used to sign transaction
const privateKey = "5dXosrrX9edUVWCuRZ2gmYqrFhrssqjmE5RWTVszEPceTdaX9pfHJMJNnbSTRFt3E5qd2NX1fmFZAW4N1TZxRoet";
const keyPair = nearAPI.utils.KeyPairEd25519.fromString(privateKey);

async function main() {

  const config = getConfig('mainnet');
  const provider = new nearAPI.providers.JsonRpcProvider(config.nodeUrl);

  let validators = await provider.validators(null)
  console.log(util.inspect(validators))
  console.log(validators.current_proposals.length)

};

// run the function
main();
