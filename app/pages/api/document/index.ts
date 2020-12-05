import { File } from "formidable";
import Formidable from "formidable-serverless";
import fs from "fs";

import nextConnect from 'next-connect';
import { nanoid } from 'nanoid';
import middleware from '../../../middlewares/middleware';
import { NextApiResponse } from 'next';

/*
export const config = {
  api: {
    bodyParser: false,
  },
};
*/
  /*

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req: any, res: NextApiResponse) => {
  console.log('ingreso a files upload.');
  if (!req.files) {
    return res.status(500).send('Not files');
  } else {
    console.log('files received.');

  }
  return new Promise(async (resolve, reject) => {
    const form = new Formidable.IncomingForm({
      multiples: true,
      keepExtensions: true,
    });

    form
      .on("file", (name: string, file: File) => {
        const data = fs.readFileSync(file.path);
        fs.writeFileSync(`public/upload/${file.name}`, data);
        fs.unlinkSync(file.path);
      })
      .on("aborted", () => {
        reject(res.status(500).send('Aborted'))  
      })
      .on("end", () => {
        resolve(res.status(200).send('done'));
      });

    await form.parse(req)

    });
});
    */

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req: any, res: NextApiResponse) => {
  
  if (!req.user) {
    return res.status(401).send('unauthenticated');
  }
  
  // const { tramite } = req.body;

  //TODO: if (_id is not null) ..... update

  console.dir(req);
  
  const form = new Formidable.IncomingForm({
    multiples: true,
    keepExtensions: true,
  });

  form
    .on("file", (name: string, file: File) => {
      const data = fs.readFileSync(file.path);
      fs.writeFileSync(`public/upload/${file.name}`, data);
      fs.unlinkSync(file.path);
    })
    .on("aborted", () => {
      return(res.status(500).send('Aborted'))  
    })
    .on("end", () => {
      return(res.status(200).send('done'));
    });

  return await form.parse(req)

  });

  /*
  if(req.body._id) {
    console.log('update');
    // get by id
    await req.db
    .collection('tramites')
    .replaceOne({'_id': req.body._id}, req.body);
    return res.send(req.body);
    
    //update
  } else {
    console.log('update');
    const newTramite = {
      _id: nanoid(),
      ...req.body,
      createdAt: new Date(),
      creatorId: req.user,
    };
  
    await req.db.collection('tramites').insertOne(newTramite);
    return res.send(newTramite);  
  }
  
});*/

export default handler;

