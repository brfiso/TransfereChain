// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "./RealTokenizado.sol";

error ApenasAdmin();
error ApenasParlamentar();
error ApenasBeneficiarioAtivo();
error TransferenciaJaExecutada();
error TransferenciaCancelada();
error TempoDeCarencia();

contract TransfereChain {
    RealTokenizado private realTokenizado;
    address admin;

    modifier apenasAdmin {
        if(admin != msg.sender) revert ApenasAdmin();
        _;
    }

    constructor(RealTokenizado _realTokenizado) {
        admin = msg.sender;
        realTokenizado = _realTokenizado;
    }

    enum EstadoDaTransferencia {
        PRIMEIRAPARCELA,
        SEGUNDAPARCELA,
        EXECUTADA,
        CANCELADA
    }
    
    struct Parlamentar {
        uint id;
        address carteira;
        string nome;
        bool registroAtivo;
    }

    struct Beneficiario {
        uint id;
        address carteira;
        string nome;
        string municipio;
        uint32 banco;
        uint32 agencia;
        uint32 conta;
        bool registroAtivo;
    }

    struct PedidoDeTransferencia {
        uint id;
        uint64 valor;
        uint momentoDoPedido;
        string detalhesDoPedido; 
        Beneficiario beneficiario;
        EstadoDaTransferencia estado;
    }

    mapping(address  => Parlamentar) parlamentar;
    mapping(address => Beneficiario) beneficiario;
    mapping(uint id => PedidoDeTransferencia) pedidoDeTransferencia;


    function RegistraParlamentar(uint id, address carteira, string memory nome) apenasAdmin external {
        parlamentar[carteira] = Parlamentar({
            id: id,
            carteira: carteira,
            nome: nome,
            registroAtivo: true
        });
    }

    function RegistraBeneficiario(uint id, address carteira, string memory nome, string memory municipio, uint32 banco, uint32 agencia, uint32 conta) apenasAdmin external {
        beneficiario[carteira] = Beneficiario({
            id: id,
            carteira: carteira,
            nome: nome,
            municipio: municipio,
            banco: banco,
            agencia: agencia,
            conta: conta,
            registroAtivo: true
        });
    }
    // Função executada pelo deputado
    function AprovaTransferencia(uint autorizacao, uint64 valor, string memory detalhesDoPedido, address carteiraDoBeneficiario) external {
        if (!parlamentar[msg.sender].registroAtivo || parlamentar[msg.sender].carteira != msg.sender) revert ApenasParlamentar(); 
        pedidoDeTransferencia[autorizacao] = PedidoDeTransferencia({
            id: autorizacao,
            valor: valor,
            momentoDoPedido: block.timestamp,
            detalhesDoPedido: detalhesDoPedido,
            beneficiario: beneficiario[carteiraDoBeneficiario],
            estado: EstadoDaTransferencia.PRIMEIRAPARCELA
        });
    }

    // Função executada pelo Recebedor
    // Falta verificar se registro está ativo
    function ExecutaTransferencia(uint autorizacao) external {
        PedidoDeTransferencia storage pedido = pedidoDeTransferencia[autorizacao];
        if (beneficiario[msg.sender].carteira != msg.sender) revert ApenasBeneficiarioAtivo(); 
        if (pedido.estado == EstadoDaTransferencia.CANCELADA) revert TransferenciaCancelada();
        if (pedido.estado == EstadoDaTransferencia.EXECUTADA) revert TransferenciaJaExecutada();
        if (pedido.estado == EstadoDaTransferencia.SEGUNDAPARCELA && pedido.momentoDoPedido + 30 days > block.timestamp) revert TempoDeCarencia();
        if (pedido.estado == EstadoDaTransferencia.SEGUNDAPARCELA) pedido.estado = EstadoDaTransferencia.EXECUTADA;
        else pedido.estado == EstadoDaTransferencia.SEGUNDAPARCELA;
        realTokenizado.mint(msg.sender, pedido.valor / 2);
    }

    function DetalhesBeneficiario(address carteira) external view returns (Beneficiario memory) {
        return beneficiario[carteira];
    }

    function DetalhesParlamentar(address carteira) external view returns (Parlamentar memory) {
        return parlamentar[carteira];
    }

    function DetalhesTransferencia(uint id) external view returns (PedidoDeTransferencia memory) {
        return pedidoDeTransferencia[id];
    }

}