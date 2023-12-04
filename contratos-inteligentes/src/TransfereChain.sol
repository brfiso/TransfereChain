// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "./RealTokenizado.sol";
import "./SwapTwoSteps.sol";

error ApenasAdmin();
error ApenasParlamentar();
error ApenasBeneficiarioAtivo();
error TransferenciaJaExecutada();
error TransferenciaCancelada();
error TempoDeCarencia();
error BeneficiarioJaCadastrado();
error ParlamentarJaCadastrado();

contract TransfereChain is SwapTwoSteps {
    RealTokenizado private realTokenizado;
    PedidoDeTransferencia[] private todosPedidosDeTransferencia;

    address admin;

    modifier apenasAdmin {
        if(admin != msg.sender) revert ApenasAdmin();
        _;
    }

    modifier apenasBeneficiario {
        if (!beneficiario[msg.sender].registroAtivo 
        || beneficiario[msg.sender].carteira != msg.sender) 
        revert ApenasBeneficiarioAtivo(); 
        _;
    }

    modifier apenasParlamentar {
        if (!parlamentar[msg.sender].registroAtivo 
        || parlamentar[msg.sender].carteira != msg.sender) 
        revert ApenasParlamentar();
        _;
    }

    constructor(RealTokenizado _realTokenizado, RealDigital _realDigital, address _admin) SwapTwoSteps(_realDigital) {
        admin = _admin;
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
        bool registroAtivo;
    }

    struct PedidoDeTransferencia {
        uint id;
        uint64 valor;
        uint momentoDoPedido;
        string detalhesDoPedido;
        uint parlamentar; 
        Beneficiario beneficiario;
        EstadoDaTransferencia estado;
    }

    mapping(address  => Parlamentar) parlamentar;
    mapping(uint  => Parlamentar) parlamentarPorId;
    mapping(address => Beneficiario) beneficiario;
    mapping(uint  => Beneficiario) beneficiarioPorId;
    mapping(uint => uint) public periodoDeCarencia; // Período em dias entre o pedido e o saque da 2ª parcela
    mapping(uint id => PedidoDeTransferencia) public pedidoDeTransferencia;

    function atualizaAdmin(address novoAdmin) apenasAdmin external {
        admin = novoAdmin;
    }
    function registraParlamentar(uint id, address carteira, string memory nome) apenasAdmin external {
        if (parlamentarPorId[id].id == id 
        || parlamentar[carteira].carteira == carteira) 
        revert ParlamentarJaCadastrado();
        parlamentar[carteira] = Parlamentar({
            id: id,
            carteira: carteira,
            nome: nome,
            registroAtivo: true
        });
        parlamentarPorId[id] = parlamentar[carteira];
    }

    function inativaParlamentar(address carteira) apenasAdmin external {
        if (parlamentar[carteira].carteira == carteira)
        parlamentar[carteira].registroAtivo = false;
        parlamentarPorId[parlamentar[carteira].id].registroAtivo = false;
    }

    function reativaParlamentar(address carteira) apenasAdmin external {
        if (parlamentar[carteira].carteira == carteira)
        parlamentar[carteira].registroAtivo = true;
        parlamentarPorId[parlamentar[carteira].id].registroAtivo = true;
    }

    function mudaCarteiraParlamentar(address carteira) apenasParlamentar external {
        parlamentar[carteira] = parlamentar[msg.sender];
        delete parlamentar[msg.sender];
        parlamentar[carteira].carteira = carteira;
        parlamentarPorId[parlamentar[carteira].id].carteira = carteira;
    }

    function registraBeneficiario(
        uint id, 
        address carteira, 
        string memory nome, 
        string memory municipio) 
        apenasAdmin external {
        if (beneficiarioPorId[id].id == id 
        || beneficiario[carteira].carteira == carteira) 
        revert BeneficiarioJaCadastrado();
        beneficiario[carteira] = Beneficiario({
            id: id,
            carteira: carteira,
            nome: nome,
            municipio: municipio,
            registroAtivo: true
        });
        beneficiarioPorId[id] = beneficiario[carteira];
    }

    function inativaBeneficiario(address carteira) apenasAdmin external {
        if (beneficiario[carteira].carteira == carteira)
        beneficiario[carteira].registroAtivo = false;
        beneficiarioPorId[beneficiario[carteira].id].registroAtivo = false;
    }

    function reativaBeneficiario(address carteira) apenasAdmin external {
        if (beneficiario[carteira].carteira == carteira)
        beneficiario[carteira].registroAtivo = true;
        beneficiarioPorId[beneficiario[carteira].id].registroAtivo = true;
    }

    function mudaCarteiraBeneficiario(address carteira) apenasBeneficiario external {
        beneficiario[carteira] = beneficiario[msg.sender];
        delete beneficiario[msg.sender];
        beneficiario[carteira].carteira = carteira;
        beneficiarioPorId[beneficiario[carteira].id].carteira = carteira;
    }

    function mudaNomeBeneficiario(string memory nome) apenasBeneficiario external {
        beneficiario[msg.sender].nome = nome;
        beneficiarioPorId[beneficiario[msg.sender].id].nome = nome;
    }

    // Função executada pelo deputado
    function aprovaTransferencia(
        uint autorizacao, 
        uint64 valor, 
        address tokenDoBanco, 
        address carteiraDoBeneficiario,
        uint tempoDeCarencia
        ) 
        apenasParlamentar
        external {
        pedidoDeTransferencia[autorizacao] = PedidoDeTransferencia({
            id: proposalCounter + 1,
            valor: valor,
            momentoDoPedido: block.timestamp,
            detalhesDoPedido: "",
            parlamentar: parlamentar[msg.sender].id,
            beneficiario: beneficiario[carteiraDoBeneficiario],
            estado: EstadoDaTransferencia.PRIMEIRAPARCELA
        });
        todosPedidosDeTransferencia.push(pedidoDeTransferencia[autorizacao]);
        periodoDeCarencia[autorizacao] = tempoDeCarencia;
        startSwap(realTokenizado, RealTokenizado(tokenDoBanco), carteiraDoBeneficiario, valor/2);
        startSwap(realTokenizado, RealTokenizado(tokenDoBanco), carteiraDoBeneficiario, valor/2);
    }

    // Função executada pelo Recebedor
    function executaTransferencia(uint autorizacao) apenasBeneficiario external {
        PedidoDeTransferencia storage pedido = pedidoDeTransferencia[autorizacao];
        if (pedido.estado == EstadoDaTransferencia.CANCELADA) revert TransferenciaCancelada();
        if (pedido.estado == EstadoDaTransferencia.EXECUTADA) revert TransferenciaJaExecutada();
        if (pedido.estado == EstadoDaTransferencia.SEGUNDAPARCELA 
        && pedido.momentoDoPedido + periodoDeCarencia[autorizacao] * 1 days > block.timestamp) 
        revert TempoDeCarencia();
        if (pedido.estado == EstadoDaTransferencia.SEGUNDAPARCELA) {
            pedido.estado = EstadoDaTransferencia.EXECUTADA;
            executeSwap(pedido.id + 1);
        }
        if (pedido.estado == EstadoDaTransferencia.PRIMEIRAPARCELA) {
            pedido.estado = EstadoDaTransferencia.SEGUNDAPARCELA;
            executeSwap(pedido.id);
        }    
        todosPedidosDeTransferencia[pedido.id - 1].estado = pedido.estado;
    }

    // Só pode ser chamada pelo pagador ou pelo recebedor
    function cancelaTransferencia(uint autorizacao, string memory motivo) external {
        PedidoDeTransferencia storage pedido = pedidoDeTransferencia[autorizacao];
        if (pedido.estado == EstadoDaTransferencia.SEGUNDAPARCELA 
        || pedido.estado == EstadoDaTransferencia.PRIMEIRAPARCELA) {
            pedido.estado = EstadoDaTransferencia.CANCELADA;
            cancelSwap(pedido.id + 1, motivo);
        }  
        if (pedido.estado == EstadoDaTransferencia.PRIMEIRAPARCELA) {
            cancelSwap(pedido.id, motivo);
        }
    }

    function prestacaoDeContas(uint autorizacao, string memory ipfsHash) apenasBeneficiario external {
        pedidoDeTransferencia[autorizacao].detalhesDoPedido = ipfsHash;
    }

    function detalhesBeneficiario(address carteira) external view returns (Beneficiario memory) {
        return beneficiario[carteira];
    }

    function detalhesBeneficiarioPorId(uint id) external view returns (Beneficiario memory) {
        return beneficiarioPorId[id];
    }

    function detalhesParlamentar(address carteira) external view returns (Parlamentar memory) {
        return parlamentar[carteira];
    }

    function detalhesParlamentarPorId(uint id) external view returns (Parlamentar memory) {
        return parlamentarPorId[id];
    }

    function detalhesTransferencia(uint id) external view returns (PedidoDeTransferencia memory) {
        return pedidoDeTransferencia[id];
    }

    function detalhesTodasTransferencias() external view returns (PedidoDeTransferencia[] memory) {
        return todosPedidosDeTransferencia;
    }
}