const ActivePage=window.location.pathname;

const activeNav=document.querySelectorAll('nav a').forEach(

PageLinks=>{
if (PageLinks.href.includes(`${ActivePage}`)) {
	
	PageLinks.classList.add('Active');
}

}	
)

