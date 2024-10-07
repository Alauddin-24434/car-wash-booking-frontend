import { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import app from '../../firebase/Firebase.config'; // Ensure the Firebase app is properly configured

const storage = getStorage(app);

const useFirebaseUpload = () => {
  const [percent, setPercent] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>('');

  const uploadImage = async (file: File): Promise<string> => {
    const storagePath = `images/${file.name}`;
    const storageRef = ref(storage, storagePath);

    return new Promise((resolve, reject) => {
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPercent(progress);
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
       
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(storageRef);
          setImageUrl(downloadURL);
          resolve(downloadURL);
        
        }
      );
    });
  };

  return { percent, imageUrl, uploadImage };
};

export default useFirebaseUpload;
