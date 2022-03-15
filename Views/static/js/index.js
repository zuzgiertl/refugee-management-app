function autocomplete() {
  $('#case-search-input').keyup(function() {
    var letters = $(this).val();
    $.ajax({
        url: `/api/case/search?query=${letters}`
      }).done(function(results) {
        // console.log(results)
        // var jsonResults = JSON.parse(results).docs
        // console.log(jsonResults)
        console.log(results)
        render(letters, results)
      })
      .fail(function(err) {
        console.log(err)
      });

  });
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
                <p> <i class="far fa-clock"></i> ${item.status}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="jobs_right">
          <div class="apply_now">
            <a class="heart_mark" href="#"> <i class="fa fa-heart"></i> </a>
            <a href="job_details.html" class="boxed-btn3">Work on Case</a>
          </div>
          <div class="date">
            <p>Date Created ${item.dateCreated.$date}</p>
          </div>
        </div>
      </div>
    </div>
  `
  });
  // place in html
  placholder.append(html);
}


$(document).ready(function() {
  autocomplete();
});
