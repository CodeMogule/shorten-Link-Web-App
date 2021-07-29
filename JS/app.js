// html elements
const elements = {
    hamburgerBtn: document.querySelector('.hamburger'),
    closeBtn: document.querySelector('.close'),
    mobileMenu: document.querySelector('.header-nav'),
    body: document.querySelector('body'),
    textBar: document.querySelector('.link-text-bar'),
    form: document.querySelector('form'),
    linkUi: document.getElementById('information')
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
    
    const markup = `
    <div class="link-result" >
    <h4>${data.data.result.original_link}</h4>
    <div class = "link-result-line"style="border-top: 1px solid rgba(122, 122, 122, 0.363);" ></div>
    <a href="${url}"><h5>${data.data.result.full_short_link}</h5></a>
    <button class="copy-btn">
        Copy
    </button>
</div>
  
`
elements.linkUi.insertAdjacentHTML("afterbegin",markup)
}

        elements.form.addEventListener('submit', (event)=> {
            event.preventDefault()
            let text = elements.textBar.value;
            getLink(text)
        })





