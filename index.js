import  express  from 'express'
import { GraphQLBoolean, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'
const app =express()
const port =3000
import {createHandler} from'graphql-http/lib/use/express'

app.get('/',(req,res)=>res.send('hello world'))

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name:'maiQuerySchema',
        description:'Main',
        fields:{
            sayHello:{
                type:GraphQLString,
                resolve:()=>{
                    return "hello"
                }
            },
            returnBoolean:{
                type:GraphQLBoolean,
                resolve:()=>{
                    return true
                }
            }
        },
    })
})
app.use('/graphql',createHandler({schema}))
app.listen(port,()=>{
    console.log(`app listening on port number ${port}`)
})