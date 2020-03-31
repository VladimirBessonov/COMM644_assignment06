var EmployeeList = [];

var tableBody = document.getElementsByTagName('tbody')

let observe = (obj, fn) => new Proxy(obj, {
    set(obj, key, val) {
        obj[key] = val;
        fn(obj)
        return true
        }
    }
);

arr = observe(EmployeeList, arr => {
    // console.log('arr changed! ', arr)
    createTableBody(arr)
    console.log('in proxi call')
});


function createTableBody (arr) {
    let tableBody = document.getElementById('tb')
    console.log(tableBody)
    console.log(arr)
    for (row of arr) {
        let tr = document.createElement("tr");
        for (cell in row) {
            let td = document.createElement("td");
            td.innerText = row[cell]
            console.log(cell, row[cell])
            tr.appendChild(td);
        }
        console.log('row ',row)
        tableBody.appendChild(tr)
    }

    // for (i =0; i < arr.length; i++) {
    //     console.log(arr[i])
    //     let tr = document.createElement("tr");
    //     for (j =0; j < arr[i].length; j++) {
    //         console.log(arr[i][j])
    //         let td = document.createElement("td");
    //         td.innerText = arr[i][j]
    //         console.log('cell',td)
    //         tr.appendChild(td);
    //     }
    //     console.log('row',tr)
    //     tableBody.appendChild(tr)
    // }

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
            console.log(EmployeeList)
        }

    })
    $('.employees').click( function (event) {
        const { target } = event;
        if (target.matches('button')) {
            console.log('button is clicked')
        }
        if (target.matches('td')) {
            console.log('td clicked')
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


