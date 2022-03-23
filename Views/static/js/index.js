function autocomplete() {
  let input = $('#case-search-input')
  input.keyup(function() {
    var letters = $(this).val();
    serve(letters)
  });

  if (input.val.length > 0){
    serve(input.val())
  }

  function serve(letters){
    $.ajax({
        url: `/api/case/search?query=${letters}`
      }).done(function(results) {
        // console.log(results)
        render(letters, results)
      })
      .fail(function(err) {
        console.log(err)
      });
  }
}


function render(letters, results) {
  var placholder = $('.case-list-placeholder');
  placholder.empty();

  // update search query
  // $('#search-query').html(letters)
  let html = '';
  $.each(results, function(index, item) {

    // let doc = item.document;

    html += `
    <div class="col-lg-12 col-md-12">
      <div class="single_jobs white-bg d-flex justify-content-between">
        <div class="jobs_left d-flex align-items-center">
          <div class="thumb">
            <img src="../static/img/icon/1.svg" alt="">
          </div>
          <div class="jobs_conetent">
            <a href="/case/${item.caseNumber}">
              <h4>${item.refugeeName}</h4>
            </a>
            <div class="links_locat d-flex align-items-center">
              <div class="location">
                <p> <i class="fas fa-map-marker-alt"></i> ${item.currentLocation.city}</p>
              </div>
              <div class="location">
                <p>
                  <i class="ti-arrow-right"></i>
                </p>
              </div>
              <div class="location">
                <p> <i class="fas fa-map-marker-alt"></i> ${item.destinationLocation.city}</p>
              </div>
              <div class="location">
                <p> placeholder </p>
              </div>
            </div>
          </div>
        </div>
        <div class="jobs_right">
          <div class="apply_now">
            <a href="#" class="boxed-btn3">${item.status}</a>
          </div>
          <div class="date">
            <p>${item.dateCreated.$date}</p>
          </div>
        </div>
      </div>
    </div>
  `
  });
  // place in html
  placholder.append(html);

}


function searchResource() {
  let input = $('#resource-search-input')
  input.keyup(function() {
    var letters = $(this).val();
    serve(letters)
  });

  if (input.val.length > 0){
    serve(input.val())

  }

  function serve(letters){
    $.ajax({
        url: `/api/resource/search?query=${letters}`
      }).done(function(results) {
        // console.log(results)
        renderResources(results)
      })
      .fail(function(err) {
        console.log(err)
      });
  }
}


function renderResources(results) {
  var placholder = $('.resource-list-placeholder');
  placholder.empty();
  console.log("hot here")
  let html = '';
  $.each(JSON.parse(results).docs, function(index, item) {

    // let doc = item.document;

    html += `
    <div class="col-lg-12 col-md-12">
      <div class="single_jobs white-bg d-flex justify-content-between">
        <div class="jobs_left d-flex align-items-center">
          <div >
            <a  href="/resource/${item.website}">
              <h4>${item.category}</h4>
            </a>
            <div class="links_locat d-flex align-items-center">
              <div class="location">
                <p> <i class="fas fa-map-marker-alt"></i> ${item.spotlight}</p>
              </div>
              <div class="location">
                <p>
                  <i class="ti-arrow-right"></i>
                </p>
              </div>
              <div class="location">
                <p> <i class="fas fa-info"></i> ${item.additionalDetails}</p>
              </div>
              <div class="location">
                <p> <i class="bi bi-check-circle-fill"></i> ${item.verified}</p>
                <div class="date">
                <p>Date Created ${item.dateVerified.$date}</p>
              </div>
              </div>
            </div>
          </div>
        </div>
        <div class="jobs_right">
          <div class="apply_now">
            <a class="heart_mark" href="#"> <i class="bi bi-heart"></i>${item.reputation.likes} </a>
          </div>

        </div>
      </div>
    </div>
  `
  });
  // place in html
  placholder.append(html);

}

//   $(document).ready(function() {
//     autocomplete();
//   });

document.addEventListener('DOMContentLoaded', function () {

  autocomplete();
  searchResource();


})

