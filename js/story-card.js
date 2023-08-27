
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
        display: flex; 
        align-items: center; 
        padding: 16px;
      }

      /* Custom styles for the image */
      article > img {
        width: 50%;
        height: auto;
        margin-right: 30px; 
      }

      /* Custom styles for the text container */
      .text_container {
        flex: 1; 
        display: flex;
        flex-direction: column; 
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
    imgSrc: '../images/geminiCutie.png',
    imgAlt: 'Picture of Cat',
    titleLnk: '../html/catStory.html',
    titleTxt: "Why cats are a woman's best friend",
    summary: 'Adopting a cat just might fix the hole in your heart. Learn why this is the most feminist thing you could do.',
    readTime: '5 MIN READ',
},
{
  imgSrc: '../images/pomodoro.png',
  imgAlt: 'Picture of Pomodoro Timer ',
  titleLnk: '../html/pomodoro.html',
  titleTxt: "Pomodoro Technique proves to be incredibly effective for studying",
  summary: 'For people who just cannot get themself to sit and study, this technique might just be the answer.',
  readTime: '8 MIN READ',
},
{
  imgSrc: '../images/weights.png',
  imgAlt: 'Picture of Weights',
  titleLnk: '../html/weights.html',
  titleTxt: "Why lifting weights makes you hate yourself less",
  summary: 'Discover why lifting heavy in the gym might be better than therapy and psychiatry combined.',
  readTime: '7 MIN READ', 
}];
//RIGHT SIDE STORY LIST
const storyData1 = [
{
imgSrc: '../images/stanley.png',
  imgAlt: 'Picture of Stanley Cup',
  titleLnk: '../html/waterBottle.html',
  titleTxt: "Top 5 Emotional Support Water Bottles",
  summary: 'Check out these emotional support water bottles that you absolutely need in your life.',
  readTime: '4 MIN READ',
},
{
  imgSrc: '../images/music.png',
    imgAlt: 'Picture of Music',
    titleLnk: '../html/topSongs.html',
    titleTxt: "My Favorite Songs of All Time",
    summary: 'My top songs of all time, categorized by genre, that I would sell my soul and my firstborn to hear for the first time.',
    readTime: '2 MIN READ',
},
{
  imgSrc: '../images/painting.png',
  imgAlt: 'Picture of Art',
  titleLnk: '../html/healingInnerChild.html',
  titleTxt: "Activities for your healing your inner child",
  summary: 'Try these activities if you are feeling out of touch with who you used to be and your goals',
  readTime: '3 MIN READ',
}];

document.addEventListener('DOMContentLoaded', () => {
  const storyContainer = document.getElementById('storyContainer');
  const storyContainer1 = document.getElementById('storyContainer1');

  for (const [index, story] of storyData.entries()) {
    const storyCardElement = document.createElement('story-card');
    storyCardElement.data = story;
    storyContainer.appendChild(storyCardElement);

    if (index < storyData.length - 1) {
      const line1 = document.createElement('hr');
      line1.classList.add('line1');
      storyContainer.appendChild(line1);
    }
  }

  for (const [index, story] of storyData1.entries()) {
    const storyCardElement = document.createElement('story-card');
    storyCardElement.data = story;
    storyContainer1.appendChild(storyCardElement);

    if (index < storyData1.length - 1) {
      const line1 = document.createElement('hr');
      line1.classList.add('line1');
      storyContainer1.appendChild(line1);
    }
  }

  document.body.appendChild(storyContainer);
  document.body.appendChild(storyContainer1);
});
