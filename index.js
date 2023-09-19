import express from 'express'
import { GraphQLInt, GraphQLObjectType,GraphQLSchema, GraphQLString } from 'graphql'
const app = express()
const port = 3000

import {createHandler} from'graphql-http/lib/use/express'


const schema = new GraphQLSchema({
    query:new GraphQLObjectType({
        name:'MainQuery',
        description:'Main',
        fields:{
            sayHello:{
                type:GraphQLString,
                resolve:()=>{
                    return "helloworld"
                }
            },
        }
    }),
    mutation:new GraphQLObjectType({
        name:'MainMutation',
        description:"MainMut",
        fields:{
            MutationSayHello:{
                type:new GraphQLObjectType({
                    name:'Respond',
                    fields:{
                        name:{type:GraphQLString},
                        email:{type:GraphQLString},
                        age:{type:GraphQLInt},
                    },

                }),
                args:{
                    name:{type:GraphQLString},
                    email:{type:GraphQLString},
                    age:{type:GraphQLInt},
                },
                resolve:(__,args)=>{
                    const name =args.name
                    const age=args.age
                    const email=args.email

                    return{
                        name
                    }
                }
            }
        }
    })

})



app.use('/graphql',createHandler({schema}))
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))