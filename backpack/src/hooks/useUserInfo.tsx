import defaultpfp from '../public/pfp.png'
import { auth } from '../firebase/firebase-config'


import { useState } from 'react';
import { User } from 'firebase/auth';

interface UserInfo {
    pfp: string,
    username: string,
    uid: string
}

export default function useUserInfo() : UserInfo {

    const user = auth.currentUser

    const pfp = user?.photoURL || defaultpfp
    const username = user?.displayName || ""
    const uid = user?.uid || ""

    /* TODO : make this hook into something useful */
  const [value, setValue] = useState(false);
  const flip = () => {
    setValue(!value)
  };

  return {pfp, username, uid};
}

