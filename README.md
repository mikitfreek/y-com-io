## TODO

### Frontend ( src/* )

```
- fetch data by categories,
- fetch only amount of items that can be displayed on a screen at once
```

### Backend ( server.js )

#### Database ( items.json )

```
- fetch data by categories,
- fetch only amount of product that can be displayed at once on screen
```

#### Basket, Searchbar?

```
*https://stackoverflow.com/questions/8517089/js-search-in-object-values*

function filterIt(arr, searchKey) {
  return arr.filter(obj => Object.keys(obj).some(key => obj[key].includes(searchKey)));
}
```

## Usage

```
npm start

*development*
npm run build   - build package
npm run live    - live backend, static frontend (use npm build while using it)
npm run dev     - offline backend, live frontend
```

### Install Typscript

```
npm install typescript -g
```

### Start

```
$ git clone https://github.com/.git
$ cd y-com-nodejs
$ npm install # or yarn
$ npm start
```

### Add branch
```
$ git branch -M main
$ git remote add origin https://github.com/mikitfreek/y-com-io.git
```

### Upload

```
$ git add --all
$ git commit -m "Initial commit"
$ git push -u origin main
```
