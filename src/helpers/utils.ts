export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getArrayBuffer = async (path: string): Promise<ArrayBuffer> => {
  const promise = new Promise<ArrayBuffer>((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", path, true);
    xhr.responseType = "arraybuffer";
    xhr.onload = function () {
      resolve(this.response);
    };
    xhr.send();
  });

  return await promise;
};
