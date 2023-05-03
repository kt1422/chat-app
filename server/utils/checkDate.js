const checkDate = (createAt) =>{
    const time = new Date(createAt);
    const now = new Date();
    const diff = (now.getTime() - time.getTime()) / 1000;

    if (diff < 60) {
        return 'just now';
    } else if (diff < 3600) {
        return 'sent ' + Math.round(diff / 60) + 'm ago';
    } else if (diff < 86400) {
        return 'sent ' + Math.round(diff / 3600) + 'h ago';
    } else if (diff < 604800) {
        return 'sent ' + Math.round(diff / 86400) + 'd ago';
    } else if (diff < 31536000) {
        return 'sent ' + Math.round(diff / 604800) + 'w ago';
    } else if (diff >= 31536000) {
        return 'sent ' + Math.round(diff / 31536000) + 'y ago';
    }

    return time.toDateString();
}

module.exports = {
    checkDate
}