const asynHandler=require("express-async-handler");

const Contact=require("../models/contactModel");


const getContacts=asynHandler(async(req, res) => {
    const contacts=await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});

const createContacts=asynHandler(async(req, res) => {
    console.log("the req body is:",req.body);
    const{name,email,phno}=req.body;
    if(!name || !email || !phno){
        res.status(400);
        throw new Error("all fields are mandatory");
    }
    const contact=await Contact.create({
        name,
        email,
        phno,
        user_id: req.user.id,

    });
    res.status(201).json(contact);
});
const getContact=asynHandler(async(req, res) => {
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }
    res.status(200).json(contact);
});
const updateContact=asynHandler(async(req, res) => {
    const contact= await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found");   
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user contacts");
      }
    const updatedContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true
        }
    );


    res.status(200).json(updatedContact);
});
const deleteContact=asynHandler(async(req, res) => {
    const contact= await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found");   
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user contacts");
      }
      await Contact.deleteOne({ _id: req.params.id });
      res.status(200).json(contact);
});

module.exports={getContacts,createContacts,getContact,updateContact,deleteContact};