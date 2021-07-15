import React from 'react'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons.js'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
import { createClient } from 'pexels';

// All requests made with the client will be authenticated
const client = createClient('563492ad6f917000010000015e628e3f2da44dd486a70e66ec5d32c1');





function ProfileSideBar(propriedade){
  return(
    <Box as='aside'>
      <img src={`https://github.com/${propriedade.githubUser}.png`} style={{borderRadius: "8px"}}/>
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${propriedade.githubUser}`}>
          @{propriedade.githubUser}
        </a>
      </p>
      
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {
  const usuarioAleatorio = 'jady-sm-godoi'
  const [comunidades, setComunidades] = React.useState([{
    id: '128017239074291803724903741237473874347',
    title: 'Eu odeio acordar cedo.',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }])
  const pessoasFavoritas = [
    'cesargodoi',
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
  ]

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{gridArea: "profileArea"}}>
          <ProfileSideBar githubUser={usuarioAleatorio}/>
        </div>
        <div className="welcomeArea" style={{gridArea: "welcomeArea"}}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>

            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e){
              e.preventDefault();

              const dadosDoForm = new FormData(e.target)
              
              const comunidade = {
                id: new Date().toISOString(),
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image'),
              }
              
              const comunidadesAtualizadas = [...comunidades, comunidade]
              setComunidades(comunidadesAtualizadas)

            }}>
              <div>
                <input 
                placeholder="Qual vai ser o nome da sua comunidade?"
                name="title"
                aria-label="Qual vai ser o nome da sua comunidade?"
                type="text"
              />
              </div>
              <div>
                <input 
                placeholder="Coloque uma url para usarmos de capa."
                name="image"
                aria-label="Coloque uma url para usarmos de capa."
              />          
              </div>
              <button>
                Criar comunidade
              </button>
              
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{gridArea: "profileRelationsArea"}}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Favoritos({pessoasFavoritas.length})</h2>
            <ul>
              {pessoasFavoritas.map((itemAtual)=>{
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`} >
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">Comunidades({comunidades.length})</h2>
          <ul>
              {comunidades.map((itemAtual)=>{
                return (
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual.title}`} >
                      <img src={itemAtual.image} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
