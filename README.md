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

### Install Typscript

```
npm install typescript -g
```

### Start

```
git clone https://github.com/mikitfreek/y-com-io.git
cd y-com-io
npm install # or yarn
npm start
```

### Dev

```
npm run live    - live backend, static frontend (use npm build while using it)
npm run build   - build frontend package

npm run dev     - offline backend, live frontend
```

### Add branch
```
git branch -M main
git remote add origin https://github.com/mikitfreek/y-com-io.git
```

### Upload

```
git add <files>
git commit -m “Your description”
git remote -v
git push -u origin main
```

#### override all changes in all files

```
git add --all
git commit -m "Commit all"
git push -u origin main
```
