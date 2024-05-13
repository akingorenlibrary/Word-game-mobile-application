import { Word } from "../models/wordModel.js";

const addWord = async (req, res) => {
    const {word, wordCount}=req.body;

    try {
        const add = new Word({
            word: word,
            wordCount:wordCount
        });
        await add.save();
        return res.json({process:true, message:"Kelime kaydedildi."});
    } catch (error) {
        console.error("Error adding word:", error.message);
        return res.json({process:false, message:"Hata oluştu"});
    }
};

const wordControl = async (req, res) => {
    const {word}=req.body;

    try {
        const result = await Word.findOne({ word: word });
        if (result) {
            return res.json({exist:true, process:true, message:"Böyle bir kelime var."});
        } else {
            return res.json({exist:false, process:true, message:"Böyle bir kelime var."});
        }
    } catch (error) {
        console.error("Error searching for word:", error.message);
        return res.json({process:false, message:"Hata oluştu"});
    }
};

const getWord=async (req, res)=>{
    const {wordCount}=req.body;

    try {
        const result = await Word.find({ wordCount: wordCount });
        if (result) {
            return res.json({process:true, result:result});
        } else {
            return res.json({process:false, message:"Veritabanında kelime yok"});
        }
    } catch (error) {
        console.error("Error searching for word:", error.message);
        return res.json({process:false, message:"Hata oluştu"});
    }
};

export { addWord, wordControl, getWord};
