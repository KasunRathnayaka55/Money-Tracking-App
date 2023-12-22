import express from 'express'
import cors from 'cors'
import mongoose, { Schema, model } from 'mongoose';

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/test', (req, res) => {
    res.json("test ok 2")
});

const TransactionSchema = new Schema({
    name: {type:String, required:false},
    price: {type:Number, required:false},
    description: {type:String, required:false},
    date: {type:Date, required:false},
})

const TransactionModel = model('Transaction',TransactionSchema)

app.post('/api/transaction', async (req, res) => {
    await mongoose.connect('mongodb+srv://money-tracker:jrBzq4XpINrYVN4m@cluster0.swysric.mongodb.net/?retryWrites=true&w=majority')
    const {name,price,description,date} = req.body
    const transaction = TransactionModel.create({name,price,description,date})
    res.json(transaction)
});

app.get('/api/transactions', async (req, res) => {
    await mongoose.connect('mongodb+srv://money-tracker:jrBzq4XpINrYVN4m@cluster0.swysric.mongodb.net/?retryWrites=true&w=majority')
    const transactions = await TransactionModel.find()
    res.json(transactions)
});

app.listen(3000, () => {
    console.log('App listening on port 3000!')
});
//a4V3is30F2048x1M