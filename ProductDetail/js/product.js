$(document).ready(function () {
  var productList = JSON.parse(localStorage.getItem("products"));
  var idProduct = parseInt(localStorage.getItem("idProduct"));
  var product = productList.filter(item => item.id ==idProduct)[0];
  const loadData = () => {
    // Hình ảnh và tên sản phẩm 
    $("#hinhanhminhhoa").attr("src",`../../Common/img/${product.thumbnail[0]}`);
    var htmlOptionImage =``;
    product.thumbnail.forEach((item, index) => {
      htmlOptionImage += `<div class="box-item mb-2">
                            <img style="border-bottom: 2px solid transparent;box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;" src="../../Common/img/${item}" class="opimg ${index == 0 ? 'selected' : ''}" alt="../../Common/img/${item}">
                          </div>`
    })
    if(product.sale > 0){
      $("#sale").addClass("d-block");
      $("#price").html(`<span class="old">$${product.price}</span>
                        <span class="new">$${(product.price * (1-product.sale/100)).toFixed(0)}</span>
                        <span>(In stock)</span>`)
    }
    else{
      $("#sale").addClass("d-none");
      $("#price").html(`<span class="price-only">$${product.price}</span>
                        <span>(In stock)</span>`)                  
    }
    $("#optionImage").html(htmlOptionImage);
    $("#categoryName").text(product.category);
    $("#productName").text(product.name);
    $("#color").text(product.color);

  }
  const loadReviews = () =>{
     // Bình luận
    var reviewList = JSON.parse(localStorage.getItem("reviews"));
    var reviewsByProduct = reviewList.filter(item => item.productId == idProduct);
    $(".review-count").each(function(){
      $(this).text(`Reviews (${reviewsByProduct.length})`)
    })
    var htmlReview = ``;
    reviewsByProduct.forEach(item => {
      htmlReview += `<div class="mb-4 box-review">
                      <div style="padding: 40px 0px;">
                        <div class="row g-0">
                          <!--Avt-->
                          <div class="col-12 col-md-auto">
                            <div class="d-flex mb-3">
                              <span class="rounded-circle box-avt"><i class="fa-solid fa-user"
                                  style="color : #CCCCCC; font-size: 30px"></i></span>
                            </div>
                          </div>
                          <!--Review Info-->
                          <div class="col-12 col-md">
                            <div class="row mb-4">
                              <div class="col-12 d-flex align-items-center">
                                <div class="d-flex justify-content-center align-items-center">
                                `
    for(let i=0;i<item.rate;i++){
      htmlReview += `<i class="fa fa-star "></i>`
    }
                    htmlReview+=                              
                                `
                                </div>
                              </div>
                              <div class="col-12">
                                <span class="fs-xs text-muted">${item.userName}, ${item.time}</span>
                              </div>
                            </div>
                            <h5 class="mb-2" style="font-size: 18px;">${item.title}</h5>
                            <p class="text-gray-500 mb-5">${item.comment}.
                            </p>
                            <div class="row align-items-center justify-content-center">
                              <div class="col-auto d-none d-lg-block">
                                <p class="mb-0 fs-sm">Was this review helpful?</p>
                              </div>
                              <div class="col-auto me-auto">
                                <div class="rate">
                                  <a class="rate-item" role="button">
                                    <i class="fa-regular fa-thumbs-up"></i>
                                    <span class="like-count p-2">0</span>
                                  </a>
                                  <a class="rate-item" role="button">
                                    <i class="fa-regular fa-thumbs-down"></i>
                                    <span class="dislike-count p-2">0</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>`
    })
    $("#review").html(htmlReview);
  }
  loadData();
  loadReviews();
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
    $(this).closest("ul").attr("data-star",value);
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

  // Post comment
  $("#postReview").click(function(e){
    e.preventDefault();
    var user = localStorage.getItem("user");
    if(user == null){
      window.location = "../../SignIn/html/SignIn.html"
    }
    else{
      user = JSON.parse(user);
      console.log(user);
      var reviewList = JSON.parse(localStorage.getItem("reviews"));
      var name = $("#nameReview").val()
      var email = $("#emailReview").val()
      var title = $("#titleReview").val()
      var comment = $("#areaReview").val()
      var rate = parseInt($("#stars").attr("data-star"));
      const review = {
        id: reviewList.length + 1,
        userName : user.firstName + " " + user.lastName,
        productId : parseInt(JSON.parse(localStorage.getItem("idProduct"))),
        rate: rate,
        time : new Date().toLocaleDateString(),
        title : title,
        comment : comment
      }
      reviewList.push(review);
      localStorage.setItem("reviews", JSON.stringify(reviewList));
      $("#comment").removeClass("show");
      alert("Đánh giá thành công");
      loadReviews();
    }
  })
});


