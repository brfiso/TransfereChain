// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13 .0;

import {Script, console} from 'forge-std/Script.sol';
import {TransfereChain} from '../src/TransfereChain.sol';
import {RealTokenizado} from '../src/RealTokenizado.sol';

contract DeployTransfereChain is Script {
    function run() external returns (TransfereChain) {
        uint256 deployerPrivateKey = vm.envUint('PRIVATE_KEY');
        vm.startBroadcast(deployerPrivateKey);
        TransfereChain transfereChain = new TransfereChain(RealTokenizado(0x1AaDB34eE8fD0383A091EbeB0802e3c3d638C26d));
      
        vm.stopBroadcast();
        return transfereChain;
    }
}