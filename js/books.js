//Book custom element
class Book extends HTMLElement {
    constructor() {
      super();
  
      this.attachShadow({ mode: 'open' });
  
      this.bookCard = document.createElement('bookCard');
      const style = document.createElement('style');
  
      style.innerHTML = `
        * {
          font-family: georgia;
          margin: 0;
          padding: 0;
        }
  
        bookCard {
          display: flex; /* Use flexbox to arrange the items in a row */
          align-items: center; /* Center items vertically */
          padding: 16px;
        }
  
        bookCard > img {
          width: 10%;
          height: auto;
          margin-right: 30px; /* Add some space between the image and text */
        }
  
        .text_container {
          flex: 1; /* Allow the container to grow and take up available space */
          display: flex; /* Use flexbox to arrange the text in a column */
          flex-direction: column; /* Display the elements in a column */
          align-items:flex-start;
          display: block;
        }
  
        /* Custom styles for the link */
        bookCard p.title a {
          color: black;
          text-decoration: none;
          font-weight: none;
          font-size: xx-large;
        }
  
        /* Custom styles for the summary */
        bookCard p.summary {
          color: #70757A;
          font-size: large;
        }
  
        bookCard p.readTime {
          font-family: helvetica;
          color: #70757A;
          font-size: small;
        }
        .line {
          width: 90%;
          height: 1px;
          background-color: lightgrey;
          margin: 0 auto;
      }
      `;
  
  
      this.shadowRoot.append(style, this.bookCard);
}
  
    set data(data) {
      if (!data) return;
  
      const article = this.shadowRoot.querySelector('bookCard');
      this.bookCard.innerHTML = `
        <div class="text_container">
          <p class="title">
            <a>${data.titleTxt}</a>
          </p>
          <p class="author">${data.author}</p>
          <br>
          <p class="summary">${data.summary}</p>  
        </div>
        <img src="${data.imgSrc}">
      `;
    }
  }
  
customElements.define('book-card', Book);
  
//NYTimes API Info 
const apiKey = '3HdZw47h6oimSwCSSFyUUl2EcAEi9FFV';
const apiUrl = `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${apiKey}`;

//FUNCTION: fetches book titles, authors, summaries, and picture URLs from NYTimes API and creates custom Book Elements
async function fetchBookData() {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const books = data.results.lists[0].books;

      const bookContainer = document.createElement('div');

      for (const book of books) {
        const bookElement = document.createElement('book-card');

        const bookData = {
            titleTxt: book.title,
            author: book.author,
            summary: book.description,
            imgSrc: book.book_image,
          };

          bookElement.data = bookData;
          bookContainer.appendChild(bookElement);
        }

        document.body.appendChild(bookContainer);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
}
//FUNCTION: fetches book pictures from provided APIs and adds to imageArray
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
//fetchBookPictures();