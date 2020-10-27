export class DbErrorHandler{
    static dictionary = {
        originCity:"",
        destination:"Destination",
        reason:"Reason",
        tripDate: "Trip Date",
        returnDate: "Returning Date",
        accommodationID:"Accommodation",
        userId:"User ID",
        managerId:"Manager ID",
        joiner:"Joiner",
        status:"Status"
    }
    static getTravelRequestError(error){
        try{
            var pathIterator = error.errors[0].path
            if(error.errors[0].type == "notNull Violation"){
                return {message: (this.dictionary[pathIterator] || pathIterator) + " can not be empty"}
            }else{
                return {message: "error::" + error.errors[0].path }
            }
        }catch(err){
            return {message: error.message}
        }
        
    }
}
