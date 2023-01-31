const {Pool} = require('pg')
const pool = new Pool ({
    host: 'containers-us-west-140.railway.app',
    user: 'postgres',
    port: '6574',
    password: "meWSLNWPD8Eo2RKykgt6",
    database: 'railway'
})

exports.executeQuery = async (query) => {
    console.log('in the query executer')
   
    try {
        console.log("trying to connect")
        await pool.connect()     // gets connection
        console.log("connected to database")
        await pool.query(query)  // sends queries
        console.log("query sent")
        //return true;
    } catch (error) {
        console.error(error.stack)
        //return false;
    } //finally {
    //     await pool.end()
    //     console.log(' pool has drained')
    // }

}

exports.giveMeString = (string) => {
    console.log(string)
}

   // await executeQuery(inputRecordCommand).then(result => {
        //     if (result) {
        //         console.log('query success');
        //     }
        // })