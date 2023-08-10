//Book custom element
class Book extends HTMLElement {
    constructor() {
    //super() called to call constructor of parent class (HTMLElement) so custom web component inherits all properties/methods of parent class
      super();
        
      //create shadowDOM for custom element to manipulate it using JS
      this.attachShadow({ mode: 'open' });
  
      this.bookCard = document.createElement('bookCard');
      const style = document.createElement('style');
  
      //styling for book card
      style.innerHTML = `
        * {
          font-family: georgia;
          margin: 0;
          padding: 0;
        }
  
        bookCard {
          display: flex; /* Use flexbox to arrange the items in a row */
          align-items: center; 
          padding: 16px;
        }
  
        bookCard > img {
          width: 10%;
          height: auto;
          margin-right: 30px;
        }
  
        .text_container {
          flex: 1; 
          display: flex; /* Use flexbox to arrange the text in a column */
          flex-direction: column; /
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
  
      //attaching bookCard custom element and styling to shadowDOM
      this.shadowRoot.append(style, this.bookCard);
    }

    //setting data of custom element
    set data(data) {
        if (!data) return;
    
        this.bookCard = this.shadowRoot.querySelector('bookCard');
        //update bookCard's innerHTML
        this.bookCard.innerHTML = `
            <div class="text_container">
            <p class="title">
                <a>${data.bookTitle}</a>
            </p>
            <p class="author">${data.author}</p>
            <br>
            <p class="summary">${data.summary}</p>  
            </div>
            <img src="${data.bookImage}">
        `;
    }
}
//defining new book-card element which belongs to the Book class 
customElements.define('book-card', Book);
  
//NYTimes API Info 
const apiKey = '3HdZw47h6oimSwCSSFyUUl2EcAEi9FFV';
const apiUrl = `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${apiKey}`;

//FUNCTION: fetches book titles, authors, summaries, and picture URLs from NYTimes API and creates custom Book Elements
async function fetchBookData() {
    //fetch info from NYTimes API
    try {
      const response = await fetch(apiUrl);
      //if response != ok, throw error
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      //take response stream and read it to completion, set it as data
      const data = await response.json();
      //access book specific data from NYTimes API response
      const books = data.results.lists[0].books;
      //container to add new custom book elements to
      const bookContainer = document.createElement('div');

      //create new book-card element for every book to display
      for (const book of books) {
        const bookElement = document.createElement('book-card');

        //set bookData with info of that specific book
        const bookData = {
            bookTitle: book.title,
            author: book.author,
            summary: book.description,
            bookImage: book.book_image,
        };

          //set book-card element data 
          bookElement.data = bookData;
          //add current book to bookContainer
          bookContainer.appendChild(bookElement);
        }
    // add bookContainer which contains all the books to the body of the site
    document.body.appendChild(bookContainer);
    //catch potential errors from fetching data
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// FUNCTION: call fetchBookData() within this method to pause execution until fetchBookData() is executed
async function fetchAndCreateBooks() {
    const data = await fetchBookData();
}

fetchAndCreateBooks();
  
