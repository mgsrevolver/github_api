import logo from './logo.svg'
import { useEffect, useState } from 'react'
import './App.css'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

function App() {
  const [avatarURL, setAvatarURL] = useState()
  const [githubUsername, setGitHubUsername] = useState()
  const [repoData, setRepoData] = useState()
  const APIkey = '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'
  const allModsURL =
    'https://api.github.com/repos/roll20/roll20-api-scripts/git/trees/master'

  async function repoDataURL() {
    //Get repo data about all mods in github
    await fetch(allModsURL, {
      method: 'GET',
      headers: {
        Authorization: APIkey,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(36, result.tree)
          const list = result.tree.map((item) => (
            <div className="text-center">
              <a target="_blank" href={item.url}>
                {item.path}
              </a>
            </div>
          ))
          setRepoData(list)
        },
        (error) => {
          console.log(error)
        }
      )
  }

  useEffect(() => {
    fetch('https://api.github.com/users/Roll20')
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result)
          setAvatarURL(result.avatar_url)
          setGitHubUsername(result.login)
        },
        (error) => {
          console.log(error)
        }
      )
  }, [])
  return (
    <div className="App w-100 min-vh-100 justify-content-center align-items-center d-flex flex-column">
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={avatarURL} />
        <Card.Body>
          <Card.Title>{githubUsername}</Card.Title>

          <Button variant="primary" onClick={repoDataURL}>
            Show me the mod library!
          </Button>
        </Card.Body>
      </Card>
      {repoData}
    </div>
  )
}

export default App
