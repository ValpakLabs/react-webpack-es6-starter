function cover(w1, h1, w2, h2, appendUnit=0, centered=true, fit=false) {
  let top = 0;
  let left = 0;
  let width = 0;
  let height = 0;
  let r1 = h1 / (w1 || 1);
  let r2 = h2 / (w2 || 1);
  let diff;

  if (fit) {

    if (r1 >= r2) {
      diff = getDiff(w1*r2, h1);
      width = w1 + appendUnit;
      height = 'auto';
      top = Math.ceil(diff/2) + appendUnit;
      left = 0;
    } else {
      diff = getDiff(h1/r2, w1);
      height = h1 + appendUnit;
      width = 'auto';
      top = 0;
      left = Math.ceil(diff/2) + appendUnit;
    }

  } else {

    if (r2 >= r1) {
      diff = getDiff(w1*r2, h1);
      top = Math.ceil(-diff/2) + appendUnit;
      left = 0 + appendUnit;
      width = w1 + appendUnit;
      height = 'auto';
    } else {
      diff = getDiff(h1/r2, w1);
      top = 0 + appendUnit;
      left = Math.ceil(-diff/2) + appendUnit;
      width = 'auto';
      height = h1 + appendUnit;
    }

  }

  return {top, left, width, height};

  function getDiff(l1, l2) {
    return centered ? Math.abs(l1 - l2) : 0;
  }
}

export default cover;