import {Client} from 'faunadb'

export const fauna = new Client({
    secret:process.env.YOUR_FAUNA_SECRET,
  })
