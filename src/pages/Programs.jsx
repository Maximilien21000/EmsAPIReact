import React from 'react'
import ProgramCard from '../components/ProgramCard.jsx'
import { useState, useEffect } from 'react'
import Layout from '../components/Layout'


let BASE_URL= `${process.env.REACT_APP_API}/programs/get/`

const Programs = () => {
  const [programs, setPrograms] = useState([])
  const [programName, setName] = useState('')
  const [isPending, setIsPending] = useState(true)

  useEffect(() => {
    fetch(BASE_URL)
    .then(response => response.json())
    .then(json => {
      setPrograms(json)
      setIsPending(false)
    })
    }, [programName])
  return (
    <Layout>
        {isPending}
          <div className='grid gid-cols-2 gap-3 lg:grid-cols-4'>
            {programs.map((item) => {
                return (
                <ProgramCard key={item.program_name} program = {item}/>
                )
            })}
          </div>
      
    </Layout>
  )
}

export default Programs;