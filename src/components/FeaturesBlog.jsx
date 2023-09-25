import moment from 'moment'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const FeaturesBlog = ({blogs,title}) => {
  const navigate=useNavigate()
  return (
    <div>
      <h2 className='text-start pt-3 py-2 mb-4 border-bottom border-black text-muted'>{title}</h2>
      {blogs?.map((item)=>(
        <div className='row pb-4 p-1 border-bottom w-100' key={item.id} style={{cursor:"pointer"}} onClick={()=>navigate(`/detail/${item.id}`)}>
          <div className='col-5 align-self-center '>
            <img style={{width:"60px",height:"60px",borderRadius:"100%",objectFit:"cover",backgroundSize:"cover"}} src={item.imgUrl} alt={item.title} />
          </div>
          <div className='col-7'>
            <div className='text-start'>{item.title}</div>
            <div>
            <p className='text-muted'>{moment(item.timestamps.toDate()).format('L')} </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default FeaturesBlog