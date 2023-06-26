export const calculateLifeSpan = (birthdateString, deathDayString) => {
  const birthdate = new Date(birthdateString);
  const dayOfDeath = new Date(deathDayString);
  let age = dayOfDeath.getFullYear() - birthdate.getFullYear();
  const monthDifference = dayOfDeath.getMonth() - birthdate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && dayOfDeath.getDate() < birthdate.getDate())
  ) {
    age--;
  }

  return age;
};

export const calculateAge = birthDateStr => {
  return calculateLifeSpan(birthDateStr, new Date().toISOString().slice(0, 10));
};
