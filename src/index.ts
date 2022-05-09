// add styles
import './style.css';

let clientId,
    wss

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
      document.getElementById('body').appendChild(items)
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
    // if (data[i].sale === true)
    //   label.className += ' sale'
    label.innerHTML = data[i].item
    item.appendChild(label)
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
  const body = d.createElement('section')
  const foot = d.createElement('section')
  nav.id = 'nav'
  body.id = 'body'
  foot.id = 'foot'
  d.body.appendChild(nav)
  d.body.appendChild(body)
  d.body.appendChild(foot)
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
