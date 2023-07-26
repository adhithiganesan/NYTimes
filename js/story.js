// story.js
// Custom Element for each story

class Story extends HTMLElement {
    // Called once when document.createElement('story') is called, or
    // the element is written into the DOM directly as <story>
    constructor() {
      super(); // Inheret everything from HTMLElement
  
      // Attaches the shadow DOM to this Web Component
      this.attachShadow({ mode: 'open' });
  
      // This element will hold our markup once our data is set
      const story = document.createElement('story');
  
      // This style element will hold all of the styles for the Web Component
      const style = document.createElement('style');
      // Insert all of the styles in to the <style> element
      style.innerHTML = `
        * {
          font-family: helvetica;
          margin: 0;
          padding: 0;
        }
        
        a {
          text-decoration: none;
        }

        
        article {
          align-items: center;
          border: 1px solid rgb(223, 225, 229);
          border-radius: 8px;
          display: grid;
          grid-template-rows: 118px 56px 14px 18px 15px 36px;
          height: auto;
          row-gap: 5px;
          padding: 0 16px 16px 16px;
          width: 178px;
        }
  
  
        article > img {
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          height: 118px;
          object-fit: cover;
          margin-left: -16px;
          width: calc(100% + 32px);
        }
  
        p.ingredients {
          height: 32px;
          line-height: 16px;
          padding-top: 4px;
          overflow: hidden;
        }
        
        p.organization {
          color: black !important;
        }
  
        p.title {
          display: -webkit-box;
          font-size: 16px;
          height: 36px;
          line-height: 18px;
          overflow: hidden;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
  
        p:not(.title), span, time {
          color: #70757A;
          font-size: 12px;
        }
      `;
  
      // Append the <style> and <article> elements to the Shadow DOM
      this.shadowRoot.append(style, story);
    }
  
    /**
     * Called when the .data property is set on this element.
     * 
     * For Example:
     * let recipeCard = document.createElement('recipe-card'); // Calls constructor()
     * recipeCard.data = { foo: 'bar' } // Calls set data({ foo: 'bar' })
     *
     * @param {Object} data - The data to pass into the <recipe-card>, must be of the
     *                        following format:
     *                        {
     *                          "imgSrc": "string",
     *                          "imgAlt": "string",
     *                          "titleLnk": "string",
     *                          "titleTxt": "string",
     *                          "organization": "string",
     *                          "rating": number,
     *                          "numRatings": number,
     *                          "lengthTime": "string",
     *                          "ingredients": "string"
     *                        }
     */
    set data(data) {
      // If nothing was passed in, return
      if (!data) return;
  
      // Select the <article> we added to the Shadow DOM in the constructor
      const story = this.shadowRoot.querySelector('story');
  
      // Set the contents of the <story> with the <story> template and
      // the data passed in
      story.innerHTML = `
        <img src="${data.imgSrc}" alt="${data.imgAlt}">
        <p class="title">
          <a href="${data.titleLnk}">${data.titleTxt}</a>
        </p>
        <p class="summary">${data.summary}</p>
        <p class="readTime">${data.readTime}</p>
      `;
    }
  }
  
  // Define the Class so you can use it as a custom element
  customElements.define('story-card', Story);