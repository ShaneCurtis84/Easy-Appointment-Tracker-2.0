module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  format_long_date: (date) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth();
    const day = new Date(date).getDate();
    return `${day} ${months[month]} ${year}`;
  },
  format_appointment_time: (time) => {
    const hour = time.slice(0, 2);
    const minute = time.slice(2, 4);
    return `At: ${hour}:${minute}`;
  }
};
