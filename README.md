## Thanos snap effect using JS
This is a simple implementation which can still be improved visually or performance wise, but would be a good starting point for achieving more complex animations like this.
Main code is written in `thanos.js` and can be used after import with initializing like this:
```
  const btn = document.querySelector('.my-btn');
  const yourNode = document.querySelector(".your-node");
  const thanos = new Thanos(yourNode);
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    thanos.explode();
  });
```

## Dependencies
This project uses `dom-to-image` so be sure to import it as well.
