const btn = document.querySelector("button");
window.onload = () => {
  const messageNode = document.querySelector(".center");
  const thanos = new Thanos(messageNode);
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    thanos.explode();
  });
};
