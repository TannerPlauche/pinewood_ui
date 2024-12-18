import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import Bracket from './components/bracket/Bracket'

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState<any>(null)

  // const rounds: IRoundProps[] = [
  //   {
  //     title: 'Heat one',
  //     seeds: [
  //       {
  //         id: 1,
  //         date: new Date().toDateString(),
  //         teams: [{ name: 'Team A' }, { name: 'Team B' }, { name: 'Team E' }, { name: 'Team F' }],
  //       },
  //       {
  //         id: 2,
  //         date: new Date().toDateString(),
  //         teams: [{ name: 'Team C' }, { name: 'Team D' }],
  //       },
  //     ],
  //   },
  //   {
  //     title: 'Heat Two',
  //     seeds: [
  //       {
  //         id: 3,
  //         date: new Date().toDateString(),
  //         teams: [{ name: 'Team A' }, { name: 'Team C' }],
  //       },
  //     ],
  //   },
  // ];


  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('https://pinewood-server-ac7pxxf325r9.deno.dev');
      console.log(res.data);
    }

    fetchData()
  }, []);

  return (
    <>
      <div style={{ maxHeight: '100vh' }}>
        <Bracket />
      </div >
    </>
  )
}

export default App
