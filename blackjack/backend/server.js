import app from './app.js'
import prisma from './db.js'

prisma.$connect().then(async () => {  
    console.log('Connected to the database')
    
    app.listen('5000', () => {
        console.log('Server running on port 5000')
    })
}).catch((error) => {  
    console.error(error)
})