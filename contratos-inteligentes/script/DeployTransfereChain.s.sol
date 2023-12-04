// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13 .0;

import {Script, console} from 'forge-std/Script.sol';
import {TransfereChain} from '../src/TransfereChain.sol';
import {RealTokenizado} from '../src/RealTokenizado.sol';
import {RealDigital} from '../src/RealDigital.sol';

contract DeployTransfereChain is Script {
    function run() external returns (TransfereChain) {
        RealDigital realDigital = RealDigital(0x740bc1AFEfc3EF4BBA06aCA16901565af4d9Fa83);
        RealTokenizado contaDoTesouro = RealTokenizado(0x1AaDB34eE8fD0383A091EbeB0802e3c3d638C26d);
        RealTokenizado bancoRecebedor = RealTokenizado(0x65A711ae4B00b49A25528FE4883054080BC80F6D);
        address contaDoRecebedor = 0x45f2cB0F09AB00A4c62e7EC38487c464Ea59833E;
        address carteiraDoParlamentar = 0xA104505CCeddC6aBD75d713A6af5a868CF82337f;
        bytes32 MINTER_ROLE = 0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6;
        bytes32 MOVER_ROLE = 0xe5ed70e23144309ce456cb48bf5e6d0d8e160f094a6d65ecf1d5b03cf292d8e6;
        
        uint256 deployerPrivateKey = vm.envUint('PRIVATE_KEY');
        vm.startBroadcast(deployerPrivateKey);
        TransfereChain transfereChain = new TransfereChain(contaDoTesouro, realDigital, msg.sender);
        vm.stopBroadcast();
        uint256 authorityKey = vm.envUint('AUTHORITY_KEY');
        vm.startBroadcast(authorityKey);
        realDigital.enableAccount(address(transfereChain));
        bancoRecebedor.enableAccount(address(transfereChain));
        bancoRecebedor.enableAccount(contaDoRecebedor);
        vm.stopBroadcast();
        uint256 adminKey = vm.envUint('ADMIN_KEY');
        vm.startBroadcast(adminKey);
        bancoRecebedor.grantRole(MINTER_ROLE, address(transfereChain));
        realDigital.grantRole(MOVER_ROLE, address(transfereChain));
        vm.stopBroadcast();
        vm.startBroadcast(deployerPrivateKey);
        transfereChain.registraBeneficiario(123, contaDoRecebedor, 'Marcelo', 'Pocos de Caldas');
        transfereChain.registraParlamentar(21, carteiraDoParlamentar, 'Tiririca');
        vm.stopBroadcast();
        vm.startBroadcast(adminKey);
        transfereChain.aprovaTransferencia(1, 1000, address(bancoRecebedor), contaDoRecebedor, 30);
        vm.stopBroadcast();
        uint256 cityKey = vm.envUint('CITY_KEY');
        vm.startBroadcast(cityKey);
        transfereChain.executaTransferencia(1);
        vm.stopBroadcast();

        return transfereChain;
    }
}