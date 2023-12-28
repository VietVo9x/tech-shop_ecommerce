export const isFileValidSize = (file: any) => {
  const maxSize = 2 * 1024 * 1024;
  if (file.size < maxSize) {
    return true;
  }

  return false;
};
export const isValidFileType = (fileName: any) => {
  const allowedExtensions = ['.jpg', '.jpeg', '.png'];
  const lastDotIndex = fileName.lastIndexOf('.');
  if (lastDotIndex !== -1) {
    const extension = fileName.substring(lastDotIndex).toLowerCase();
    return allowedExtensions.includes(extension);
  }
  return false;
};
