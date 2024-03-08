import React from 'react'
import './style.scss'
import { useSelector } from 'react-redux'

const Genres = ({ids}) => {
    const {genres} = useSelector((state)=>state.home)
  return (
    <div className='genres'>
        {
            ids.map((id)=>(
                <div key={id} className='genre'>
                    {genres?.[id]?.name}
                </div>
            ))
        }
    </div>
  )
}

export default Genres
