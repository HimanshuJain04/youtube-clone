export const CovertIntoFormData = (data: any) => {
    const formData = new FormData();

    // Iterate over each key-value pair in the data object
    Object.entries(data).forEach(([key, value]) => {
        // Check if the value is an array
        formData.append(key, value);
    });

    return formData;
}
