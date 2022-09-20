export const formatDate = (string) => {
  const [str1, str2] = string.split('T');
  const [str3] = str2.split('Z');

  return str1 + ' ' + str3;
};
