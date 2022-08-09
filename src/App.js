import { useEffect, useState } from 'react'
import './App.css'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

function App() {
  const [repoData, setRepoData] = useState()
  const APIkey = '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'
  const allModsURL =
    'https://api.github.com/repos/roll20/roll20-api-scripts/git/trees/master'

  async function repoDataURL() {
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
            <tr>
              <td>
                <a target="_blank" href={item.url}>
                  {item.path}
                </a>
              </td>
              <td>{item.sha}</td>
            </tr>
          ))
          setRepoData(list)
        },
        (error) => {
          console.log(error)
        }
      )
  }

  return (
    <div className="App w-100 min-vh-100 justify-content-center align-items-center d-flex flex-column">
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Button variant="primary" onClick={repoDataURL}>
            Show me the mod library!
          </Button>
        </Card.Body>
      </Card>
      <table>
        <thread>
          <tr>
            <th>Mod Name</th>
            <th>sha</th>
          </tr>
        </thread>
        <tbody>{repoData}</tbody>
      </table>
    </div>
  )
}

export default App
