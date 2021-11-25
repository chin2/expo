import db from "./config"

const getData = async ()=>{
    let data = await db.collection("users").get();
    data.forEach((e)=>{
        console.log(`${e.id}-->> ${JSON.stringify(e.data())}`)
    })
}

module.exports = {
    default: getData
}