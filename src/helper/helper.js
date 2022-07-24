const timeInterval = [
  { label: "8:00am", value: "8:00am" },
  { label: "8:30am", value: "8:30am" },
  { label: "9:00am", value: "9:00am" },
  { label: "9:30am", value: "9:30am" },
  { label: "10:00am", value: "10:00am" },
  { label: "10:30am", value: "10:30am" },
  { label: "11:00am", value: "11:00am" },
  { label: "11:30am", value: "11:30am" },
  { label: "12:00pm", value: "12:00pm" },
  { label: "12:30pm", value: "12:30pm" },
  { label: "01:00pm", value: "01:00pm" },
  { label: "01:30pm", value: "01:30pm" },
  { label: "02:00pm", value: "02:00pm" },
  { label: "02:30pm", value: "02:30pm" },
  { label: "03:00pm", value: "03:00pm" },
  { label: "03:30pm", value: "04:00pm" },
  { label: "04:30pm", value: "04:30pm" },
];

const getSec = (time) => {
  let a = time.split(":");
  const min = a[1].substring(0, 2);
  let seconds = +a[0] * 60 * 60 + +min * 60;

  return a[1].substring(2) === "am" ? seconds : seconds + 43200;
};

const getTimezone = (new Date().getTimezoneOffset() / -60) * 60 * 60;

const getUserName = (users, user_id) => {
  const usa = users.find((user) => user?.id === user_id);
  return usa.name;
};

export { getTimezone, getSec, timeInterval, getUserName };
