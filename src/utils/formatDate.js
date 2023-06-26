const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export const formatDate = date => {
  return new Date(date).toLocaleString('en-US', options);
};
