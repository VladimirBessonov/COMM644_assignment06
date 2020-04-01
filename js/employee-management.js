var EmployeeList = [];

let observe = (obj, fn) => new Proxy(obj, {
    set(obj, key, val) {
        obj[key] = val;
        fn(obj)
        return true
        }
    }
);

arr = observe(EmployeeList, arr => {
    console.log('arr changed! ', arr)
    countEmployees(arr)
    createTableBody(arr)

});
arr.pop()
function createTableBody (arr) {

    let tableBody = document.getElementById('tb')
    if (tableBody) {
        tableBody.innerHTML = '';
        for (row of arr) {
            let tr = document.createElement("tr");
            for (cell in row) {
                let td = document.createElement("td");
                td.innerText = Object.values(row[cell])
                tr.appendChild(td);
            }
            // let btn1 = document.createRange().createContextualFragment('<td><button name="Edit" class="btn btn-primary">Edit</button></td>').firstElementChild
            let btn2 = document.createRange().createContextualFragment('<td><button name="Delete" class="btn btn-danger">Delete</button></td>').firstElementChild
            // let td1 = document.createElement("td")
            let td2 = document.createElement("td")
            // td1.appendChild(btn1);
            td2.appendChild(btn2);
            // tr.appendChild(td1);
            tr.appendChild(td2);
            tableBody.appendChild(tr)

        }
    }

}

function countEmployees (arr) {
    let length = arr.length;
    $('h2 span').text(length)
    console.log('count was called')
    console.log(length)
}

$(document).ready(function(){

    $('#newEmployee').submit( function (event) {
        event.preventDefault()
        let status = {isValid: true};
        let name = {name: $('#name').val().trim()}
        let title = {title: $('#title').val().trim()}
        let ext = {ext: $('#ext').val().trim()}

        let verify = verifyField.bind(status);
        verify(name);
        verify(title);
        verify(ext);

        if (status.isValid == false) {

            if (name.name == "" || title.title == "" || ext.ext == "") {
                $("#name").next().text("Required");
                $("#title").next().text("Required");
                $("#ext").next().text("Required");
                alert('All fields are required')
            }
        }
        if (status.isValid == true) {

            arr.push({name, title, ext})
            $("#name").next().text("");
            $("#name").val("");
            $("#name").attr('style', '');
            $("#title").next().text("");
            $("#title").val("");
            $("#title").attr('style', '');
            $("#ext").next().text("");
            $("#ext").val("");
            $("#ext").attr('style', '');
        }

    })
    $('.employees').click( function (event) {
        const { target } = event;
        let tableBody = document.getElementById('tb')
        if (target.matches('button')) {

            if ( target.name == 'Delete') {
                let row = target.parentElement.parentElement
                let index = Array.prototype.indexOf.call(tableBody.children, row);
                arr.splice(index,1)

            }
            if ( target.name == 'Edit') {
                let row = target.parentElement.parentElement
                let index = Array.prototype.indexOf.call(tableBody.children, row);
                // arr.splice(index,1)
                console.log('function not ready yet')
            }


        }
        if (target.matches('td')) {
            // console.log('td clicked')
        }

    })

});

function verifyField(obj) {
    var id = Object.keys(obj)[0]
    if (obj[id] == "") {
        $(`#${id}`).next().text("This field is required.");
        $(`#${id}`).css('border-color', 'red')
        this.isValid = false
    } else {
        $(`#${id}`).next().text("");
        // $(`#${id}`).css('border-color', 'green')
    }

}


