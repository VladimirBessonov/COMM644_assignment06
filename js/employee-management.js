$(document).ready(function(){

    // create observed object
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
        countEmployees(arr)
        createTableBody(arr)
        console.log(arr)
    });

// create table - iterate EmployeeList and create table rows
    function createTableBody (arr) {

        let tableBody = document.getElementById('tb')
        // if (tableBody.childElementCount !==0 ) {
            tableBody.innerHTML = '';
            for (row of arr) {
                let tr = document.createElement("tr");
                for (cell in row) {
                    let td = document.createElement("td");
                    let input = document.createElement('input')
                    input.setAttribute("type", "text");
                    input.setAttribute('value', `${Object.values(row[cell])}`)
                    input.disabled = true;
                    // td.innerText = Object.values(row[cell])
                    td.appendChild(input)
                    tr.appendChild(td);
                }
                // no idea why createRange cannot creete <td><button>, <td><button><button/><tb/> will produce only <button><button/>
                let btn1 = document.createRange().createContextualFragment('<button name="Edit" class="btn btn-primary">Edit</button>')
                let td1 = document.createElement("td")
                let btn2 = document.createRange().createContextualFragment('<button name="Delete" class="btn btn-danger">Delete</button>')
                let td2 = document.createElement("td")
                td1.appendChild(btn1);
                td2.appendChild(btn2);
                tr.appendChild(td1);
                tr.appendChild(td2);
                tableBody.appendChild(tr)

            }
        }

    // }

 // count number of employees in the list
    function countEmployees (arr) {
        let length = arr.length;
        $('h2 span').text(length)
    }
// initial value for the counter of employees and add  employee
    $('h2 span').text('0')
    arr.push({name: {name: 'Vladimir Bessonov'}, title: {title: 'Software engineer'}, ext: {ext: '123456'}},{name: {name: 'XXXXXXXX'}, title: {title: 'Software engineer'}, ext: {ext: '123456'}})

// add new employee to the Table

    $('#newEmployee').submit( function (event) {
        event.preventDefault()
        let status = {isValid: true};
        let name = {name: $('#name').val().trim()}
        let title = {title: $('#title').val().trim()}
        let ext = {ext: $('#ext').val().trim()}
// add status to vefiry scope
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
            console.log({name, title, ext})
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

                let trows = $('tbody tr')
                let inputs = trows[index].querySelectorAll('input')
                inputs.forEach( el => el.disabled = false)
                target.textContent = 'Save'
                target.name = 'Save'

            } else if ( target.name == 'Save') {
                let row = target.parentElement.parentElement
                let index = Array.prototype.indexOf.call(tableBody.children, row);

                let trows = $('tbody tr')
                let inputs = trows[index].querySelectorAll('input')
                let validInputs = true
                inputs.forEach( el => {

                    if (el.value == '') {
                        validInputs = false
                    }
                })

                if (validInputs) {
                    inputs.forEach( el => el.disabled = true)
                    target.textContent = 'Edit'
                    target.name = 'Edit'
                    arr[index] = {name : {name: inputs[0].value}, title: {title: inputs[1].value}, ext : {ext: inputs[2].value}}

                }


            }


        }
        if (target.matches('td')) {
            // console.log('td clicked')
        }

    })

});
// not good solution: this function complicates the data structure of EmloyeeList, example EmloyeeList = [ { name: {name: 'Vladimir'}, title: {title: 'SW engineer', ext: {ext: 123456}}, {}, ...]
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


