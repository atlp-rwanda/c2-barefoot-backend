export async function dbErrorHandler(error){
    if(JSON.stringify(error.type) == "notNull Violation"){
        return {message: error.path + " can not be empty"}
    }else{
        return {message:error + "error"}
    }
}