"use client"

import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import Link from 'next/link'

const Navbar = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  useEffect(() => {
    (async() => {
      const response = await getProviders();
      setProviders(response);
    })()
  }, [])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href={"/"} className='flex gap-2 flex-center'>
        <Image src={"/assets/images/Logo.svg"} alt='Promptopia Logo' width={30} height={30} className='object-contain' />
        <p className="logo_text">
          Promptopia
        </p>
      </Link>

      <div className="sm:flex hidden">
        {
          session?.user ? (
            <div className="flex gap-3 md:gap-5">
              <Link href={'/create-prompt'} className='black_btn'>
                Criar Publicação
              </Link>

              <button type='button' className='outline_btn' onClick={signOut}>
                Sair
              </button>

              <Link href={'/profile'}>
                <Image src={session.user.image} width={37} height={37} className='rounded-full' />
              </Link>
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button key={provider.name} type='button' className='black_btn' onClick={() => signIn(provider.id)}>
                    Entrar
                  </button>
                ))}
            </>
          )
        }
      </div>

      <div className="sm:hidden flex relative">
        {
          session?.user ? (
            <div className="flex">
              <Image onClick={() => setToggleDropDown(prev => !prev)} src={session.user.image} alt='Profile' width={37} height={37} className='rounded-full' />
              {toggleDropDown && (
                <div className="dropdown">
                  <Link href={'/profile'} className='dropdown_link' onClick={() => setToggleDropDown(false)}>
                    Meu Perfil
                  </Link>
                  <Link href={'/create-prompt'} className='dropdown_link' onClick={() => setToggleDropDown(false)}>
                    Criar Publicação
                  </Link>
                  <button type='button' className='mt-5 w-full black_btn' onClick={() => (setToggleDropDown(false), signOut())}>
                    Sair
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {providers && Object.values(providers).map((provider) => (
                <button key={provider.name} type='button' className='black_btn' onClick={() => signIn(provider.id)}>
                  Entrar
                </button>
              ))}
            </>
          )
        }
      </div>
    </nav>
  )
}

export default Navbar