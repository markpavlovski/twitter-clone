class FrontEndController {
  constructor(topNav, mainContent, mainPost){
    this.mainContentScreen = mainContent
    this.mainPostScreen = mainPost
    this.topNav = topNav

    const keyPressEvents = {
      action: 'keydown',
      el: document,
      cb: this.keyPressHandler.bind(this)
    }
    const clickMainScreenButton = {
      action: 'click',
      el: this.topNav.querySelector('button'),
      cb: this.showPostScreen.bind(this)
    }
    const clickPostScreenButton = {
      action: 'click',
      el: this.mainPostScreen.querySelector('button'),
      cb: this.submitPost.bind(this)
    }
    const clickPostScreenEsc = {
      action: 'click',
      el: this.mainPostScreen.querySelector('.post-card-header-x'),
      cb: ()=>console.log('asd')
    }

    this.addListeners(
      keyPressEvents,
      clickMainScreenButton,
      clickPostScreenButton,
      clickPostScreenEsc
    )

    this.renderFeed()
  }



  submitPost(){
    const textarea = this.mainPostScreen.querySelector('textarea')
    const name = 'Mark Pavlovski'
    const handle = '@mrkpvlvski'
    const timestamp = new Date()
    const content = textarea.value
    const tags = content.split(' ').filter(word =>{
      console.log(word);
      return word[0]==='#'
    })
    const postData = {name, handle, timestamp, content, tags}
    console.log(postData)
    console.log('post submitted')
    // axios post call, with this.renderFeed cb
    this.hidePostScreen()
  }

  renderFeed(){
    // data from server
    const id = 'XF2RF7D'
    const name = 'Mark Pavlovski'
    const handle = '@mrkpvlvski'
    const timestamp = new Date()
    const content = 'text'
    const tags = ['a','b','c']
    const data = [
      {id, name, handle, timestamp, content, tags},
      {id, name, handle, timestamp, content, tags},
      {id, name, handle, timestamp, content, tags},
      {id, name, handle, timestamp, content, tags},
      {id, name, handle, timestamp, content, tags},
      {id, name, handle, timestamp, content, tags},
      {id, name, handle, timestamp, content, tags}
    ]
    console.log(data);
  }




  keyPressHandler(event){

    const textarea = this.mainPostScreen.querySelector('textarea')
    const postScreenButton = this.mainPostScreen.querySelector('button')
    if (textarea.value.length - 1 === 0 || textarea.value.length + 1 === 240) {
      this.toggleClass(postScreenButton,'active-button')
    }
    if (event.key == "Escape") this.hidePostScreen()

  }

  showPostScreen(){
    if (this.mainPostScreen.classList.contains('d-hide')){
      const textarea = this.mainPostScreen.querySelector('textarea')
      textarea.value = ''
      textarea.focus()
      this.toggleClass(this.mainPostScreen, 'd-back')
      this.toggleClass(document.body, 'd-overflow')
      setTimeout(() => this.toggleClass(this.mainPostScreen, 'd-hide'), 100)
    }
  }

  hidePostScreen(){
    if (document.body.classList.contains('d-overflow')){
      this.toggleClass(this.mainPostScreen,'d-hide')
      this.toggleClass(document.body,'d-overflow')
      setTimeout(()=>this.toggleClass(this.mainPostScreen,'d-back'),100)
    }
  }

  toggleClass(element, ...args){
    args.map(style => element.classList.toggle(style))
  }

  addListeners(...args){
    if (args) args.map(listener=>{
      listener["el"].addEventListener(listener.action, listener.cb)
    })
  }


}

const topNav = document.querySelector('.top-nav')
const mainContent = document.querySelector('main.main-content')
const mainPostInterface = document.querySelector('main.post-interface')
const controller = new FrontEndController(topNav,mainContent,mainPostInterface)
