//Exportações básicas e essenciais para o funcionamento básico
export const abi: any = [
	{
		"inputs": [
			{
				"internalType": "contract RealTokenizado",
				"name": "_realTokenizado",
				"type": "address"
			},
			{
				"internalType": "contract RealDigital",
				"name": "_realDigital",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "ApenasAdmin",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ApenasBeneficiarioAtivo",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ApenasParlamentar",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "BeneficiarioJaCadastrado",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ParlamentarJaCadastrado",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "TempoDeCarencia",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "TransferenciaCancelada",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "TransferenciaJaExecutada",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "proposalId",
				"type": "uint256"
			}
		],
		"name": "ExpiredProposal",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "proposalId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "reason",
				"type": "string"
			}
		],
		"name": "SwapCancelled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "proposalId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "senderNumber",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "receiverNumber",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "author",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "SwapExecuted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "proposalId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "senderNumber",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "receiverNumber",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "author",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "SwapStarted",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "autorizacao",
				"type": "uint256"
			},
			{
				"internalType": "uint64",
				"name": "valor",
				"type": "uint64"
			},
			{
				"internalType": "address",
				"name": "tokenDoBanco",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "carteiraDoBeneficiario",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tempoDeCarencia",
				"type": "uint256"
			}
		],
		"name": "aprovaTransferencia",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "autorizacao",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "motivo",
				"type": "string"
			}
		],
		"name": "cancelaTransferencia",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "carteira",
				"type": "address"
			}
		],
		"name": "detalhesBeneficiario",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "carteira",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "nome",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "municipio",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "registroAtivo",
						"type": "bool"
					}
				],
				"internalType": "struct TransfereChain.Beneficiario",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "detalhesBeneficiarioPorId",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "carteira",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "nome",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "municipio",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "registroAtivo",
						"type": "bool"
					}
				],
				"internalType": "struct TransfereChain.Beneficiario",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "carteira",
				"type": "address"
			}
		],
		"name": "detalhesParlamentar",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "carteira",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "nome",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "registroAtivo",
						"type": "bool"
					}
				],
				"internalType": "struct TransfereChain.Parlamentar",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "detalhesParlamentarPorId",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "carteira",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "nome",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "registroAtivo",
						"type": "bool"
					}
				],
				"internalType": "struct TransfereChain.Parlamentar",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "detalhesTodasTransferencias",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint64",
						"name": "valor",
						"type": "uint64"
					},
					{
						"internalType": "uint256",
						"name": "momentoDoPedido",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "detalhesDoPedido",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "parlamentar",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "id",
								"type": "uint256"
							},
							{
								"internalType": "address",
								"name": "carteira",
								"type": "address"
							},
							{
								"internalType": "string",
								"name": "nome",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "municipio",
								"type": "string"
							},
							{
								"internalType": "bool",
								"name": "registroAtivo",
								"type": "bool"
							}
						],
						"internalType": "struct TransfereChain.Beneficiario",
						"name": "beneficiario",
						"type": "tuple"
					},
					{
						"internalType": "enum TransfereChain.EstadoDaTransferencia",
						"name": "estado",
						"type": "uint8"
					}
				],
				"internalType": "struct TransfereChain.PedidoDeTransferencia[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "detalhesTransferencia",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint64",
						"name": "valor",
						"type": "uint64"
					},
					{
						"internalType": "uint256",
						"name": "momentoDoPedido",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "detalhesDoPedido",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "parlamentar",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "id",
								"type": "uint256"
							},
							{
								"internalType": "address",
								"name": "carteira",
								"type": "address"
							},
							{
								"internalType": "string",
								"name": "nome",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "municipio",
								"type": "string"
							},
							{
								"internalType": "bool",
								"name": "registroAtivo",
								"type": "bool"
							}
						],
						"internalType": "struct TransfereChain.Beneficiario",
						"name": "beneficiario",
						"type": "tuple"
					},
					{
						"internalType": "enum TransfereChain.EstadoDaTransferencia",
						"name": "estado",
						"type": "uint8"
					}
				],
				"internalType": "struct TransfereChain.PedidoDeTransferencia",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "autorizacao",
				"type": "uint256"
			}
		],
		"name": "executaTransferencia",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "carteira",
				"type": "address"
			}
		],
		"name": "inativaBeneficiario",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "carteira",
				"type": "address"
			}
		],
		"name": "inativaParlamentar",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "carteira",
				"type": "address"
			}
		],
		"name": "mudaCarteiraBeneficiario",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "carteira",
				"type": "address"
			}
		],
		"name": "mudaCarteiraParlamentar",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "nome",
				"type": "string"
			}
		],
		"name": "mudaNomeBeneficiario",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "pedidoDeTransferencia",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint64",
				"name": "valor",
				"type": "uint64"
			},
			{
				"internalType": "uint256",
				"name": "momentoDoPedido",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "detalhesDoPedido",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "parlamentar",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "carteira",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "nome",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "municipio",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "registroAtivo",
						"type": "bool"
					}
				],
				"internalType": "struct TransfereChain.Beneficiario",
				"name": "beneficiario",
				"type": "tuple"
			},
			{
				"internalType": "enum TransfereChain.EstadoDaTransferencia",
				"name": "estado",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "periodoDeCarencia",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "autorizacao",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "ipfsHash",
				"type": "string"
			}
		],
		"name": "prestacaoDeContas",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "carteira",
				"type": "address"
			}
		],
		"name": "reativaBeneficiario",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "carteira",
				"type": "address"
			}
		],
		"name": "reativaParlamentar",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "carteira",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "nome",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "municipio",
				"type": "string"
			}
		],
		"name": "registraBeneficiario",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "carteira",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "nome",
				"type": "string"
			}
		],
		"name": "registraParlamentar",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "swapProposals",
		"outputs": [
			{
				"internalType": "contract RealTokenizado",
				"name": "tokenSender",
				"type": "address"
			},
			{
				"internalType": "contract RealTokenizado",
				"name": "tokenReceiver",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "author",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "enum SwapTwoSteps.SwapStatus",
				"name": "status",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

export const contractAddress:string = import.meta.env.VITE_CONTRACT_ADDRESS

// Parlamentar
export async function registraParlamentar(contract: any, id: number, address: string, nome: string){
    try{
        await contract.registraParlamentar(id, address, nome)   
    }catch(err:any){
        console.log(err)
    }
}

export async function inativaParlamentar(contract: any, address: string){
    try{
        await contract.inativaParlamentar(address)   
    }catch(err:any){
        console.log(err)
    }
}


// Beneficiario
export async function registraBeneficiario(contract: any, id: number, nome: string, municipio: string, address: string){
    try{
        await contract.registraBeneficiario(id, address, nome, municipio)   
    }catch(err:any){
        console.log(err)
    }
}

export async function inativaBeneficiario(contract: any, address: string){
    try{
        await contract.inativaBeneficiario(address)   
    }catch(err:any){
        console.log(err)
    }
}


export async function aprovaTransferencia(contract: any, id: number, value: number, tokenDoBanco: string, carteiraDoBeneficiario: string, tempoDeCarencia: number){
    try{
        await contract.aprovaTransferencia(id, value, tokenDoBanco, carteiraDoBeneficiario, tempoDeCarencia)   
    }catch(err:any){
        console.log(err)
    }
}

export async function prestacaoDeContas(contract: any, id: number, hash: string){
    try{
        await contract.prestacaoDeContas(id, hash)   
    }catch(err:any){
        console.log(err)
    }
}

export async function executaTransferencia(contract: any, id: number){
    try{
        await contract.executaTransferencia(id)   
    }catch(err:any){
        console.log(err)
    }
}