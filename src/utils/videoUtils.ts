



// get duration in minutes
export const getDuration = (totalDuration: number): string => {
    const hours = Math.floor(totalDuration / 3600);
    const minutes = Math.floor((totalDuration % 3600) / 60);
    const seconds = totalDuration % 60;

    let formattedDuration = '';

    if (hours > 0) {
        formattedDuration += hours.toString().padStart(2, '0') + ':';
    }

    formattedDuration += minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');

    return formattedDuration;
};


export const getViews = (totalViews: number): string => {
    if (totalViews < 1000) {
        return totalViews.toString(); // No abbreviation needed for views less than 1K
    } else if (totalViews < 1000000) {
        return (totalViews / 1000).toFixed(0) + 'K'; // Convert to thousands
    } else if (totalViews < 1000000000) {
        return (totalViews / 1000000).toFixed(0) + 'M'; // Convert to millions
    } else {
        return (totalViews / 1000000000).toFixed(0) + 'B'; // Convert to billions
    }
};


export const getTime = (totalTime: Date) => {
    const millisecondsPerMinute = 60 * 1000;
    const millisecondsPerHour = millisecondsPerMinute * 60;
    const millisecondsPerDay = millisecondsPerHour * 24;
    const millisecondsPerMonth = millisecondsPerDay * 30;
    const millisecondsPerYear = millisecondsPerDay * 365;

    const currentTime = new Date();
    const previousTime = new Date(totalTime);

    const timeDifference = currentTime.getTime() - previousTime.getTime();

    const years = Math.floor(timeDifference / millisecondsPerYear);
    const months = Math.floor(timeDifference % millisecondsPerYear / millisecondsPerMonth);
    const days = Math.floor(timeDifference % millisecondsPerMonth / millisecondsPerDay);
    const hours = Math.floor(timeDifference % millisecondsPerDay / millisecondsPerHour);
    const minutes = Math.floor(timeDifference % millisecondsPerHour / millisecondsPerMinute);

    let result = '';

    if (years > 0) {
        result += `${years} year${years > 1 ? 's' : ''}`;
        return result;
    }
    if (months > 0) {
        result += `${months} month${months > 1 ? 's' : ''}`;
        return result;
    }
    if (days > 0) {
        result += `${days} day${days > 1 ? 's' : ''}`;
        return result;
    }
    if (hours > 0) {
        result += `${hours} hour${hours > 1 ? 's' : ''}`;
        return result;
    }
    if (minutes > 0) {
        result += `${minutes} minute${minutes > 1 ? 's' : ''}`;
        return result;
    }

    // If the time difference is less than a minute
    return "Just now";
};


