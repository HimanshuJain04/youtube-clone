

export function removeVideoFromObject(data: any) {
    return data.map((item: any) => {
        const { video, ...rest } = item;
        return { ...video, ...rest };
    });
}


export function removeVideoUnderVideoFromObject(dataArray: any) {

    const directVideoObjects: any = [];
    // Iterate through each object in 'dataArray'
    dataArray.forEach((item: any) => {
        // Check if the current item has a 'videos' key and if its value is an array
        if (item.videos && Array.isArray(item.videos)) {
            // Concatenate the 'videos' array with the 'directVideoObjects' array
            directVideoObjects.push(...item.videos);
        }
    });
    return directVideoObjects;
}