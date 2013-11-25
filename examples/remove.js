// deleting n records in the database.

var fs = require('fs');
eval(fs.readFileSync('example.js')+'');

var n = con.config.NoOfOps;
var m = 0

console.time(n + " delete");
for (var i = 0; i < n; i++ ) {

	var k1 = {'ns':con.config.namespace,'set':con.config.set,'key':"value"+i}; 

	var removepolicy = { timeout : 10, 
		gen : 1, // generation of the record
		Retry : policy.Retry.ONCE, // if the delete operation fails, retry once again(only once).
		Key: policy.Key.SEND // send the key over the network not digest
	}
	//This function deletes the complete record with all the bins.	
	client.remove(k1,removepolicy, function (err, key){
		if ( err.code != status.AEROSPIKE_OK ) {	//err.code AEROSPIKE_OK signifies the successfull deletion of record.
			console.log("error %s",err.message);
			console.log(key);
		}
		if ( (++m) == n ) {
			console.timeEnd(n + " delete");
			client.close();		// Close the connection to the aerospike server.
		}
	});

}
