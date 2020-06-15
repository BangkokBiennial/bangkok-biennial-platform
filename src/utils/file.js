export const encodeFileToData = (file) => new Promise ((resolve, reject) => {
  try {
    if (!file) {
      console.log('ImageDataURI :: Error :: Missing some of the required params: data ');
      return null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);

  } catch (error) {
    console.log(`something wrong in file: ${JSON.stringify(error.message)}`)
  }
})