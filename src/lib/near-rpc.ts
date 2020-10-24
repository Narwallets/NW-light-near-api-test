import {jsonRpc, jsonRpcQuery} from "./utils/json-rpc.js"
import {PublicKey} from "./utils/key-pair.js"
import {SignedTransaction} from "./transaction.js"

//---------------------------
//-- NEAR PROTOCOL RPC CALLS
//---------------------------


import * as naclUtil from "./tweetnacl/util.js"

//--helper fn
export function bufferToHex(buffer:any) {
    return [...new Uint8Array(buffer)]
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}
//--helper fn
export function arrayResultToYoctoString(result:Uint8Array) :string {
    return naclUtil.encodeUTF8(result).slice(1, -1)
}

export type StateResult = {
    amount: string; //"27101097909936818225912322116"
    block_hash: string; //"DoTW1Tpp3TpC9egBe1xFJbbEb6vYxbT33g9GHepiYL5a"
    block_height: number; //20046823
    code_hash: string; //"11111111111111111111111111111111"
    locked: string; //"0"
    storage_paid_at: number; //0
    storage_usage: number; // 2080
}

/* 
near.state example result
result: {
    amount: "27101097909936818225912322116"
    block_hash: "DoTW1Tpp3TpC9egBe1xFJbbEb6vYxbT33g9GHepiYL5a"
    block_height: 20046823
    code_hash: "11111111111111111111111111111111"
    locked: "0"
    storage_paid_at: 0
    storage_usage: 2080
    }
*/

export function queryAccount(accountId:string): Promise<StateResult> {
    return jsonRpcQuery("account/" + accountId,{}) as Promise<StateResult>
};

export function access_key(accountId:string, publicKey:PublicKey): Promise<any> {
    return jsonRpcQuery(`access_key/${accountId}/${publicKey.toString()}`) as Promise<any>
};

export function broadcast_tx_commit(signedTransaction:SignedTransaction): Promise<any> {
    const borshEcoded = signedTransaction.encode();
    const b64Encoded = Buffer.from(borshEcoded).toString('base64')
    return jsonRpc('broadcast_tx_commit',[b64Encoded]) as Promise<any>
};
 
/*export function call(contractId:string, method:string, params?:any) Promise<any> {
    return rpcQuery("call/" + contractId + "/" + method, params)
}
*/

