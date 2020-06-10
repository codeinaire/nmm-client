import React from 'react'
import { Box, Button } from 'grommet'
import { Facebook } from 'grommet-icons'

import {
  HandleCreateUpdateChallengeApi,
  CreateUpdateMutationValues
} from '../containers/types'

// TODO - styling for the button
// TODO - logic for the challenge
export default function FbUserShare({
  href,
  quote,
  handleCreateUpdateChallengeApi,
  values
}: {
  href: string
  quote: string
  handleCreateUpdateChallengeApi: HandleCreateUpdateChallengeApi
  values: CreateUpdateMutationValues
}) {
  function handleShareItem() {
    FB.ui(
      {
        method: 'share',
        hashtag: '#NoMeatMay',
        href,
        quote
      },
      (res: fb.ShareDialogResponse) => {
        if (res == undefined) {
          console.log({
            level: 'ERROR',
            description:
              'Undefined error occurred when attempting to post to user timeline!'
          })
          return
        }

        if (res.error_message) {
          console.log({
            level: 'ERROR',
            description: `Couldn't post to user timeline b/c ${res.error_message}`
          })
        } else {
          handleCreateUpdateChallengeApi(values, ['SharedRecipe'])
          console.log({
            level: 'INFO',
            description: 'Successfully posted to timeline'
          })
        }
      }
    )
  }

  return (
    <Box
      a11yTitle='sharing section container'
      align='center'
      justify='center'
      margin={{
        bottom: '20px'
      }}
    >
      <Button
        a11yTitle='share to facebook time line button'
        color='#4267B2'
        data-testid='submit'
        icon={<Facebook />}
        label='SHARE TO FACEBOOK'
        margin={{
          top: '0',
          bottom: '10px'
        }}
        onClick={handleShareItem}
        primary={true}
        type='button'
      />
    </Box>
  )
}
