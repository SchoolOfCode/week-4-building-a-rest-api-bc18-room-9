import express from "express";
const app = express();
const PORT = 3000;

import {
  getQuotes,
  getQuoteByID,
  addQuote,
  editQuote,
  deleteQuote,
} from "./quote.js";

const quotes = await getQuotes();

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Welcome to the inspirational quotes API");
});

app.listen(PORT, function () {
  console.log(`Server is now listening on http://localhost:${PORT}`);
});

app.get("/quotes", (req,res) => {
  res.send(quotes);
})

app.get("/quotes/:id", async (req,res) => {
  const id = req.params.id;
  try {
  const specific_quote = await getQuoteByID(id);
  res.send(specific_quote);
  } catch (error) {
    console.error('Error gaining specific quote:', error);
  }
})


app.post('/quotes', async (req,res) =>{
  try {
    const {quoteText,author} = req.body;
    const data = await addQuote(quoteText,author)
    res.send(data);
  } catch (error) {
    console.error('Error editing an existing quote');
  }
})

app.patch('/quotes/:id', async (req,res) =>{
  try {
    const id = req.params.id;
    const {quoteText,author} = req.body;
    const edited_quote = await editQuote(id,quoteText,author);
    res.send(edited_quote);
  } catch (error) {
    console.error('Error editing an existing quote');
  }
}) 

app.delete('/quotes/:id', async (req,res) =>{
  try{
    const id = req.params.id;
    const removed_quote = await deleteQuote(id);
    res.send(removed_quote);
  } catch (error) {
    console.error("Error deleting an existing quote")
  }
})