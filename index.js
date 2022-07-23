import express from 'express'
import cors from 'cors'

const app =  express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.get('/', (req, res) => {
    res.send('this is working now.');
});

app.listen(5000, () => {
    console.log('running on port 5000')
})