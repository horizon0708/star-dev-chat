import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../services/Auth';
import { supabase } from '../../services/supabaseClient';
import {Box, Center, FormLabel, Input, Button, Spinner} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { paths } from '../../services/path'; 


export const Profile = ({session}) => {
  const user = useContext(AuthContext);
  const [ loading, setLoading ] = useState(true);
  const [ username, setUsername ] = useState(null);

  useEffect (()=>{
    setProfile()
  },[session])

  const setProfile = async () => {
   
    try {
      setLoading(true)
      let { data, error } = await supabase
       .from('UserProfiles')
       .select('*')
       .range(0, 3)
       .eq('user_id', user.id)
       .single()
       console.log(data)
    
       if ( data ){
        setUsername(data.username.charAt(0).toUpperCase()+ data.username.slice(1))
       }
       } catch (error){
        alert(error.message)
       }
       finally {
           setLoading(false)
       }
  }
 
  const updateProfile = async (event) => {
    event.preventDefault()
      try {
      setLoading(true)
      const updates = {
        id:user.id,
        username,
        updated_at: new Date(),
      }
      const { data, error } = await supabase
      .from('UserProfiles')
       .update({ username: 'username' })
       .eq('username', 'data.username')
      if (error){
        throw error
      }
    } catch (error) {
        alert(error.message)
    }
    finally {
      setLoading(false)
    }
  }


  return <div>
            <Center>
              <Box>
                {loading?(
                  <Center>
                    <Spinner/>
                  </Center>
                ):(
              <form onSubmit={updateProfile}>
                <FormLabel htmlFor='email'>Email: { user.email} </FormLabel>
                <Box mt={6}>
                  <FormLabel>Username:</FormLabel>
                  <Input
                  id="username"
                  type="text"
                  value={username || ''}
                  onChange={event=>{setUsername(event.target.value)}}
                  />
                </Box>
                <Button p={6} mt={6} type="submit" width="100%" disabled= {loading}>
                  Update Profile
                </Button>
                <Center mt={6}>
                <Link  to={paths.signout}>
                    Sign Out
                 </Link>
                </Center>

              </form>)}
              </Box>
              </Center>   
    </div>;
};
