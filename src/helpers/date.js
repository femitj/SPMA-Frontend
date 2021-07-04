import moment from 'moment';

const formatDate = (date) => {
    return moment(date).format('MM-DD-YYYY'); //change the format string to your preference
}

export default formatDate;
