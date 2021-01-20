const wp=require('web-push');
import 'dotenv/config';

const PUPBLIC_KEY= process.env.WEB_PUSH_PUBLIC_KEY;
const PRIVATE_KEY= process.env.WEB_PUSH_PRIVATE_KEY; 


wp.setVapidDetails('mailto:nomad@gmail.com', PUPBLIC_KEY, PRIVATE_KEY);

module.exports= wp;