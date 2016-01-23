function getMessage(a, b) {

  if ((typeof a) == 'boolean') {

    if (a) {
      return 'Я попал в ' + b;
    } else {
      return 'Я никуда не попал';
    }
  }

  if ((typeof a) == 'number') {
    return 'Я прыгнул на ' + a*100 + ' сантиметров';
  }

  if (Array.isArray(a)) {
    var length = 0;
    var i = 0;

    if (Array.isArray(b)) {
      while( i < a.length) {
        length += a[i] * b[i];
        i++;
      }
      return 'Я прошел ' + length + ' метров';
    } else {
      while( i < a.length) {
        length += a[i];
        i++;
      }
      return 'Я прошел ' + length + ' шагов';
    }
  }
}