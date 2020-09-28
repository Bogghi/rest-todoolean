// Ciao Ragazzi,
// esercizio di oggi: Todoolean
// repo: rest-todoolean
// L'esercizio di oggi è quello di creare, come fatto in aula, una todo list sulla quale sarà possibile svolgere le operazioni di CRUD, usando qusta Api: http://157.230.17.132:XXXX/todos
// al posto delle "XXXX" ognuno di voi dovrà inserire la propria porta che trovate su questo foglio excel condiviso https://docs.google.com/spreadsheets/d/1IVgldeFWR8Y69GOnZGV0Gypza5EACTS8qzYypFFk5iQ/edit#gid=0
// Consiglio: tenetevi le slide a portata di mano :wink:
// Buon lavoro a domani!

$(document).ready(function(){
    
    taskHandler("lorem")

    // change of icon
    $(".add-task").hover(function () {
            showHide($(this),true);
        }, function () {
            showHide($(this),false);
        }
    );
    
    // 
    $(document).mouseover(function () {
        
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

    $(".add-task i").click(function (e) { 
        
        var text = $("#task").val();
        taskAdd(text);
        
    });

    $(document).on("click",".task .delbox",function(){
        
        var id = $(this).attr("id");
        taskDel(id);

    })

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
            for(var i = 0; i < data.length; i++){
                render(data[i]);   
            }
        },
        error: function (response) { console.log(response); }
    });

}

function taskAdd(taskText) {
    
    $.ajax({
        type: "POST",
        url: "http://157.230.17.132:3006/todos",
        data: {
            "text": taskText
        },
        success: function (response) {
            console.log(response);
            render(response);
        },
        error: function (response) { console.log(response); }
    });

}

function taskDel(id){
    $.ajax({
        type: "DELETE",
        url: "http://157.230.17.132:3006/todos/" + id,
        success: function (response) {
            remove(id);
        }
    });

}

function render(task) {
    var template = Handlebars.compile($("#task-template").html());    
    $(".task-container").append(template(task));
}

function remove(task) {
    $("#"+task).parent().remove();
}