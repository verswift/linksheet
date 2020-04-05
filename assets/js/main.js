// listen for form submission
// form id is add site

// get the form and add an event listener to the button of type submit, the
// when the button is pressed, the function saveWebsite will be called.
document.getElementById('add_site').addEventListener('submit', saveBookmarks);

// save the bookmark
function saveBookmarks(e)
{
  e.preventDefault();

  // prevent the default behaviour of the form - i.e. just submitting

  //get the form values
  var siteName = document.getElementById('siteName').value;
  var siteURL = document.getElementById('siteURL').value;

  if(!siteName || !siteURL)
  {
    alert("Fields cannot be left blank.");
    return false;
  }

  if(!validateURL(siteURL)) return false;

  // array of objects
  var bookmark = {
    name: siteName,
    url: siteURL
  }
  // you want to remove the entire array of bookmakrks
  //localStorage.removeItem('test');

  // need to initialise the array of bookmarks
  if(localStorage.getItem('bookmarks') == null)
  {
    var bookmarks = [];
    bookmarks.push(bookmark);
    // JSON.stringify takes json array and turns it into string before saving
    // to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // there are bookmarks already present
  else
  {
    // JSON.parse turns string back to json
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // add the submitted bookmark to the array
    bookmarks.push(bookmark);
    // set it back to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  // ater a bookmark is added, they should be refeteched so that
  // the correct ones are displayed.
  fetchBookmarks();

  // clear the form
  document.getElementById('add_site').reset();
}


function validateURL(siteURL)
{
  // check that the url is valid by using regular expression
  var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);
  if (!siteURL.match(regex))
  {
    alert("Please check that the URL is valid.");
    return false;
  }
  // otherwise return true
  return true;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function deleteBookmark(url)
{
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  for(var i = 0; i < bookmarks.length; i++)
  {
    if(url == bookmarks[i].url)
    {
      bookmarks.splice(i, 1);
      break;
    }
  }
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // ater a bookmark is deleted, they should be refeteched so that
  // the correct ones are displayed.
  fetchBookmarks();
}

function fetchBookmarks()
{
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // get output id
  var bookmarksResults = document.getElementById('bookmarksResults');

  bookmarksResults.innerHTML = '';
  for(var i = 0; i < bookmarks.length; i++)
  {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="col-md-6 col-xl-3 mb-4">' +
    // for random colours insert this bit of code
    // style = "background-color: rgba('+getRandomInt(0,255)+','+getRandomInt(0,255)+','+getRandomInt(0,255)+','+0.25+' );"
        '<div class="card shadow-sm border-left-primary py-2">' +
            '<div class="card-body">' +
                '<div class="row align-items-center no-gutters">' +
                    '<div class="col-auto"><a class="btn btn-danger bg-secondary border-secondary btn-circle ml-1" role="button" onclick="deleteBookmark(\''+url+'\')" ><i class="fas fa-trash text-white"></i></a></div>' +
                    '<div class="col mr-2">' +
                        '<div class="text-dark d-xl-flex justify-content-xl-center align-items-xl-center font-weight-bold h5 mb-0"><span class="text-center d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center">'
                        +name+'</span></div>' +
                    '</div>' +
                    '<div class="col-auto"><a class="btn btn-success bg-secondary border-secondary btn-circle ml-1" role="button" target="_blank" href='+url+'><i class="fas fa-globe-americas text-white"></i></a></div>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>';
  }
}
