// add styles
import './style.css';

let clientId,
    wss,
    currency = " ,-"

    
let resdata;

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

    let page = '1';

    if (res.method === 'connect') {
      // ws.send(clientId)
      clientId=res.clientId

      let cat= 'laptops'
      // let page = '1'
      page = '1'
      // let data = fetchData(cat, page)
      // fetchData(cat, page)
      const payLoad = {
        'method': 'request',
        'type': 'data',
        'cat': cat,
        'page': page
      }
      ws.send(JSON.stringify(payLoad))

      const payLoad1 = {
        'method': 'request',
        'type': 'bucket'
      }
      ws.send(JSON.stringify(payLoad1))

      console.log('Client id set successfully ' + clientId)
    }
    else if (res.method === 'resolve') {

      if (res.type === 'data') {
        resdata = res.data

        const items = updateItems(res.data, page);
        document.getElementById('container').appendChild(items)
        console.log(res.data);
              
      } else if (res.type === 'bucket') {
        
        const items = updateBucket(res.data, page);
        document.getElementById('nav').appendChild(items)
        console.log(res.data);
      }
    }
  }
}

// fetch data (category, page)
// function fetchData(cat, page) {
//   // const data = document.createElement('div')

//   const payLoad = {
//     'method': 'data',
//     'cat': cat
//   }
//   wss.send(JSON.stringify(payLoad))

//   // return data
// }
function updateItemAction(data, page, i) {
  const item = updateItem(data[i]);
  document.getElementById('container').innerHTML = ''
  document.getElementById('container').appendChild(item)

  console.log('redirect [link]: ' );
}

function updateItems(data, page) {

  const items = document.createElement('div')
  items.className = 'items'

  for (let i = 0; i < data.length; i++) {
    const item = document.createElement('div')
    item.className = 'item'
    item.id = i.toString();// + page
    item.onclick = () => updateItemAction(data, page, i);

      const label = document.createElement('div')
      label.className = 'label'

      // const spec = document.createElement('div')
      // spec.className = 'spec'

      const price = document.createElement('div')
      price.className = 'price'

      label.innerHTML = data[i].item
      item.appendChild(label)

      const dimg = document.createElement('div')
        const img = document.createElement('img')
        if ( data[i].hasOwnProperty('img') )
          img.src = data[i].img;
        else img.src = 'https://via.placeholder.com/420x315';
        dimg.appendChild(img)
      dimg.className = 'img'
      item.appendChild(dimg)

      // spec.innerHTML = data[i].spec
      // item.appendChild(spec)
      
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

function updateBucket(data, page) {

  const items = document.createElement('div')
  items.className = 'items bucket'

  for (let i = 0; i < data.length; i++) {
    const item = document.createElement('div')
    item.className = 'item'
    item.id = i.toString();// + page
    
      const label = document.createElement('div')
      label.className = 'label'
      
      // const spec = document.createElement('div')
      // spec.className = 'spec'

      const price = document.createElement('div')
      price.className = 'price'

      label.innerHTML = data[i].item
      item.appendChild(label)

      const dimg = document.createElement('div')
        const img = document.createElement('img')
        if ( data[i].hasOwnProperty('img') )
          img.src = data[i].img;
        else img.src = 'https://via.placeholder.com/420x315';
        dimg.appendChild(img)
      dimg.className = 'img'
      item.appendChild(dimg)
      
      // spec.innerHTML = data[i].spec
      // item.appendChild(spec)
      
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

function updateItem(data) {

    const item = document.createElement('div')
    item.className = 'item'
    
      const label = document.createElement('div')
      label.className = 'label'
      
      const spec = document.createElement('div')
      spec.className = 'spec'

      const price = document.createElement('div')
      price.className = 'price'

      label.innerHTML = data.item
      item.appendChild(label)

      const dimg = document.createElement('div')
        const img = document.createElement('img')
        if ( data.hasOwnProperty('img') )
          img.src = data.img;
        else img.src = 'https://via.placeholder.com/420x315';
        dimg.appendChild(img)
      dimg.className = 'img'
      item.appendChild(dimg)
      
      spec.innerHTML = data.spec
      item.appendChild(spec)
      
      price.innerHTML = data.price + currency
      if ( data.hasOwnProperty('onsale') ) {
        price.classList.add('onsale')
        price.innerHTML = data.onsale + currency
      }
      item.appendChild(price)
  return item
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

  const bucketAdd = document.querySelectorAll(".add"); // this element contains more than 1 DOMs.
  // as it contains a NodeList, it's desirable to iterate through the list and bind events.                   
   for(let i =0; i < bucketAdd.length; i++) {
       // Inside the event handler function, if you want to access i, then its better to wrap it inside IIFE
       (function(i, ws) {
          bucketAdd[i].addEventListener("click", function (e) {
          const data = e;
          console.log('Bucket [add]: ' );
            const payLoad = {
              'method': 'request',
              'type': 'bucket',
              'action': 'add',
              'data': data
            }
            ws.send(JSON.stringify(payLoad))
        });   
        })(i);
    }

    const link = document.querySelectorAll(".item"); // this element contains more than 1 DOMs.
  // as it contains a NodeList, it's desirable to iterate through the list and bind events.                   
   for(let i =0; i < link.length; i++) {
       // Inside the event handler function, if you want to access i, then its better to wrap it inside IIFE
       (function(i, ws) {
        link[i].addEventListener("click", function (e) {
          
          const item = updateItem(resdata[link[i].id]);
          document.getElementById('container').innerHTML = null
          document.getElementById('container').appendChild(item)

          console.log('redirect [link]: ' );
            // const payLoad = {
            //   'method': 'request',
            //   'type': 'bucket',
            //   'action': 'add',
            //   'data': data
            // }
            // ws.send(JSON.stringify(payLoad))
        });   
        })(i);
    }


  // const links = document.querySelectorAll(".item");               
  // links.forEach((link) => {
  //   link.addEventListener('click', (e) => {
  //     const item = updateItem(resdata[link.id]);
  //     document.getElementById('container').innerHTML = 'loading..'
  //     document.getElementById('container').appendChild(item)

  //     console.log('redirect [link]: ' );
  //   });
  // });
    
}
