import React, { useState } from 'react'
import { Button } from 'grommet'
import { Facebook } from 'grommet-icons'
import FacebookShareGroupMessageModal from 'react-modal'

import {
  HandleCreateUpdateChallengeApi,
  CreateUpdateMutationValues
} from '../containers/types'

export default function FbGroupShare({
  imageSrc,
  handleCreateUpdateChallengeApi,
  values
}: {
  imageSrc: string
  handleCreateUpdateChallengeApi: HandleCreateUpdateChallengeApi
  values: CreateUpdateMutationValues
}) {
  const [
    facebookShareGroupSuccessMessage,
    setfacebookShareGroupSuccessMessage
  ] = useState(false)
  const [
    facebookShareGroupFailMessage,
    setFacebookShareGroupFailMessage
  ] = useState(false)

  function handleShareImage() {
    FB.getLoginStatus(async (res: fb.StatusResponse) => {
      if (res.status != 'connected') {
        console.log({
          level: 'ERROR',
          description: `Couldn't authorize b/c ${res.status}`
        })
        return
      }
      const formData = new FormData()
      formData.append('file', imageSrc)
      formData.append('upload_preset', 'nmm-profile-pics')

      const uploadedPhoto = await fetch(process.env.CLOUDINARY_API || '', {
        method: 'POST',
        body: formData
      })

      const files = await uploadedPhoto.json()
      FB.api(
        `/${process.env.FB_GROUP_ID}/photos`,
        'post',
        {
          url: files.eager[0].secure_url,
          access_token: res.authResponse.accessToken
        },
        (res: any) => {
          // TODO - implement failure
          // Failure
          //{
          //   "error": {
          //     "message": "Unsupported post request. Object with ID '123456789012345' does not exist, cannot be loaded due to missing permissions, or does not support this operation. Please read the Graph API documentation at https://developers.facebook.com/docs/graph-api",
          //     "type": "GraphMethodException",
          //     "code": 100,
          //     "error_subcode": 33,
          //     "fbtrace_id": "AfxnzYlnkf72FbMq_KFv37j"
          //   }
          // }
          if (res?.error) {
            setFacebookShareGroupFailMessage(true)
            console.log({
              level: 'ERROR',
              description: res.error.message
            })
          } else {
            setfacebookShareGroupSuccessMessage(true)
            handleCreateUpdateChallengeApi(values, ['SharedFriendsImage'], {
              standardResolution: files.secure_url,
              lowResSharedFriendsImage: files.eager[0].secure_url
            })
            console.log({
              level: 'INFO',
              description: `Successfully posted image to group with post_id: ${res.post_id} `
            })
          }
          // Success
          // TODO - implement confirmation that upload to FB
          // and add to items complete. This is what's returned.
          // {
          // "id": "117649686386016",
          // "post_id": "548965739271455_553979312103431"
          //   }
        }
      )
    })
  }

  const facebookModalCustomStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  }

  function closeModal() {
    setFacebookShareGroupFailMessage(false)
    setfacebookShareGroupSuccessMessage(false)
  }
  const modalMessage = facebookShareGroupSuccessMessage
    ? 'You succeed in posting to the No Meat May Facebook group!'
    : facebookShareGroupFailMessage
    ? 'Failed to post photo to group. Please try again!'
    : ''

  return (
    <div>
      <Button
        a11yTitle='share image to group button'
        color='#4267B2'
        data-testid='button'
        icon={<Facebook />}
        label='SHARE PHOTO TO NMM GROUP'
        margin={{
          top: '0',
          bottom: '10px'
        }}
        onClick={handleShareImage}
        primary={true}
        type='button'
      />
      <FacebookShareGroupMessageModal
        isOpen={
          facebookShareGroupFailMessage || facebookShareGroupSuccessMessage
        }
        closeTimeoutMS={2}
        style={facebookModalCustomStyles}
        contentLabel='Fail or Success modal for posting to No Meat May Facebook group'
        shouldCloseOnOverlayClick={true}
      >
        <button onClick={closeModal}>close</button>
        <h3>{modalMessage}</h3>
      </FacebookShareGroupMessageModal>
    </div>
  )
}
