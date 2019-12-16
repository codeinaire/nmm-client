import React from 'react'

export default (props: any) => {
  console.log('props in group share', props);
  function handleShareImage() {
    FB.getLoginStatus(async (res: fb.StatusResponse) => {
      if(!res?.authResponse) {
        console.log('error', res);
      }
      // FB.api(
      //   '/548965739271455/photos', 'post', {
      //     url: `https://res.cloudinary.com/codeinaire/image/upload/v1575760488/nmm-profile-pics/y7vzfciewvobndehwe9e.jpg`
      //   },  (res: any) => {
      //     console.log('res share group', res);
      //   }
      // )
      // FB.api(`/548965739271455/feed`, (res:any) => {
      //   console.log('res', res);

      // })

      const blob = await new Blob(['data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7'], {type: 'image/jpg'})
      const formData = new FormData()

      formData.append('access_token', res.authResponse.accessToken)
      formData.append('source', blob)
      formData.append('message', 'status')

      console.log('formData', formData);


      let resp = await fetch('https://graph.facebook.com/548965739271455/photos', {
        body: formData,
        method: 'post'
      })

      const response = await resp.json()
      console.log('response',response);
    })
  }

  return (
    <div>
      <h4>
        Fb Group share component
        <button onClick={handleShareImage}>Share to NMM FB Group</button>
      </h4>
    </div>
  )
}