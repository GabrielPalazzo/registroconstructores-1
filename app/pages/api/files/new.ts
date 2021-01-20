import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
import { NextApiRequest, NextApiResponse } from 'next';
import IPFS from 'ipfs'
import ipfsClient from 'ipfs-http-client'
import multiparty from 'multiparty'
import fs from 'fs'


const endpoint = async (req, res) => {

  let form = new multiparty.Form();
  const result: Array<{
    fileName: string
    cid: string
    createdAt: number
  }> = []

  form.parse(req, async (err, fields, files) => {
    if (err) console.log(err)

    const client = ipfsClient({
      host: 'localhost',
      protocol: "http",
      port: 5001,
      apiPath: 'api/v0'
    })

    for (let i = 0; i <= files.file.length - 1; i++) {
      const f = files.file[i]
      const binary = fs.readFileSync(f.path)
      const { cid } = await client.add(binary)
        result.push({
          fileName: f.originalFilename,
          cid: cid.toString(),
          createdAt: new Date().getTime()
        })
        res.json({ filesSaved: result })
    }
  });

}


export const config = {
  api: {
    bodyParser: false,
  },
};

export default endpoint