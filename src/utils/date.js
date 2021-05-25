const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec'
];

const dateTo12HourTime = date => {
  const meridiem = date.getHours() > 11 ? 'pm' : 'am';
  const convertedHours = date.getHours() % 12 || '12';
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${convertedHours}:${minutes} ${meridiem}`;
};

export const dateToString = date => {
  const today = new Date();

  if (date.getMonth() === today.getMonth()) {
    if (date.getDate() === today.getDate()) {
      return `Today at ${dateTo12HourTime(date)}`;
    }

    if (date.getDate() === today.getDate() - 1) {
      return `Yesterday at ${dateTo12HourTime(date)}`;
    }
  }

  return `${DAYS[date.getDay()]} ${MONTHS[date.getMonth()]} ${date.getDate()}`;
};
