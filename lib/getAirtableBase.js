var Airtable = require("airtable")
var client = new Airtable({ apiKey: process.env.AIRTABLE_KEY })

function getAirtableBase() {
  // base(Airtable view)
  return client.base("appmATlWFbrb0Bmsn")("Jeshejojos")
}

export default getAirtableBase
