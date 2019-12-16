import React from 'react'

import logger from '../utils/logger'

export default ({ imageSrc }: { imageSrc: string }) => {
  function handleShareImage() {
    FB.getLoginStatus(async (res: fb.StatusResponse) => {
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
          logger.log({
            level: 'ERROR',
            description: res.error.message
          })
        } else {
          logger.log({
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

  return (
    <div>
      <button style={{ position: 'absolute' }} onClick={handleShareImage}>
        Share image to group
      </button>
    </div>
  )
}
