/***
 *  Pagination and content filter
 * Problem: site displays all users, only 10 should be displayed at once. No search functionality.
 * Solution: limit the number of students displayed at once to 10 and add pagination links below the list. Add search.
 */

(function() { 

var current_page = 1;
var records_per_page = 10;
// var students 
function prevPage() {
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}

function nextPage() {
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
}
    
function changePage(page) {
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var student_list = document.getElementById("student_list");
    var page_span = document.getElementById("pagini");
 
    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    student_list.innerHTML = "";

    var template = document.getElementById("studentTemplate").innerHTML;

    for (let count = (page-1) * records_per_page; count < (page * records_per_page) && count < students.length; count++) {
         student_list.innerHTML +=template.replace("{studentsAvatarUrl}", students[count].avatar_url)
                                          .replace("{studentsLogin}" , students[count].login)
                                          .replace("{studentsHtmlUrl}" , students[count].html_url)
                                          .replace("{studentsId}" , students[count].id );                          
    }

    page_span.innerHTML = page + "/" + numPages();

    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page == numPages()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
}

function numPages() {
    return Math.ceil(students.length / records_per_page);
}

window.onload = function() {
    changePage(1);
}

})();

/**
 * Creates the search component
*/

function makeQuery(property, regexp) {
        // return a callback function for filter, see MDC docs for Array.filter
        return function(elem, index, array) {
            return elem[property].search(regexp) !== -1;
        }
    }


function searchSTUD() {
    var student_list = document.getElementById("student_list");
    student_list.innerHTML ='';
    var searchValue = document.getElementsByTagName("input")[0].value;
    var replace = "^"+ searchValue;
    var inputValue = new RegExp(replace,"i");
     
    var q = makeQuery('login', inputValue);
    var s = students.filter(q);s
    //return 
    var template = document.getElementById("studentTemplate").innerHTML;
    if(s.length >0){
        for (let count = 0 ; count<s.length; count++) {
             student_list.innerHTML +=template.replace("{studentsAvatarUrl}", s[count].avatar_url)
                                               .replace("{studentsLogin}" , s[count].login)
                                               .replace("{studentsHtmlUrl}" , s[count].html_url)
                                               .replace("{studentsId}" , s[count].id );
        }
    } else {
           student_list.innerHTML +=  'No results found';
    }
                
 }





