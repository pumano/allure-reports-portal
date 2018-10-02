import * as path from 'path';
import * as express from 'express';
import * as morgan from 'morgan';

import * as config from 'config';

let app;

async function bootstrap() {
  app = express();
  app.use(morgan('dev'));

  // Point static path to dist
  app.use(express.static(path.join(__dirname, '..', 'uploads')));

  app.get('/', (req, res) => {

    const links = config.get("routes").map((val) => {
      return `<li><a href="${val}">${val}</a></li>`;
    }).join('');

    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
    <base href="/">
    </head>
    <body>
    <ul>
    ${links}
    </ul>
    </body>
    </html>
    `);
  });

  
  // set dynamic routes
  await config.get('routes').forEach(project => {

    console.log(`project: ${project} loaded`);
    
    app.use(`/${project}`, (req, res) => {
      res.sendFile(path.resolve(path.join(__dirname, '../uploads', `${project}/index.html`)));
    });
  });

  await app.listen(config.get("port"));
}

bootstrap();