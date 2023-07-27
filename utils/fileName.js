const generateNewFileName = (userName, userId, roles, fileName) => {
    const fileNameWithoutExtension = fileName.split('.').slice(0, -1).join('.');
    const fileExtension = fileName.split('.').pop();
    return `${userName}_${userId}_${roles}_${fileNameWithoutExtension}.${fileExtension}`;
  };
  
  module.exports = generateNewFileName;
  