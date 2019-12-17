import React from 'react'

import logger from '../utils/logger'

// TODO - styling for the button
// TODO - logic for the challenge
export default ({ href, quote }: { href: string, quote: string }) => {
  function handleShareItem() {
    FB.ui({
      method: 'share',
      hashtag: '#NoMeatMay',
      href,
      quote,
    }, (res: fb.ShareDialogResponse) => {
      if(res == undefined) {
        logger.log({
          level: 'ERROR',
          description: 'Undefined error occurred when attempting to post to user timeline!'
        })
        return
      }

      if (res.error_message) {
        logger.log({
          level: 'ERROR',
          description: `Couldn't post to user timeline b/c ${res.error_message}`
        })
      } else {
        logger.log({
          level: 'INFO',
          description: 'Successfully posted to timeline'
        })
      }
    })
  }

  return (
    <div>
      <button style={{ position: 'absolute' }} onClick={handleShareItem}>
        Share item to your timeline
      </button>
    </div>
  )
}
