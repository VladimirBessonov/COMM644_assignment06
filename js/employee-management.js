var EmployeeList = [];

var tableBody = document.getElementsByTagName('tbody')

let observe = (obj, fn) => new Proxy(obj, {
    set(obj, key, val) {
        obj[key] = val;
        fn(obj)
        // createTableBody(EmployeeList)
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
    for (i =0; i < arr.length; i++) {
        console.log(arr[i])
        var tr = document.createElement("tr");
        for (j =0; j < arr[i].length; j++) {
            console.log(arr[i][j])
            var td = document.createElement("td");
            td.innerText = arr[i][j]
            tr.appendChild(td);
        }
        tableBody[0].appendChild(tr)
    }
    console.log(tableBody[0])
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


