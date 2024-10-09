// Encode a chosen file from a file input to base 64
// (call this function asynchronously using await)

export default function fileToBase64(fileInputElement) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileInputElement.files[0]);
    reader.onerror = () => reject();
    reader.onload = () => resolve(reader.result);
  });
}