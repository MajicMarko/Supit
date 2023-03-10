const token = localStorage.getItem("token");
const uname = $("input[name='uname']").val();

$(document).ready(function () {
  $("#navbar").load("navbar.html");
  $("#footer").load("footer.html");

  $("#image").click(makeFullscreen);
  $("form").submit(registerForm);
  $("form").submit(loginForm);
});

function logout(event) {
  event.preventDefault();
  localStorage.removeItem("token");
  window.location.reload();
}

function registerForm(event) {
  event.preventDefault();

  const uname = $("input[name='username']").val();
  const psw = $("input[name='psw']").val();
  const data = {
    username: uname,
    password: psw,
  };
  console.log(data);
  $.ajax({
    type: "POST",
    url: "https://www.fulek.com/data/api/user/register",
    data: JSON.stringify(data),
    contentType: "application/json",
    success: function (response) {
      console.log("Success:", response, data);
      window.location.href = "Prijava.html";
    },
    error: function (error) {
      console.error("Error:", error);
    },
  });
}

function loginForm(event) {
  event.preventDefault();

  const uname = $("input[name='uname']").val();
  const psw = $("input[name='psw']").val();
  const data = {
    username: uname,
    password: psw,
  };

  $.ajax({
    type: "POST",
    url: "https://www.fulek.com/data/api/user/login",
    data: JSON.stringify(data),
    contentType: "application/json",
    success: function (response) {
      console.log("Success:", response);

      if (response.statusCode === 200) {
        $("#msg").text("Uspjesna prijava :) Na pocetnu stranicu 3,2,1...");
        localStorage.setItem("token", response.data.token);
        setTimeout(function () {
          $(location).attr("href", "pocetna.html");
        }, 3000);
      } else {
        $("#msg").text("User not found.");
      }
    },
    error: function (error) {
      console.error(error);
    },
  });
}

function makeFullscreen() {
  this.requestFullscreen();
}
