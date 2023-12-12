import React from 'react';
import PinataSDK from '@pinata/sdk'
const JWT = import.meta.env.VITE_PINATA_API_KEY
const pinata = new PinataSDK({ pinataJWTKey: JWT })

interface Upload {
  cpf: string;
  nome: string;
  role: string;
  wallet: string;
  cnpj?: string; // Adicione a interrogação se a propriedade for opcional
}

export const UploadTransaction: React.FC<Upload> = ({ cpf, nome, role, wallet, cnpj }) => {
  const uploadData = async () => {
    try {
      const body = {
        cpf,
        nome,
        role,
        wallet,
        cnpj
      };

      const options = {
        pinataMetadata: {
          name: cpf,
          keyvalues: {
            wallet,
            role
          }
        },
        pinataOptions: {
          cidVersion: 0
        }
      };

      const res = await pinata.pinJSONToIPFS(body, options);
      console.log(res);
      return res.IpfsHash;
    } catch (error) {
      console.error('Error uploading JSON data:', error);
    }
  };

  return (
    <div>
      <button onClick={uploadData}>Upload to IPFS</button>
    </div>
  );
};

export const RetrieveWallet = async ( cpf:string ) => {
        try {
            const metadataFilter = {
                name: cpf,
            }
      
            const filters = {
                status: 'pinned',
        pageLimit: 1000,
        //   pageOffset: 0,
        metadata: metadataFilter
    }
    const list = await pinata.pinList(filters)
      console.log(list)
      const walletAndRole = list.rows.map((value) => {
        // console.log(value.metadata.keyvalues.wallet)
        return value.metadata.keyvalues
      })
      return walletAndRole
      
    } catch (error) {
        console.error('Error retrieving JSON data:', error)
    }
}