var EmployeeList = [];
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

                alert('All fields are required')
            }

        }
        if (status.isValid == true) {

            EmployeeList.push({name, title, ext})
            $("#name").next().text("");
            $("#title").next().text("");
            $("#ext").next().text("");
        }
        console.log(EmployeeList)
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
    console.log(obj)
    console.log(id)
    if (obj[id] == "") {
        $(`#${id}`).next().text("This field is required.");
        $(`#${id}`).css('border-color', 'red')
        this.isValid = false
    } else {
        $(`#${id}`).next().text("");
        $(`#${id}`).css('border-color', 'green')
    }

}



// TODO:
/*
fields in a table are editable, after add table is updates
 */
