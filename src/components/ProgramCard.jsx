import React from 'react'

const ProgramCard = ({program}) => {
  return (
    <div className="shadow-lg p-5 flex flex-col bg-FarmWhite rounded-lg transition ease-in-out hover:scale-105 duration-300 font-mono">
    <div className="font-bold text-center text-lg text-FarmNavy"><span className="text-FarmLime">{program.program_name}</span></div>
    <div>Owner Name: {program.owner_name}</div>
    <div>Private: {program.private ? 'true': 'false'}</div>
    <div>unit: {program.unit}</div>
    </div>
  )
}

export default ProgramCard