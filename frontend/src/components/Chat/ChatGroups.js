import React,{useEffect, useState} from 'react'

function ChatGroups() {
    const[group,setGroup]=useState([])
    const[search,setSearch]=useState('')
    const handleChange =(e)=>{
        setSearch(e.target.value)
    }

    useEffect(()=>{
        const data=[
            {name:"DC"},
            {name:"Marvel"},
            {name:"Guardians"},
            {name:"Avenders"},
            {name:"Sharks"}
        ]
        setGroup(data)

    },[])

  return (
    <div className='chat_group'>
        <li>
            <input name='search' placeholder='Seach Groups..' value={search} onChange={handleChange}/>
        </li>
        
        {group.map((item,i)=>{
            return (
                <li>
                    <p>{item.name}</p>
                </li>
            )
        })}
    </div>
  )
}

export default ChatGroups