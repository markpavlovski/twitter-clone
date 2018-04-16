class FrontEndController {
  constructor(mainContent, mainPost){
    this.mainContentScreen = mainContent
    this.mainPostScreen = mainPost
    console.log(this.mainContentScreen, this.mainPostScreen);
  }


  showPostScreen(){
    this.removeClass(this.mainPostScreen,'d-none')
    setTimeout(()=>this.removeClass(this.mainPostScreen,'d-hide'),300)
  }

  addClass(element, ...args){
    args.map(style => element.classList.add(style))
  }
  removeClass(element, ...args){
    args.map(style => element.classList.remove(style))
  }












}

const mainContent = document.querySelector('main.main-content')
const mainPostInterface = document.querySelector('main.post-interface')
const controller = new FrontEndController(mainContent,mainPostInterface)
