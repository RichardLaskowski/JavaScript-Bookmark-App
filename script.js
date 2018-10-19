document.addEventListener("DOMContentLoaded", function() 
{
    //Listen for form submit
    document.getElementById("bookmarkForm").addEventListener("submit", saveBookmark);
    //Listen for body reload
    document.body.onload = fetchBookmarks();
});

//Save Bookmark
function saveBookmark(e)
{
    //Get form value siteName
    let siteName = document.getElementById("siteName").value;
    //Get form value siteURL
    let siteURL = document.getElementById("siteURL").value;

    if(!validateForm(siteName, siteURL))
    {
        return false;
    }

    /*
        After passing validation siteURL and siteName are saved
        into a bookmark object.
    */
    let bookmark = 
    {
        name: siteName,
        url: siteURL
    }

    //Test if bookmarks is null.
    if(localStorage.getItem("bookmarks") === null)
    {
        console.log("Bookmarks is null");
        //Init array.
        let bookmarks = [];
        //Add entered bookmark into bookmarks array.
        bookmarks.push(bookmark);
        //Set to localStorage.
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
    else
    {
        //Get bookmarks from local storage
        var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
        //Add bookmark that we are submitting to the array
        bookmarks.push(bookmark);
        //Set to localStorage
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }

    //Clear Form
    document.getElementById('bookmarkForm').reset();

    //Fetchbookmarks after updating bookmark list
    fetchBookmarks();

    //Prevent form from submitting
    e.preventDefault();
}


//Fetch bookmarks
function fetchBookmarks()
{
    //Get bookmarks from localStorage
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    console.log(bookmarks);

    //Get output id
    let bookmarksResults = document.getElementById("bookmarksResults");

    bookmarksResults.innerHTML = '';

    for(let i = 0; i < bookmarks.length; i++)
    {
        let name = bookmarks[i].name;
        let url = bookmarks[i].url;
        // console.log(url);
        bookmarksResults.innerHTML += 
        '<div class="bookmark">'+
            '<h1>'+name+'</h1>'+
            '<a href="'+url+'">Visit</a>'+ 
            '<a class="deleteButton" onclick="deleteBookmark(\''+url+'\')">Delete</a>'+ 
        '</div>';
    }
} 

//Delete Bookmark
function deleteBookmark(url)
{
    //Get bookmarks from LocalStorage
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    // Loop through bookmarks
    for(let i = 0; i < bookmarks.length; i++)
    {
        if(bookmarks[i].url == url)
        {
            bookmarks.splice(i, 1);
        }
    }

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    fetchBookmarks();
}

function validateForm(siteName, siteURL)
{

    //regular expression definition
    let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    //regular expression object
    let regex = new RegExp(expression);

    /*
        Validation that checks if siteName or siteURL value is null.
        If either value is null validation returns false and the form 
        does not submit.
    */ 
   if(!siteName || !siteURL)
   {
       alert('Please fill in the form');
       return false;
   }

   /*
       Validation that checks if a valid URL string was entered.
       If an invalid URL string is entered validation returns false
       and the form does not submit.
   */
   if(!siteURL.match(regex))
   {
       alert('Please use a valid URL');
       return false;
   }

   return true;
}