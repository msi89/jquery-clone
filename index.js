$(() => {
  console.log("Document is ready");

  $("h1").css("color", "red");
  $("p").css({
    border: "1px solid green",
    padding: "12px",
    borderRadius: "20px",
  });

  $("#btn").attr("height", 133);

  $("#btn").attr({
    ref: "abc",
    name: "python",
  });

  let hide = false;
  $("#btn").on("click", () => {
    if (hide) {
      $(".container").show();
    } else {
      $(".container").hide();
    }
    hide = !hide;
  });

  $("#btn2").on("click", () => {
    $(".container").height(100);
    $(".container").width(100);
    $("#btn").fadeOut();

    $("section").fadeIn();
  });

  $(".container").each((el, i) => {
    console.log(el);
  });

  $(".container").css("background", "orange");

  /*
  const arr = [1,'salif', 'salama', 55]
  
  $.each(arr,function (item, i){
    console.log(item)
  })
  
  */

  function getTodo(id) {
    $.ajax({
      url: `https://jsonplaceholder.typicode.com/todos/${id}`,
      success: (response) => {
        console.log("response:", response);
      },
      error: (err) => {
        console.error("err:", err);
      },
    });
  }
  getTodo(10);
});

$(document).ready(() => {
  console.log("page ready");
  // get user
  function getUsers() {
    $.http({
      url: "https://jsonplaceholder.typicode.com/users/",
    })
      .then((response) => {
        console.log("response:", response);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  }

  getUsers();
});
