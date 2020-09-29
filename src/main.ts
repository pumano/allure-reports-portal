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
  app.use(express.static(path.join(__dirname, '..', 'vendor')));

  // main route
  app.get('/', (req, res) => {

    const links = config.get('routes').map((link) => {
      return `
              <div class="col-sm-6 col-md-4 col-sm-12 col-xs-12">
                <div class="card">
                  <div class="card-body text-center">
                    <h5 class="card-title">
                        ${link}
                    </h5>
                  </div>
                  <div class="card-footer text-center">
                    <a href="${link}" class="btn btn-primary">Open</a>
                  </div>
                </div>
              </div>`;
    }).join('');

    res.send(`
          <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <base href="/">
                <link rel="stylesheet" href="bootstrap.min.css">
              </head>
              <body>
                <div class="row">
                  <div class="col-xs-12 mx-auto">
                    <h1>${config.get('title')}</h1>
                  </div>
                </div>
                <div class="row col-xs-12 mx-auto">
                  ${links}
                </div>
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

  await app.listen(config.get('port'));
}

bootstrap();