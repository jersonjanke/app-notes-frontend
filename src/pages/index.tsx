import type { NextPage } from 'next'
import { useCallback, useEffect } from 'react'
import HelloService from 'services/HelloService'

const Home: NextPage = () => {
  const fetch = useCallback(async () => {
    const { data } = await HelloService.getHello()
    console.log(data)
  }, [])

  useEffect(() => {
    fetch()
  }, [fetch])

  return <div>app-notes-frontend</div>
}

export default Home
