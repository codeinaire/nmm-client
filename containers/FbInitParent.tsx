import React from 'react'

import loadFbApi from '../utils/loadFbApi'
import { isServer } from '../utils/misc'

if (!isServer()) {
  console.log({
    level: 'INFO',
    description: 'Initialising FB SDK...'
  })
  loadFbApi()
}

export default function FbInitParent({ children }: { children: any }) {
  return <div>{children('testing')}</div>
}
