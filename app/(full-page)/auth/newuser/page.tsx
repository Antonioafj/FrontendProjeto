/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useMemo, useRef, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { error } from 'console';
import { LoginService } from '@/service/LoginService';
import { Toast } from 'primereact/toast';

const NewUserPage = () => {

    let usuarioVazio: Projeto.Usuario = {
        id: 0,
        nome: '',
        login: '',
        senha: '',
        email: ''
    };


    const [usuario, setUsuario] =  useState<Projeto.Usuario>(usuarioVazio);
    const loginService = useMemo(() => new LoginService(), []);
    const toast = useRef<Toast>(null);

    const { layoutConfig } = useContext(LayoutContext);

    const router = useRouter();
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });
    
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _usuario = { ...usuario };
        _usuario[`${name}`] = val;

         setUsuario(_usuario);
     };

     const novoUsuario = () => {
        loginService.novoCadastro(usuario).then((response) => {
            setUsuario(usuarioVazio);
                    toast.current?.show({
                        severity: 'info',
                        summary: 'Sucesso!',
                        detail: 'Usuário cadastrado com sucesso!'
                    });
        }).catch((error) => {
            console.log(error.data.message);
                    toast.current?.show({
                        severity:'error',
                        summary: 'error',
                        detail: 'Erro ao salvar!' + error.data.message
            })
        })
     }

    return (
        <div className={containerClassName}>
            <Toast ref = {toast} />
            <div className="flex flex-column align-items-center justify-content-center">
                <img src={`/layout/images/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`} alt="Sakai logo" className="mb-5 w-6rem flex-shrink-0" />
                <div
                    style={{
                        borderRadius: '56px',
                        padding: '0.3rem',
                        background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
                    }}
                >
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            <div className="text-900 text-3xl font-medium mb-3">Sou novo por aqui!</div>
                        </div>

                        <div>
                            <label htmlFor="nome" className="block text-900 text-xl font-medium mb-2">
                                Nome
                            </label>
                            <InputText id="nome" type="text" placeholder="Digite seu nome" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }}  
                            value={usuario.nome}
                            onChange={(e) => onInputChange(e, 'nome')}/>
                            
                            <label htmlFor="login" className="block text-900 text-xl font-medium mb-2">
                                Login
                            </label>
                            <InputText id="login" type="text" placeholder="Digite seu login" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} 
                            value={usuario.login}
                            onChange={(e) => onInputChange(e, 'login')}/>

                            <label htmlFor="senha" className="block text-900 font-medium text-xl mb-2">
                                Senha
                            </label>
                            <Password inputId="senha" placeholder="Digite sua senha" toggleMask className="w-full mb-5" inputClassName="w-full p-3 md:w-30rem" 
                            value={usuario.senha}
                            onChange={(e) => onInputChange(e, 'senha')}></Password>

                            <label htmlFor="email" className="block text-900 text-xl font-medium mb-2">
                                Email
                            </label>
                            <InputText id="login" type="text" placeholder="Digite seu email" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} 
                            value={usuario.email}
                            onChange={(e) => onInputChange(e, 'email')} />
                            
                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}  onClick={() => router.push('/auth/login')}>
                                    Já tenho cadastro!
                                </a>
                            </div>
                            <Button label="Sign In" className="Efetuar Cadastro" onClick={() => novoUsuario  ()}></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewUserPage;
