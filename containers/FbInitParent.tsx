import React, { useState, useEffect } from 'react'

import loadFbApi from '../utils/loadFbApi'
import { isServer } from '../utils/misc'
import logger from '../utils/logger'

if(!isServer()) {
  logger.log({
    level: 'INFO',
    description: 'Initialising FB SDK...'
  })
  loadFbApi()
}

export default ({ children }: { children: any}) => {
  return (
    <div>
      {children('testing')}
    </div>
  )
}
