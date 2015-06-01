module.exports.jsonOk = function (body) {
  return [
    200, {
      'Content-type': 'application/json'
    }, JSON.stringify(body)
  ];
};

module.exports.jsonError = function (statusCode, body) {
  return [
    statusCode, {
      'Content-type': 'application/json'
    }, JSON.stringify(body || {
      error: statusCode,
      message: 'Something terrible has happened'
    })
  ];
};

