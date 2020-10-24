import { createRequire } from 'module';
const require = createRequire(import.meta.url);

if (!globalThis.fetch) {
  const fetch = require('node-fetch');
  globalThis.fetch = fetch;
}

import * as naclUtil from "../tweetnacl/util.js";

export function bufferToHex(buffer:any) {
    return [...new Uint8Array(buffer)]
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

export function arrayResultToYoctoString(result:Uint8Array) :string {
    return naclUtil.encodeUTF8(result).slice(1, -1)
}

let rpcUrl:string="https://rpc.testnet.near.org/"
export function setRpcUrl(newUrl:string){
    rpcUrl=newUrl;
}

let id = 0
export async function jsonRpcInternal(payload:Record<string,any>) :Promise<any> {

    //try {

    const rpcOptions = {
        body: JSON.stringify(payload),
        method: "POST",
        headers: { 'Content-type': 'application/json; charset=utf-8' }
    }

    const fetchResult = await fetch(rpcUrl, rpcOptions);
    const response = await fetchResult.json()

    if (!fetchResult.ok) throw new Error(rpcUrl + " " + fetchResult.status + " " + fetchResult.statusText)

    if (response.error) {
        const errorMessage = `[${response.error.code}] ${response.error.message}: ${response.error.data}`;
        // NOTE: All this hackery is happening because structured errors not implemented
        // TODO: Fix when https://github.com/nearprotocol/nearcore/issues/1839 gets resolved
        if (response.error.data === 'Timeout' || errorMessage.includes('Timeout error')) {
            const err=new Error('jsonRpc has timed out')
            err.name='TimeoutError'
            throw err;
        }
        else {
            throw new Error(errorMessage);
        }
    }
    return response.result;

    // if (!response.ok) {
    //     if (response.status === 503) {
    //         console.warn(`Retrying HTTP request for ${url} as it's not available now`);
    //         return null;
    //     }
    //     throw createError(response.status, await response.text());
    // }
    //     return response;
    // } catch (error) {
    //     if (error.toString().includes('FetchError')) {
    //         console.warn(`Retrying HTTP request for ${url} because of error: ${error}`);
    //         return null;
    //     }
    //     throw error;
    // }
}

/**
 * makes a jsonRpc call with {method}
 * @param method jsonRpc method to call
 * @param jsonRpcParams string[] with parameters
 */
export function jsonRpc(method:string, jsonRpcParams:string[]) :Promise<any> {
    const payload = {
        method: method,
        params: jsonRpcParams,
        id: ++id,
        jsonrpc: "2.0"
    }
    return jsonRpcInternal(payload);
}

/**
 * makes a jsonRpc "query" call
 * @param {string} queryWhat : account/xx | call/contract/method
 * @param {any} params : { amount:"2020202202212"}
 */
export async function jsonRpcQuery(queryWhat:string, params?:any) :Promise<any> {
    let queryParams = [queryWhat, params || ""] //params for the fn call - something - the jsonrpc call fail if there's a single item in the array
    return await jsonRpc("query", queryParams);
}
