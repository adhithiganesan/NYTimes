const apiKey = '3HdZw47h6oimSwCSSFyUUl2EcAEi9FFV';
const apiUrl = `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${apiKey}`;

function fetchBookData() {
  fetch(apiUrl)
    .then(response => {
      // Check if the response is successful (status 200-299)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const books = data.results.lists[0].books;

      const bookTitles = books.map(book => book.title);
      const bookAuthors = books.map(book => book.author);
      const bookPictureURLS = books.map(book =>book.book_image);
      const bookSummaries = books.map(book => book.description);


      console.log(bookTitles);
      console.log(bookAuthors);
      console.log(bookPictureURLS);
      console.log(bookSummaries);
    })
    .catch(error => {
      console.error('Error fetching data:', book);
    });
}
async function fetchBookPictures(bookPictureURLS) {
    const imageArray = [];
  
    for (const apiUrl of bookPictureURLS) {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch image from ${apiUrl}`);
        }
  
        const blob = await response.blob();
        imageArray.push(blob);
      } catch (error) {
        console.error(error);
      }
    }
  
    return imageArray;
}
  
fetchBookData();
fetchBookPictures();