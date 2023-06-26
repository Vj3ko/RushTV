const options = {
  year: 'numeric',
};

export const formatYear = date => {
  return new Date(date).toLocaleString('en-US', options);
};
