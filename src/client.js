function apiError (status, message) {
  var err = new Error(message);
  err.status = status;
  return err;
}

module.exports = function (path, callback) {

  var xhr = new window.XMLHttpRequest();

  xhr.addEventListener('load', function () {
    var body;
    try {
      body = JSON.parse(this.responseText);
    }
    catch (e) {
      return callback('Invalid JSON:', this.responseText);
    }

    if (this.status < 200 || this.status > 299) {
      return callback(apiError(this.status, body.message));
    }

    return callback(null, body);
  });

  xhr.open('get', path);
  xhr.send();
};

