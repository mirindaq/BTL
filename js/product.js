$(document).ready(function () {
  $('.radio-sneaker').click(function (state) { 
    document.querySelectorAll('.radio-sneaker').forEach((e) => {
      e.classList.remove('selected');
    });
    document.getElementById('color').innerHTML = state.target.value;
    state.currentTarget.classList.add('selected');
  });

  $(".opimg").on("click", function (state) {
    var thumbImg = document.getElementById("hinhanhminhhoa");
    thumbImg.src = "../img/" + state.target.alt;
    document.querySelectorAll('.opimg').forEach((e) => {
      e.classList.remove('selected');
    });

    state.target.classList.add('selected');
  });

  $(".option-des").click(function (state) {
    document.querySelectorAll('.option-des').forEach((e) => {
      e.classList.remove('active');
    });
    state.currentTarget.classList.add('active');
  });

  $('.option-des').click(function () {
    var targetCollapse = $(this).attr('href');
    $('.collapse.show').not(targetCollapse).collapse('hide');
  });


  $('.form-check-size').click(function (state) {
    let elementSpan = state.currentTarget.children[1];
    if ( !elementSpan.classList.contains('form-check-disable')) {
      let valueChoose = state.currentTarget.children[0].value;
      let sizeChoose = document.getElementById('sizeChoose');
      sizeChoose.innerHTML = valueChoose + " US";

      document.querySelectorAll('.form-check-size').forEach((e) => {
        e.classList.remove('selected-size');
      });

      state.currentTarget.classList.add('selected-size');
    }
  });

  $('.form-check-wait').click(function (state) {
    document.querySelectorAll('.form-check-wait').forEach((e) => {
      e.classList.remove('selected-size');
    });
    state.currentTarget.classList.add('selected-size');
  });


  $('.star').click(function (state) {
    let value = state.currentTarget.value;
    let mangSao = document.querySelectorAll('.star');
    Array.from(mangSao).map((e) => {
      if (e.value <= value) {
        e.children[0].style.color = "black";
      }
      else {
        e.children[0].style.color = "#CCCCCC";
      }
    })
  });
});


