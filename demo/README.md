# Demo

Demo setup for gulp tasks.

### Front End Dependencies

First, make sure you have [NodeJS](http://nodejs.org) installed. Then:

* `npm i`
* `npm start`

### Development Server

While `gulp` is running, you can access the site at http://localhost:XXXX

## Deployment

Run `NODE_ENV=production npm run build` to build prepare all assets for deployment.

## Analyze Webpack Bundle

`ANALYZE_BUNDLE=true npm run build` will output a report breaking down final webpack bundle sizes.
