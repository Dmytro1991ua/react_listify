import { FormikProps } from 'formik';
import { useCallback, useEffect, useState } from 'react';

import { authService } from '../../auth/auth.service';
import { FILE_SIZE, SUPPORTED_IMAGE_EXTENSIONS } from '../profile.constants';
import { ProfileFormsInitialValues } from '../profile.interfaces';

type HookProps = {
  formikInstance: FormikProps<ProfileFormsInitialValues>;
};

type ReturnedHookType = {
  uploadProgress: number;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const useUploadImage = ({ formikInstance }: HookProps): ReturnedHookType => {
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const hasToBeUploaded =
    imageUpload && imageUpload.size < FILE_SIZE && SUPPORTED_IMAGE_EXTENSIONS.includes(imageUpload?.type);

  const uploadUserImage = useCallback(async () => {
    try {
      hasToBeUploaded && (await authService.uploadFile(imageUpload, setUploadProgress));
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }, [imageUpload, hasToBeUploaded]);

  useEffect(() => {
    uploadUserImage();
  }, [imageUpload, uploadUserImage]);

  function onImageChange(e: React.ChangeEvent<HTMLInputElement>): void {
    if (!e.target.files) {
      return;
    }

    setImageUpload(e.target.files[0]);
    formikInstance.setFieldValue('picture', e.target.files[0]);
  }

  return { uploadProgress, onImageChange };
};
