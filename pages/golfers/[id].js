import useGolfers from '../../lib/useGolfers.js'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout.js'
import ScoreCard from '../../components/ScoreCard.js'
import { useState, useEffect } from 'react'

const Golfer = () => {
  const router = useRouter()
  const { id } = router.query
  const { golfer, error } = useGolfers(id)
  const [ scores, setScores ] = useState([])
  const [ name, setName ] = useState('')

  useEffect(() => {
    if (golfer) {
      setScores(golfer.scores)
      setName(golfer.name)
    }
  }, [ golfer ])

  return (
    <Layout>
      <>
        {error ? (
          error
        ) : (
          <>
            <h1> {name} </h1>
            {scores && scores.map(score => (
              <ScoreCard
                key={score.id}
                id={score.id}
                totalScore={score.total_score}
                playedAt={score.played_at}
                userId={score.user_id}
                userName={name}
              />
            ))}
          </>
        )}
      </>
    </Layout>
  )
}
export default Golfer
