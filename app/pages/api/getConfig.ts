import axios from 'axios'


export default (req, res) => {
  res.json({envVariables: process.env})
}