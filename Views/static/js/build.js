// 1.
function callFromServer() {
  $.ajax({
    'url': "/load",
    'method': "GET"
  }).done(function(data) {
    forEachParse(data)
  })
}


//2. send each JSON to datatable
function forEachParse(data) {
  var arr = new Array()
  //append snp dict to snp array if it contains a tag
  data.forEach(function(event) {
    event.event_date = moment(event.start_datetime).format('MMM DD @ h:mm a');

    // skip if no external emails
    let externalEmailExists = false;
    $.each(event.attendees_list, function(key, value) {
      if (!value.includes('mongodb')) {
        externalEmailExists = true;
      }
    });
    if (!externalEmailExists) {
      return true;
    }
    //

    // new fields
    event.length = moment(event.end_datetime).diff(moment(event.start_datetime), 'minutes');
    event.opportunity = grabCompanyName(event.attendees_list);
    event.prep_time = `<input type="number" class="form-control" placeholder="0" style="width: 5em;" min=0 step=30>`;
    event.actions = `<button class="btn btn-save"> <i class="fa fa-save"></i> </button>`;

    // push
    arr.push(event)
  })
  generateDataTable(arr)
}

function generateDataTable(arr) {
  $(`#example`).DataTable({
    data: arr,
    "paging": false,
    "info": false,
    columnDefs: [{
      "targets": 2,
      "type": "date-eu"
    }],
    aaSorting: [2, "desc"],
    columns: [{
        data: 'title',
        sortable: false
      },
      {
        data: 'creator_email',
        sortable: false
      },
      {
        data: 'attendees_list',
        sortable: false
      },
      {
        data: 'event_date',
        sortable: false,
        className: 'eventDate'
      },
      {
        data: 'length',
        sortable: false
      },
      {
        data: 'opportunity',
        sortable: false,
        className: 'opportunityName'
      },
      {
        data: 'prep_time',
        sortable: false
      },
      {
        data: 'actions',
        sortable: false
      }
    ],
    initComplete: function(settings, json) {
      initButton();
    }
  });
}

function grabCompanyName(emailsArr) {
  var companies = [
    {"url": "navyfederal.org", "company": "Navy Federal"},
    {"url": "k12.com", "company": "K12"},
    {"url": "carlyle.com", "company": "Carlyle"},
    {"url": "astrazeneca.com", "company": "Astra Zeneca"},
    {"url": "janelia.hhmi.org", "company": "Howard Hughes Medical Institute"},
  ]


  var html = ``;
  let foundFlag = false;

    $.each(emailsArr, function(key, email) {
      let emailUrl = email.split('@')[1];

      companies.forEach(function(company) {
        if (company.url == emailUrl){
          if (!foundFlag){
            html += company.company;
          }
          console.log(html)
          foundFlag = true;
        }
      });

    });

    if (html.length == 0){
      html = `
        <select>
          <option disabled selected value> -- select an option -- </option>
          <option>Navy Federal</option>
          <option>Astra Zeneca</option>
          <option>Carlyle</option>
        </select>
      `
    }

  return html;
}

function initButton(){
  $('.btn-save').click(function(){
    toastr["success"]("Event saved!")
   });
}

function initToastr() {
  toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }
}

$(document).ready(function() {
  callFromServer();
  initToastr();
});
