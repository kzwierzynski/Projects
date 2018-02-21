var A = {
  x: function() {
    console.log('x');
    return this;
  },
  y: function() {
    console.log('y');
    return A;
  },
  z: function() {
    console.log('z');
  },
}

A.x().y().z();
