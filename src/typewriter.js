$(document).ready(function () {
  let typedString = document.getElementById("typedString");

  let typewriter = new Typewriter(typedString, {
    loop: false,
  });

  typewriter
    .pauseFor(500)
    .typeString(
      '<span class="custom-text-shadow">Budi izvrstan u onom što vidiš!</span>'
    )
    .pauseFor(300)
    .deleteChars(6)
    .typeString('<span class="custom-text-shadow">voliš.</span>')
    .pauseFor(300)
    .typeString(
      '</br><span class="customColorGradient custom-text-shadow">ZAISKRI</span>.'
    )
    .start();
});
