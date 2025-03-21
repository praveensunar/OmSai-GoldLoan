import React, { useEffect,useState } from 'react'
import axios from 'axios'

function Users() {
    const [users, setUsers] = useState([])

    useEffect(() =>{
        axios.get('http://localhost:3001/getusers')
        .then(users => setUsers(users.data)) 
        .catch(error => console.log(error))
    },[]);
  return (
    <div className='flex justify-center items-center mt-10 p-10 flex-col gap-5'>
        <h2 className='text-5xl text-amber-950 font-bold'>User Detail</h2>
        <table className='border-4 w-full text-center'>
            <thead className='border-4 font-bold text-2xl'>
                <tr>
                    <th className='border-2'>ID</th>
                    <th className='border-2'>Name</th>
                    <th className='border-2'>Email</th>
                    <th className='border-2'>Phone</th>
                </tr>
            </thead>
            <tbody className='text-xl font-medium text-'>
            {users.map((user, index) => (
    <tr key={user._id}>
        <td className='border-2'>{String(index + 1).padStart(2, '0')}</td>
        <td className='border-2 capitalize'>{user.name}</td>
        <td className='border-2'>{user.email}</td>
        <td className='border-2'>{user.phone}</td>
    </tr>
))}

            </tbody>
        </table>
    </div>
  )
}

export default Users