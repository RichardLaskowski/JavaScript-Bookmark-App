document.addEventListener("DOMContentLoaded", function() 
{
    //Listen for form submit
    document.getElementById("bookmarkForm").addEventListener("submit", saveBookmark);
    fetchBookmarks();

    //Save Book mark
    function saveBookmark(e)
    {
        //Get form values
        let siteName = document.getElementById("siteName").value;
        let siteURL = document.getElementById("siteURL").value;

        let bookmark = 
        {
            name: siteName,
            url: siteURL
        }

        /*
        //Local Storage Test
        localStorage.setItem("test", "Hello World");
        console.log(localStorage.getItem("test"));
        localStorage.removeItem("test");
        console.log(localStorage.getItem("test"));
        */

        //Test if bookmarks is null
        if(localStorage.getItem("bookmarks") === null)
        {
            console.log("Bookmarks is null");
            //Init array
            let bookmarks = [];
            //Add to array
            bookmarks.push(bookmark);
            //Set to localStorage
            localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        }
        else
        {
            //Get bookmarks from local storage
            let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
            //Add bookmark that we are submitting to the array
            bookmarks.push(bookmark);
            //Set to localStorage
            localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

        }

        //Prevent form from submitting
        e.preventDefault();
    }

    //Fetch bookmarks
    function fetchBookmarks()
    {
        let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
        console.log(bookmarks);

        //Get output id

        let bookmarksResults = document.getElementById("bookmarksResults");

        bookmarksResults.innerHTML = "";

        for(let i = 0; i < bookmarks.length; i++)
        {
            let name = bookmarks[i].name;
            console.log(name);
            let url = bookmarks[i].url;

            bookmarksResults.innerHTML += '<div class="bookmark">'+
                                            '<h1>' 
                                                +name+ 
                                                '<button>'+
                                                '<a href="'+url+'"'
                                            '</h1>'+
                                            '</div>'
            //to do Finish Writing BookMarks Results
                        console.log(bookmarksResults);
        }
    }   
});