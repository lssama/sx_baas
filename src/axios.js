import axios from "axios"
const ajax=(Data)=>{
	axios({
	    method:Data.method,
	    url:Data.url,
	    params:Data.params,
	    data:Data.data
	})
	.then(
		function(data){
			Data.success(data)
		}
	)
	.catch(
		function(err){
			Data.catch(err)
		}
    )
}
export default ajax