import Image from 'next/image'

import NLWLogo from '@/assets/logo.svg'

export function Hero() {
  return (
    <div className="space-y-5">
      <Image alt="NLW Logo" src={NLWLogo} />
      <div className="max-w-[420px] space-y-4">
        <h1 className="text-5xl font-bold leading-tight text-gray-50">
          Sua cápsula do tempo
        </h1>
        <p className="text-lg leading-relaxed">
          Colecione momentos importantes de sua jornada e compartilhe (se
          quiser) com o mundo!
        </p>
      </div>
      <a
        className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
        href=""
      >
        Cadastrar lembrança
      </a>
    </div>
  )
}
