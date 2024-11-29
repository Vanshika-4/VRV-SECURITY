import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import cookieParser from 'cookie-parser'
import DbCon from './utils/db.js'
import AuthRoutes from './routes/Auth.js'
import AdminRoutes from './routes/AdminRoutes.js'

dotenv.config()

const PORT = process.env.PORT || 3000  //4000
const app = express()

// mongo db
DbCon()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true 
}));

app.use('/api/auth', AuthRoutes)
app.use('/api/admin', AdminRoutes)

app.get('/', (req,res) => {
    res.send('test')
})

app.listen(PORT, () => {
    console.log('server is running on ${PORT}');
})