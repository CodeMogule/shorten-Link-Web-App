// html elements
const elements = {
    hamburgerBtn: document.querySelector('.hamburger'),
    closeBtn: document.querySelector('.close'),
    mobileMenu: document.querySelector('.header-nav'),
    body: document.querySelector('body'),
    textBar: document.querySelector('.link-text-bar'),
    form: document.querySelector('form'),
    linkUi: document.getElementById('information'),
    errorMessage: document.querySelector('.error-message'),
    shortenItBtn: document.querySelector('.shorten-it-btn'),
    shortenItText: document.querySelector('.shorten-it'),
    spinner: document.querySelector('.spinner'),
    loader: 'loader',
    copyBtn : `copy-btn`,
    copyText: `copy`,
}

//open mobile menu
elements.hamburgerBtn.addEventListener('click',(event) => {
event.preventDefault();
elements.hamburgerBtn.style.display = 'none';
elements.closeBtn.style.display = 'block';
elements.mobileMenu.style.top = '15%';
elements.body.classList.add('minimize')
})

//close mobile menu
elements.closeBtn.addEventListener('click',(event)=>{
event.preventDefault();
elements.closeBtn.style.display = 'none';
elements.hamburgerBtn.style.display = 'block'
elements.mobileMenu.style.top = '-100%';
elements.body.classList.remove('minimize');
})


//shortner link  
async function getLink(url){
    const data = await axios(`https://api.shrtco.de/v2/shorten?url=${url}`)
    const markup =
    `
    <div class="link-result" >
    <h4>${data.data.result.original_link}</h4>
    <div class = "link-result-line"style="border-top: 1px solid rgba(122, 122, 122, 0.363);" ></div>
    <a href="${url}"><h5 class = ${elements.linkResultText}>${data.data.result.full_short_link}</h5></a>
    <button class="${elements.copyBtn}" onclick = "copyText()">
       <span id = "${elements.copyText}">Copy</span>
    </button
</div>
`
elements.linkUi.insertAdjacentHTML("afterbegin",markup)

window.copyText = function(){
    var input  =document.createElement('input');
document.body.appendChild(input)
input.value = data.data.result.full_short_link;
input.select();
document.execCommand('copy',false);
input.remove();
let copyBtn = document.querySelector(`.${elements.copyBtn}`)
let copyText = document.getElementById(`${elements.copyText}`)
copyBtn.style.backgroundColor = 'hsl(257, 27%, 26%)';
copyText.textContent = 'Copied!'
}
}

function loader(){
    elements.shortenItText.style.display = 'none';
    let markup = `
    <div class = ${elements.loader}>
    <i class="fas fa-spinner spinner"></i>
    </div>
    `
    elements.shortenItBtn.innerHTML = markup
}

function clearLoader(){
    const loader =  document.querySelector(`.${elements.loader}`)
    if(loader) loader.parentElement.removeChild(loader)
    elements.shortenItBtn.innerHTML = `<span>Shorten it!</span>`
}

function urlValidity(string){
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(string);
}




async function shorterLink(){
    let text = elements.textBar.value;
    if(text === ''){
        elements.errorMessage.style.display = 'block';
        elements.textBar.style.borderColor = 'red';
    }else if(urlValidity(text) === false){
        elements.errorMessage.style.display = 'block';
        elements.textBar.style.borderColor = 'red';
    }
    
    else if(urlValidity(text) === true) {
        elements.errorMessage.style.display = 'none';
        elements.textBar.style.borderColor = 'initial';
        loader()
        elements.textBar.value = ''
    await getLink(text)
    clearLoader()
    }
}

        elements.form.addEventListener('submit',(event)=> {
            event.preventDefault()
           shorterLink()
        })





