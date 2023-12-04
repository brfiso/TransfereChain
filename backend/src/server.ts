import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import decode from 'jwt-decode'
import { generateJwtAndRefreshToken } from './auth';
import { auth } from './config';
import { PrismaClient } from '@prisma/client'
import { checkRefreshTokenIsValid, users, invalidateRefreshToken } from './database';
import { CreateSessionDTO, DecodedToken } from './types';

const app = express();
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(cors())

const prisma = new PrismaClient()

async function getUserByCpf(cpf: string){
  const users = await prisma.user.findMany()
  const user = users.filter(x => x.cpf === cpf)[0]
  
  return user
}

async function getUserByAddress(address: string){
  const users = await prisma.user.findMany()
  const user = users.filter(x => x.wallet === address)[0]

  return user
}

function checkAuthMiddleware(request: Request, response: Response, next: NextFunction) {
  const { authorization } = request.headers;

  if (!authorization) {
    return response
      .status(401)
      .json({ error: true, code: 'token.invalid', message: 'Token not present.' })
  }

  const [, token] = authorization?.split(' ');

  if (!token) {
    return response 
      .status(401)
      .json({ error: true, code: 'token.invalid', message: 'Token not present.' })
  }

  try {
    const decoded = jwt.verify(token as string, auth.secret) as DecodedToken;

    request.user = decoded.sub;

    return next();
  } catch (err) {

    return response 
      .status(401)
      .json({  error: true, code: 'token.expired', message: 'Token invalid.' })
  }
}

function addUserInformationToRequest(request: Request, response: Response, next: NextFunction) {
  const { authorization } = request.headers;

  if (!authorization) {
    return response
      .status(401)
      .json({ error: true, code: 'token.invalid', message: 'Token not present.' })
  }

  const [, token] = authorization?.split(' ');

  if (!token) {
    return response 
      .status(401)
      .json({ error: true, code: 'token.invalid', message: 'Token not present.' })
  }

  try {
    const decoded = decode(token as string) as DecodedToken;

    request.user = decoded.sub;

    return next();
  } catch (err) {
    return response 
      .status(401)
      .json({ error: true, code: 'token.invalid', message: 'Invalid token format.' })
  }
}

app.post('/registerUser', async (request, response) => {
  try {
    const { nome, cpf, cnpj, role, wallet, password } = request.body;
    const walletExists = await getUserByAddress(wallet);
    const cpfExists = await getUserByCpf(cpf);

    if(walletExists){
      return response.status(500).json({
        error: true,
        message: "A carteira já existe"
      });
    }

    if(cpfExists){
      return response.status(500).json({
        error: true,
        message: "O CPF já está registrado"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        nome,
        cpf,
        cnpj,
        role,
        wallet,
        password: hashedPassword, 
      },
    });

    return response.status(201).json({ success: true, message: 'User created successfully.' });
  } catch (error) {
    console.error('Error in /register endpoint:', error);
    return response.status(500).json({
      error: true,
      message: 'Internal Server Error.'
    });
  }
});

app.post('/Sessions', async (request, response) => {
  try{
    const { cpf, password } = request.body as CreateSessionDTO;

    const user = await getUserByCpf(cpf);

    const passwordMatch = await bcrypt.compare(password, user.password);
  
    if (!user || !passwordMatch) {
      return response.status(401).json({ 
          error: true, 
          message: 'CPF ou senha incorretos.'
        });
    }
  
    const { token, refreshToken } = generateJwtAndRefreshToken(cpf, {
      role: user.role,
      nome: user.nome,
      cnpj: user.cnpj,
      wallet: user.wallet
    })
  
    return response.json({
      token,
      refreshToken,
      role: user.role,
      nome: user.nome,
      wallet: user.wallet,
      cnpj: user.cnpj
    });
  } catch(error){
    return response.status(500).json({
      error: true,
      message: 'CPF ou senha incorretos.'
    });
  }
});

app.get('/users', checkAuthMiddleware, async (request, response) => {
  try{
    const users = await prisma.user.findMany()

    if (!users) {
      return response
        .status(401)
        .json({ 
          error: true, 
          message: 'A consulta deu errado!'
        });
    }
  
    return response.json(users);
  }catch(err){
    console.log(err)
  }
});

app.post('/deleteUser/:userId', checkAuthMiddleware, async (request, response) => {
  try {
    const userId = request.params.userId;

    const deleteUser = await prisma.user.delete({
      where: {
        cpf: userId,
      },
    });

    if (!deleteUser) {
      return response.status(404).json({
        error: true,
        message: 'Usuário não encontrado para exclusão.',
      });
    }

    return response.json({
      success: true,
      message: 'Usuário excluído com sucesso.',
    });
  } catch (err) {
    console.error(err);
    return response.status(500).json({
      error: true,
      message: 'Erro interno do servidor.',
    });
  }
});


app.post('/refresh', addUserInformationToRequest, (request, response) => {
  const cpf = request.user;
  const { refreshToken } = request.body;

  const user = users.get(cpf);

  if (!user) {
    return response
      .status(401)
      .json({ 
        error: true, 
        message: 'User not found.'
      });
  }

  if (!refreshToken) {
    return response
      .status(401)
      .json({ error: true, message: 'Refresh token is required.' });
  }

  const isValidRefreshToken = checkRefreshTokenIsValid(cpf, refreshToken)

  if (!isValidRefreshToken) {
    return response
      .status(401)
      .json({ error: true, message: 'Refresh token is invalid.' });
  }

  invalidateRefreshToken(cpf, refreshToken)

  const { token, refreshToken: newRefreshToken } = generateJwtAndRefreshToken(cpf, {
    role: user.role,
    cpf: user.nome,
    nome: user.nome,
    wallet: user.wallet,
    cnpj: user.cnpj
  })

  return response.json({
    token,
    refreshToken: newRefreshToken,
    role: user.role,
    nome: user.nome,
    wallet: user.wallet,
    cpnj: user.cnpj
  });
});

app.get('/me', checkAuthMiddleware, async (request, response) => {
  const cpf = request.user;

  const user = await getUserByCpf(cpf);

  if (!user) {
    return response
      .status(400)
      .json({ error: true, message: 'User not found.' });
  }

  return response.json({
    cpf,
    nome : user.nome,
    role: user.role,
    wallet: user.wallet,
    cnpj: user.cnpj
  })
});

app.listen(3333);