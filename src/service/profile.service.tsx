export const fetchMyProfile = async () => {
    const token = localStorage.getItem('token');

    if (token) {
        const headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": token,
        }

        const res = await fetch(`${process.env.REACT_APP_BASIC_URL}users/currentUser`, {
            method:'get',
            headers: headers
        })
    
        return res;
    }
}

export const uploadPhoto = async (photo:File, successMessage:string) => {
    try {
        const formData = new FormData();
        formData.append('doc', photo);
    
        const response = await fetch(`${process.env.REACT_APP_BASIC_URL}helpers/docs-uploads`, {
          method: 'POST',
          body: formData,
        });
    
        if (response.status === 201) {
          const respStr = await response.text();
          const uploadPhotoModel = JSON.parse(respStr);

          console.log("upload photo>>>>", uploadPhotoModel);
    
          if (successMessage) {
            // Show success message using an appropriate UI library (e.g., toast notification)
          }
          // Update the UI as needed
          return uploadPhotoModel.url;
        } else {
          console.error('ErrorCode >>', response.status);
          // Show error message using an appropriate UI library (e.g., toast notification)
          const errorMessage = await response.text();
          console.error(errorMessage);
        }
      } catch (error) {
        console.error('Upload exception >>', error);
        // Show error message using an appropriate UI library (e.g., toast notification)
      }
}