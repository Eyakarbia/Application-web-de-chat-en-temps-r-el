import { v4 as uuidv4 } from 'uuid';
import createMessage from "../models/messages.js"
import createCandidat from "../models/candidat.js"
import createMoniteur from "../models/moniteur.js"
import { Sequelize } from "sequelize";
const { DataTypes } = Sequelize;
import db from "../config/Database.js";




const Message = createMessage(db,DataTypes);
const Candidat = createCandidat(db,DataTypes);
const Moniteur = createMoniteur(db,DataTypes);
//for candidat moniteur
export const addMessage = async (req, res) => {
    const { messages, receiver } = req.body;
    // Check if the message field is null
    if (!messages) {
      return res.status(400).json({ error: 'Message cannot be empty' });
    }
  
    const eid = uuidv4();
    try {
      const sender_id = req.params.encrypted_id; //
      const newMessage = await Message.create({
        messages,
        sender: sender_id,
        encrypted_id: eid,
        receiver: receiver,
      });  
      const io = req.app.get('io');
      io.emit('my broadcast', newMessage);//send new message
    res.json("new message");
    } catch (error) {
      console.log(error);
      return res.status(404).json({ msg: "error" });
    }
  }
  
export const getAllMessages= async ( req, res) => {
    try {
        let message = await Message.findAll({});
               res.status(200).send(message);
        
         } catch (error){
             return res.status(404).json({msg: "problem"});
     
         } 
        }
//in progress
        export const loadOldMessages= async ( req, res) => {
            const chat = await Message.populate({path: 'messages', options: {limit: req.params.limit, sort: { createdAt: -1}}});
            res.json(chat.messages.reverse()) 
                }
     










































































                
export const getCandidatMessages= async ( req, res) => {
    try {
        let encrypted_id = req.params.encrypted_id;
        const candidat = await Candidat.findOne({ where: { id: encrypted_id }});
        if (!candidat) return res.status(404).json({ msg: "candidat not found" });

        let message = await Message.findAll({
            where: {
                sender: candidat.encrypted_id
            }
        });
               res.status(200).send(message);        
         } catch (error){
             return res.status(404).json({msg: "error"});    
         } 
}
export const getMoniteurMessages= async ( req, res) => {
    try {
        let encrypted_id = req.params.encrypted_id;
        const moniteur = await Moniteur.findOne({ where: { id: encrypted_id }});
        if (!moniteur) return res.status(404).json({ msg: "moniteur not found" });

        let message = await Message.findAll({
            where: {
                sender: moniteur.encrypted_id
            }
        });
               res.status(200).send(message);        
         } catch (error){
             return res.status(404).json({msg: "error"});    
         } 
}

