// file into buffer

export async function FileIntoBuffer(file: any) {

    if (!file) {
        return null;
    }

    const arrayBuffer = await file.arrayBuffer();

    const buffer = new Uint8Array(arrayBuffer);

    return buffer;

}