//list of data
let tasks = [
  {
    id: 0,
    title: "Doing Laundary",
    dueDate: new Date (2020,1,28),
    completed : false,
    completeDate : null,
    createdDate: new Date (2020,1,23),
    deleted:false,
    note:"I need to get quarters first at Kroger."
  },
  {
    id: 1,
    title: "CS3744 Assignment 3",
    dueDate: new Date (2020,2,17),
    completed : false,
    completeDate : null,
    createdDate: new Date (2020,1,24),
    deleted:false,
    note:"I better start early cuz it looks pretty complicated.\r\nLooks like I have to read w3schools.com a lot."
  },
  {
    id: 2,
    title: "Getting AAA batteries",
    dueDate: null,
    completed : true,
    completeDate : new Date (2020,2,1),
    createdDate: new Date (2020,1,26),
    deleted:false,
    note:"for my remote control."
  },
  {
    id: 3,
    title: "Booking a flight ticket ACM CHI conference",
    dueDate: new Date (2020,3,15),
    completed : false,
    completeDate : null,
    createdDate: new Date (2020,2,26),
    deleted:false,
    note:"I would have to book a flight ticket to ACM CHI conference.\r\nKeep an eye on the cancellation policy. the conference may be cancelled due to the cornoa virus outbreak. :( Although flight tickets are getting cheaper."
  }
];
//when document is ready
$(document).ready(function(){
 
  $("table > tbody").empty();
  fetcher(tasks);
  
  $(".addtask").click(function(){
    $("#myModal").modal();
    var len = tasks.length;
    $(".modal-footer button:nth-child(2) ").click(function(){
     
          let intitle = $("#task-title").val();
          let duedat = $("#due-date").val();
            let parser = new Date(Date.parse(duedat));
            let notes = $("#task-note").val().replace(/\r\n|\r|\n/g,"<br />");
            if (intitle == "")
            {
               alert("Enter your title");
            }
            if (isNaN(parser)){
               alert("You entered the wrong format");
            }
            if (notes == ""){
              alert("Enter the note");
            }
            if (intitle != "" && !isNaN(parser) && notes != ""){
              $("#myModal").modal('hide');
              tasks[len] = ({id: len, title: intitle, dueDate: parser, completed:false, completeDate:null, creadtedDate:new Date(), deleted: false, note: notes});
              let month = tasks[len].dueDate.getMonth();
              let date = tasks[len].dueDate.getDate();
              let year = tasks[len].dueDate.getFullYear(); 
              date = String(date).padStart(2, '0');
              month = String(month + 1).padStart(2, '0'); 
              let formater  = month + "/" + date + "/" + year;
              console.log(tasks);
              $("table > tbody").empty();
              fetcher(tasks);
              let susu = `#${len}  td:nth-child(4)`
              $(susu).html(`<center><td class="text-center">${formater}</td><center>`)
              len++;
               
            }              
    });
  })
  $("#deleteCompletedTasks").click(function(){
      var count = document.getElementsByClassName("success").length;
      var r = confirm(`Do you want to delete ${count} tasks`);
      if (r == true) {
          $(".success").hide();
      }
       else {
        console.log("cancel delete");
      }
    });
    $("#overdue").click(function(){
      var clicks = $("#overdue").data('clicks');
        if (clicks) {
          $("#overdue").removeClass("active");
          $(".default").show();
          $(".success").show();
          $(".danger").show();
   // odd clicks
          } else {
            $("#overdue").addClass("active")
            $(".default").hide();
            $(".success").hide();
            $(".danger").show();             
   // even clicks
      }
      $("#overdue").data("clicks", !clicks);       
    });
    $("#hidecompleted").click(function(){
      var clicks = $(this).data('clicks');
      if(clicks){
        $("#hidecompleted").removeClass("active");
        $(".success").show();
        $(".default").show();
      }
      else{
      $("#hidecompleted").addClass("active");
      $(".success").hide();
      $(".default").show();
      }
      $(this).data("clicks", !clicks);
    });
});
let fetcher = (data) => {
  if (data !== null){
    //setting format
    let format;
    let today;
    let mmm, ddd, yyy;
    let count;
    
    for (var i = 0; i < data.length; i++){
      
      let titi = data[i].title;
      let deletee = data[i].deleted;
      if (data[i].dueDate != null){
          let month = data[i].dueDate.getMonth();
          let date = data[i].dueDate.getDate();
          let year = data[i].dueDate.getFullYear(); 
          if(date < 10 ){
            date = "0" + date;
          }
          if (month < 10){
            month = "0" + month;
          }
          format  = month + "/" + date + "/" + year;
      }
      else {
          format = "";
        } 
      if (data[i].completeDate !== null && data[i].completed === true){
           mmm = data[i].completeDate.getMonth();
           ddd = data[i].completeDate.getDate();
           yyy = data[i].completeDate.getFullYear(); 
           if(mmm < 10 ){
            mmm = "0" + mmm;
          }
          if (ddd < 10){
            ddd = "0" + ddd;
          }
          today  = mmm + "/" + ddd + "/" + yyy;
      }
      else {
        today = "";
      } 
      //fetching data
      if (data[i].deleted != true){
          $("table > tbody").append(`<tr id="${i}" class="default">
          <td class="text-center"><input type="checkbox" class="form-check-input" value="${i}"></td>
          <td class="text-center">${titi}</td>
          <td class="text-center"><span class="text-right"><button class="btn btn-xs btn-warning" data-toggle="collapse" data-target="#note-${i}"><span class="glyphicon glyphicon-triangle-bottom"> </span> Note</button></span></td>
          <td class="text-center">${format}</td>
          <td class="text-center">${today}</td>
          <td class="text-center"><button type="button" class="btn btn-danger btn-xs deletetask" alt="Delete the task" value="${i}"><span class="glyphicon glyphicon-trash"></span></button>        
          <a target="_blank" href="mailto:?body=${data[i].note}.&amp;subject=${data[i].title}"><button type="button" class="btn btn-danger btn-xs emailtask" alt="Send an email" value="0"><span class="glyphicon glyphicon-envelope"></span></button></a>      </td>
          </tr>`);
          $("table > tbody").append(`<tr id="note-${i}" class="collapse">
          <td></td>
          <td colspan="5" style="">
              <div class="well">
                  <h3>${data[i].title}</h3>
                  <div>
                    ${data[i].note}
                  </div>
              </div>
          </td>
      </tr>`);
      } 
      //dealing with check box
      let selector = `input[type=checkbox][value=${i}]`
      let id = `#${i}`
      let tdd = `#${i}  td:nth-child(2)`
      let cplt = `#${i}  td:nth-child(5)`
      let status = data[i].completed;
      var duee = data[i].dueDate;
      var current = new Date();
      if (data[i].completed == true){
        $(tdd).html(`<del><td class="text-center">${titi}</td></del>`);
        $(id).removeClass();
        $(id).toggleClass("success");
        $(selector).prop('checked', true);
        count++;
      }
      if (duee < current && data[i].completed ==false){
          $(id).toggleClass("danger");
      }
      $(selector).click(function(){
      if($(this).is(":checked")){
          status = true;
          $(id).removeClass();
          $(id).addClass("success");
          $(tdd).html(`<del><td class="text-center">${titi}</td></del>`);        
          today = new Date();
          ddd= String(today.getDate()).padStart(2, '0');
          mmm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          yyy= today.getFullYear();
          today = mmm + '/' + ddd + '/' + yyy;
          $(cplt).html(`<center><td class="text-center">${today}</td></center>`)
          count++;
        }
      else if($(this).is(":not(:checked)")){
              status = false;
              $(id).removeClass();
              $(tdd).html(`<center><td class="text-center">${titi}</td></center>`);  
              today = "";
              $(cplt).html(`<center><td class="text-center">${today}</td></center>`);
              count++;
       }
      });
      let dele = `button[type=button][value=${i}]`
      $(dele).click(function(){
        var r = confirm(`Are you sure?`);
        if (r == true) {
           $(id).remove();
           deletee = true;
        } else {
             console.log("cancel delete");
             deletee = false;
        }
      });   
    }
  }
}






 