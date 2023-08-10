class Story extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    const article = document.createElement('article');
    const style = document.createElement('style');

    style.innerHTML = `
      * {
        font-family: georgia;
        margin: 0;
        padding: 0;
      }

      /* Custom styles for the container */
      article {
        display: flex; /* Use flexbox to arrange the items in a row */
        align-items: center; /* Center items vertically */
        padding: 16px;
      }

      /* Custom styles for the image */
      article > img {
        width: 50%;
        height: auto;
        margin-right: 30px; /* Add some space between the image and text */
      }

      /* Custom styles for the text container */
      .text_container {
        flex: 1; /* Allow the container to grow and take up available space */
        display: flex; /* Use flexbox to arrange the text in a column */
        flex-direction: column; /* Display the elements in a column */
        align-items:flex-start;
        display: block;
      }

      /* Custom styles for the link */
      article p.title a {
        color: black;
        text-decoration: none;
        font-weight: none;
        font-size: xx-large;
      }

      /* Custom styles for the summary */
      article p.summary {
        color: #70757A;
        font-size: large;
      }

      article p.readTime {
        font-family: helvetica;
        color: #70757A;
        font-size: small;
      }
    `;


    this.shadowRoot.append(style, article);
  }

  set data(data) {
    if (!data) return;

    const article = this.shadowRoot.querySelector('article');
    article.innerHTML = `
      <div class="text_container">
        <p class="title">
          <a href="${data.titleLnk}">${data.titleTxt}</a>
        </p>
        <p class="summary">${data.summary}</p>
        <br>
        <p class="readTime">${data.readTime}</p>  
      </div>
      <img src="${data.imgSrc}" alt="${data.imgAlt}">
    `;
  }
}

customElements.define('story-card', Story);
const storyContainer = document.createElement('div');

const storyData = [{
    imgSrc: '../images/gemini.png',
    imgAlt: 'Picture of Cat',
    titleLnk: '../html/catStory.html',
    titleTxt: "Why cats are a woman's best friend",
    summary: 'Adopting a cat just might fix the hole in your heart. Learn why this is the most feminist thing you could do.',
    readTime: '5 MIN READ',
},
{
  imgSrc: '../images/weights.png',
  imgAlt: 'Picture of Weights',
  titleLnk: '../html/weights.html',
  titleTxt: "Why lifting weights makes you hate yourself less",
  summary: 'Discover why lifting heavy in the gym might be better than therapy and psychiatry combined.',
  readTime: '7 MIN READ', 
}];

document.addEventListener('DOMContentLoaded', () => {
  const storyContainer = document.getElementById('storyContainer');

  for (const [index, story] of storyData.entries()) {
    const storyCardElement = document.createElement('story-card');
    storyCardElement.data = story;
    storyContainer.appendChild(storyCardElement);

    // Add a gray line between each story, except after the last one
    if (index < storyData.length - 1) {
      const line1 = document.createElement('hr');
      line1.classList.add('line1');
      storyContainer.appendChild(line1);
    }
  }

  document.body.appendChild(storyContainer);
});
  