const truncateLocation = title => title.split(',')[0];

const isBase64 = str => {
  if (!str || !typeof str === 'string') {
    return false;
  }

  // TODO proper URL/URI/Base64 validation
  return str.startsWith('/') || str.endsWith('=');
};

export { isBase64, truncateLocation };
