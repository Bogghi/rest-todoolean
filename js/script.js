// Ciao Ragazzi,
// esercizio di oggi: Todoolean
// repo: rest-todoolean
// L'esercizio di oggi è quello di creare, come fatto in aula, una todo list sulla quale sarà possibile svolgere le operazioni di CRUD, usando qusta Api: http://157.230.17.132:XXXX/todos
// al posto delle "XXXX" ognuno di voi dovrà inserire la propria porta che trovate su questo foglio excel condiviso https://docs.google.com/spreadsheets/d/1IVgldeFWR8Y69GOnZGV0Gypza5EACTS8qzYypFFk5iQ/edit#gid=0
// Consiglio: tenetevi le slide a portata di mano :wink:
// Buon lavoro a domani!

$(document).ready(function(){
    
    taskHandler("lorem")

    $(".add-task").hover(function () {
            showHide($(this),true);
        }, function () {
            showHide($(this),false);
        }
    );
    
    $(".task-container").mouseover(function () {
        $(".task .checkbox").hover(function () {
                // over
                showHide($(this),true);
            }, function () {
                showHide($(this),false);
            }
        );

        $(".task .delbox").hover(function () {
                // over
                showHide($(this),true);
            }, function () {
                showHide($(this),false);
            }
        );
    });

});

function showHide(obj, dir) {
    if(dir){
        obj.find(".far").hide();
        obj.find(".fas").show();
    }else if(!dir) {
        obj.find(".fas").hide();
        obj.find(".far").show();
    }
}

function taskHandler (params) {
    
    $.ajax({
        type: "GET",
        url: "http://157.230.17.132:3006/todos",
        success: function (data, status) {
            console.log(data);
            render(data);
        },
        error: function (response) { console.log(response); }
    });
}

function render(task) {
    var template = Handlebars.compile($("#task-template").html());    
    
    var data = {
        "task": task
    };

    $(".task-container").append(template(data))

}