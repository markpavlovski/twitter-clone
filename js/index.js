class Post {
  constructor({id, name, handle, timestamp, messageBody, tags}){
    this._element = this.createDOMElement(id, name, handle, timestamp, messageBody, tags)
    this.id = id
    this.name = name
    this.handle = handle
    this.timestamp = timestamp
    this.messageBody = messageBody
    this.tags = tags
  }

  createDOMElement(id, name, handle, timestamp, messageBody, tags){

    // const date = `${timestamp}`.split(' ').filter((el,idx)=> idx === 1 || idx === 2).join(' ')
    const date = `${new Date(timestamp)}`.split(' ').filter((el,idx)=> idx === 1 || idx === 2).join(' ')
    const card = document.createElement('div')
    card.setAttribute('postId', id)
    card.classList.add('card')
    card.innerHTML = `
      <div class='card-left'>
        <img src='images/user-icon.jpg' class='user-icon'>
      </div>
      <div class='card-right'>
        <h1 class='user-name'>${name}</h1>
        <h2 class='user-handle'>${handle}</h2>
        <h2 class='post-date'>·</h2>
        <h2 class='post-date'>${date}</h2>

        <p class='tweet-content'>
          ${messageBody}
        </p>
        <p class='tweet-placeholder-actions'>
          <i class="far fa-comment"></i> 10
          <i class="fas fa-retweet"></i> 327
          <i class="far fa-heart"></i> 4.5K
          <i class="far fa-envelope"></i>
        </p>
      </div>`
      return card
  }

  get element(){
    return this._element
  }

}




class FrontEndController {
  constructor(topNav, mainContent, mainPost){
    this.mainContentScreen = mainContent
    this.mainPostScreen = mainPost
    this.topNav = topNav
    this.posts = []

    const keyPressEvents = {
      action: 'keydown',
      el: document,
      cb: this.keyPressHandler.bind(this)
    }
    const clickMainScreenButton = {
      action: 'click',
      el: this.topNav.querySelector('button'),
      cb: this.newPost.bind(this)
    }
    const clickPostScreenButton = {
      action: 'click',
      el: this.mainPostScreen.querySelector('button.post:not(.delete)'),
      cb: this.submitPost.bind(this)
    }
    const clickPostScreenDelete = {
      action: 'click',
      el: this.mainPostScreen.querySelector('button.delete'),
      cb: this.deletePost.bind(this)
    }
    const clickPostScreenEdit = {
      action: 'click',
      el: this.mainPostScreen.querySelector('button'),
      cb: this.editSubmitPost.bind(this)
    }
    const clickPostScreenEsc = {
      action: 'click',
      el: this.mainPostScreen.querySelector('.post-card-header-x'),
      cb: ()=>console.log('asd')
    }
    const clickMainScreenCard = {
      action: 'click',
      el: document.body,
      cb: this.editPost.bind(this)
    }

    this.listenerObjs = {keyPressEvents, clickMainScreenButton, clickPostScreenButton, clickPostScreenEdit, clickPostScreenEsc}

    this.addListeners(
      keyPressEvents,
      clickMainScreenButton,
      clickPostScreenEsc,
      clickMainScreenCard,
      clickPostScreenDelete
    )

    this.renderFeed()
  }


  newPost(){
    this.showPostScreen(this.listenerObjs.clickPostScreenButton)
    const heading = this.mainPostScreen.querySelector('.post-card-header-text')
    heading.innerText = 'Create new Post'
    const del = this.mainPostScreen.querySelector('button.post.delete')
    if (!del.classList.contains('d-hide')) this.toggleClass(del,'d-hide', 'd-back')

  }


  editPost(event){
    const card = event.target.closest('.card')
    if (card) {
      console.log(card);
      const id = card.getAttribute('postid')
      const post = this.posts.find(obj => obj.id === id)
      const textarea = this.mainPostScreen.querySelector('textarea')
      const heading = this.mainPostScreen.querySelector('.post-card-header-text')
      const del = this.mainPostScreen.querySelector('button.post.delete')
      console.log(heading);
      this.showPostScreen(this.listenerObjs.clickPostScreenEdit)
      textarea.value = post.content
      heading.innerText = 'Edit Post'
      if (del.classList.contains('d-hide')) this.toggleClass(del,'d-hide', 'd-back')
    }
  }


  stagePostData(){
    console.log("hi");
    const textarea = this.mainPostScreen.querySelector('textarea')
    const name = 'Mark Pavlovski'
    const handle = '@mrkpvlvski'
    const timestamp = new Date()
    const content = textarea.value
    const tags = content.split(' ').filter(word =>word[0]==='#')
    return {name, handle, timestamp, content, tags}
  }

  editSubmitPost(){
    const postData = this.stagePostData()
    console.log(postData);
    // axios post call, with this.renderFeed cb
    this.hidePostScreen()
  }


  deletePost(){
    const postData = this.stagePostData()
    console.log('deleted post')
    // axios post call, with this.renderFeed cb
    this.hidePostScreen()
  }


  submitPost(){
    const postData = this.stagePostData()
    console.log(postData)
    console.log('post submitted')
    // axios post call, with this.renderFeed cb
    this.hidePostScreen()
  }

  renderFeed(){
    axios.get('http://localhost:3000/messages')
    .then(response => {
      const data = response.data.data.reverse()
      const feedContainer = this.mainContentScreen.querySelector('.content-right')
      while (feedContainer.lastElementChild.classList.contains('card')) {
        feedContainer.removeChild(feedContainer.lastElementChild)
      }
      while (this.posts.length) this.posts.pop()
      data.map(post=>{
        const newPost = new Post(post)
        this.posts.push(newPost)
        feedContainer.appendChild(newPost.element)
      })
    })
    .catch(function (error) {
      console.log(error);
    });




  }




  keyPressHandler(event){

    const textarea = this.mainPostScreen.querySelector('textarea')
    const postScreenButton = this.mainPostScreen.querySelector('button')
    if (textarea.value.length - 1 === 0 || textarea.value.length + 1 === 240) {
      this.toggleClass(postScreenButton,'active-button')
    }
    if (event.key == "Escape") this.hidePostScreen()

  }

  showPostScreen(listener){
    if (this.mainPostScreen.classList.contains('d-hide')){
      const textarea = this.mainPostScreen.querySelector('textarea')
      textarea.value = ''
      textarea.focus()
      this.toggleClass(this.mainPostScreen, 'd-back')
      this.toggleClass(document.body, 'd-overflow')
      setTimeout(() => this.toggleClass(this.mainPostScreen, 'd-hide'), 100)
      this.addListeners(listener)
    }
  }

  hidePostScreen(){
    if (document.body.classList.contains('d-overflow')){
      this.toggleClass(this.mainPostScreen,'d-hide')
      this.toggleClass(document.body,'d-overflow')
      setTimeout(()=>this.toggleClass(this.mainPostScreen,'d-back'),100)
      this.removeListeners(this.listenerObjs.clickPostScreenButton, this.listenerObjs.clickPostScreenEdit)
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

  removeListeners(...args){
    if (args) args.map(listener=>{
      listener["el"].removeEventListener(listener.action, listener.cb)
    })
  }


}

const topNav = document.querySelector('.top-nav')
const mainContent = document.querySelector('main.main-content')
const mainPostInterface = document.querySelector('main.post-interface')
const controller = new FrontEndController(topNav,mainContent,mainPostInterface)
