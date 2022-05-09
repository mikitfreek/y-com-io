// add styles
import './style.css';

let clientId,
    wss,
    currency = " zł"

initView()

function initView() {

  init()
  renderUI()
  toggleDarkMode()
  updateUI()
}

function init() {
  let host = location.origin.replace(/^http/, 'ws')
  let ws = new WebSocket(host);
  wss=ws

  ws.onmessage = function (event) {
    const res = JSON.parse(event.data);

    if (res.method === 'connect') {
      // ws.send(clientId)
      clientId=res.clientId

      let page = '1'
      let cat= 'laptops'
      // let data = fetchData(cat, page)
      // fetchData(cat, page)
      const payLoad = {
        'method': 'request',
        'type': 'data',
        'cat': cat
      }
      ws.send(JSON.stringify(payLoad))

      console.log('Client id set successfully ' + clientId)
    }
    else if (res.method === 'resolve') {

      let items = updateItems(res.data);
      document.getElementById('container').appendChild(items)
      console.log(res.data);
    }
  }
}

// fetch data (category, page)
function fetchData(cat, page) {
  // const data = document.createElement('div')

  const payLoad = {
    'method': 'data',
    'cat': cat
  }
  wss.send(JSON.stringify(payLoad))

  // return data
}


function updateItems(data) {
  const items = document.createElement('div')
  items.className = 'items'

  for (let i = 0; i < data.length; i++) {
    const item = document.createElement('div')
    item.className = 'item'
      const label = document.createElement('div')
      label.className = 'label'
      const spec = document.createElement('div')
      spec.className = 'spec'
      const price = document.createElement('div')
      price.className = 'price'

      label.innerHTML = data[i].item
      item.appendChild(label)

      spec.innerHTML = data[i].spec
      item.appendChild(spec)

      price.innerHTML = data[i].price + currency
      if ( data[i].hasOwnProperty('onsale') ) {
        price.classList.add('onsale')
        price.innerHTML = data[i].onsale + currency
      }
      item.appendChild(price)

    items.appendChild(item)
  }
  return items
}

/////////////////////////////////////////
//                UI
/////////////////////////////////////////
function toggleDarkMode() {
  const e = document.body;
  e.classList.toggle("dark-mode");
}

function renderUI() {
  const d = document
  
  const nav = d.createElement('section')
  const mainCon = d.createElement('section')
  const foot = d.createElement('section')

  nav.id = 'nav'

  // mainCon.id = 'main-container'
  mainCon.classList.add('main')// = 'body'
    const mcon = d.createElement('div')
    
    mcon.classList.add('main-container')
      const con = d.createElement('div')
      mcon.appendChild(con)
      con.id = 'container'
      con.classList.add('container')

    mainCon.appendChild(mcon)

  foot.id = 'foot'

  d.body.appendChild(nav)
  d.body.appendChild(mainCon)
  d.body.appendChild(foot)

  const drkmd = d.createElement('button')
  drkmd.innerHTML = "Toggle darkmode"
  drkmd.onclick = () => toggleDarkMode();
  d.body.appendChild(drkmd)
}

function updateUI() {

  // const raise = document.getElementById('raise')
  // raise.addEventListener("click", function () {

  // });

  // const fire = document.getElementById('fire')
  // fire.addEventListener("click", function () {
    
  // });

  // const online = document.getElementById('online')
  // online.addEventListener("click", function () {
  //   console.log('online: ' );
  // });
}
