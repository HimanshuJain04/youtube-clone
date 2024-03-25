// file into buffer

export async function FileIntoBuffer(file: any) {

    const arrayBuffer = await file.arrayBuffer();

    const buffer = new Uint8Array(arrayBuffer);

    return buffer;

}