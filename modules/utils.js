function assert(b, message) {
    if(!b) {
        if(message) {
            console.log(new Error(message));
        }
        else {
            console.log(new Error());
        }
        
        process.exit();
    }
}


module.exports = {assert: assert};