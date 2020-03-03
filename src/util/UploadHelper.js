/**
 * @param {FileBlob} fileBlob The file blob to transform.
 * @returns {string} The text from that file blob.
 */
export async function transformFileBlobToText(fileBlob)
{
    return new Promise((resolve, reject) =>
    {
        let fileReader = new FileReader();
        
        // If file reading successful...
        fileReader.addEventListener('load', event =>
        {
            const fileData = event.target.result;
            resolve(fileData);
        });

        // If file reading failed...
        fileReader.addEventListener('error', event =>
        {
            reject(new Error('Unable to import file: ' + event.target.error.code));
        });

        fileReader.readAsText(fileBlob);
    });
}

/**
 * @param {FileBlob} fileBlob The file blob to transform.
 * @returns {object} The object from that file blob.
 */
export async function transformFileBlobToJSON(fileBlob)
{
    const result = await transformFileBlobToText(fileBlob);
    return JSON.parse(result);
}
