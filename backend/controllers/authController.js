const supabase=require("../config/supabase")

const bcrypt=require("bcrypt")

exports.register=async(req,res)=>{

try{

const {
name,
email,
password
}=req.body

const hashed=
await bcrypt.hash(
password,
10
)

const {data,error}=await supabase

.from("users")

.insert([

{
name,
email,
password:hashed
}

])

.select()

if(error){

return res
.status(400)
.json(error)

}

res.json({

message:
"Registered Successfully",

data

})

}

catch(err){

res
.status(500)

.json({

message:
err.message

})

}

}

exports.login = async (req, res) => {

try {

const {

email,

password

} = req.body

console.log(

"LOGIN ATTEMPT",

email

)

const { data, error } = await supabase

.from("users")

.select("*")

.eq(

"email",

email

)

.single()

if (error || !data) {

return res

.status(404)

.json({

message:

"User Not Found"

})

}

console.log(

"DATABASE USER",

data

)

const valid = await bcrypt.compare(

password,

data.password

)

console.log(

"PASSWORD VALID",

valid

)

if (!valid) {

return res

.status(401)

.json({

message:

"Wrong Password"

})

}

res.json({

message:

"Login Success",

user:data

})

}

catch(err){

res.status(500)

.json({

message:

"Login Failed",

error:err.message

})

}

}