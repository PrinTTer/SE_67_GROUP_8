export const formatDateTime = (dateString, options = {}) => {
    if (!dateString) return 'N/A';

    const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };

    const mergedOptions = { ...defaultOptions, ...options };
    
    try {
        const date = new Date(dateString);
        
        // Check if date is valid
        if (isNaN(date.getTime())) return 'Invalid Date';

        // Format based on different scenarios
        if (options.timeOnly) {
            return date.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit', 
                hour12: true 
            });
        }

        if (options.dateOnly) {
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }

        // Full date and time
        return date.toLocaleString('en-US', mergedOptions);
    } catch (error) {
        console.error('Error formatting date:', error);
        return 'N/A';
    }
};