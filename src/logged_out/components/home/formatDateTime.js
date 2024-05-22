export default function formatDateTime(inputDate) {
  function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return 'th'; // catch all 11th, 12th, 13th
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  }

  const date = new Date(inputDate);
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const ordinalSuffix = getOrdinalSuffix(day);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  const secondsStr = seconds < 10 ? '0' + seconds : seconds;

  const timeString = `${hours}:${minutesStr}:${secondsStr} ${ampm}`;

  return `${monthNames[monthIndex]} ${day}${ordinalSuffix}, ${year} ${timeString}`;
}