export const encodeFileToData = (file) =>
  new Promise((resolve, reject) => {
    try {
      if (!file) {
        console.log(
          'ImageDataURI :: Error :: Missing some of the required params: data ',
        )
        return null
      }

      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    } catch (error) {
      console.log(
        `something wrong in file: ${JSON.stringify(error.message)}`,
      )
    }
  })

const dataUrlToBlob = (dataUrl) => {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  const byteString = atob(dataUrl.split(',')[1])

  // separate out the mime component
  const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length)

  // create a view into the buffer
  const ia = new Uint8Array(ab)

  // set the bytes of the buffer to the correct values
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  // write the ArrayBuffer to a blob, and you're done
  const blob = new Blob([ia], { type: mimeString })
  return blob
}

export const dataUrlToFileList = (dataUrls, fileNames) => {
  const fileArray = []

  for (let index = 0; index < dataUrls.length; index++) {
    const dataUrl = dataUrls[index]
    const fileName = fileNames[index]
    // Converting content to Blob
    const blobObject = dataUrlToBlob(dataUrl)
    // Converting Blob to file
    const file = new File([blobObject], fileName)
    fileArray.push(file)
  }

  // Converting array with file to filelist and passing to uploader
  return fileArray
}
