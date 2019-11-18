import * as React from 'react'

export interface MediaUploadProps {
  id: string;
  onChange: (field: string, mediaId: string) => void;
  field: any
  form: any
}

export interface MediaUploadState {
  progress: number;
  file?: File;
  error?: string;
}

export default class MediaUpload extends React.Component<
  MediaUploadProps,
  MediaUploadState
> {
  state: MediaUploadState = { progress: -1 }

  handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('MediaUploads comp', this.props);

    if (!e.target.files) {
      return
    }
    let file = e.target.files[0]
    this.setState({ file: file })

    let data = new FormData()
    data.append('file', file)
    data.append('upload_preset', 'nmm-recipes')

    this.setState({ error: undefined, progress: 0 })

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/codeinaire/image/upload',
      {
        method: 'POST',
        body: data,
      }
    )

    this.setState({ error: undefined, progress: -1 })

    const files = await res.json()
    this.props.form.setFieldValue('lowResolution', files.secure_url)
    this.props.form.setFieldValue('standardResolution', files.eager[0].secure_url)
    this.props.field.onChange(this.props.id, files.secure_url)
    if(!this.props.form.isValid) {
      console.log('inside isvalid IF');
      this.props.form.setFieldError('photo', 'A new error message!!')
      this.props.form.setErrors({ fields: { photo: 'This is an error message!!!'}})
    }
  }

  render() {
    return (
      <div>
        <div style={{ marginTop: 10 }}>
          <label className="button button--purple button--secondary">
            Upload new picture
            <input
              className="visually-hidden"
              type="file"
              onChange={this.handleFileChange}
            />
          </label>
        </div>
      </div>
    )
  }
}
