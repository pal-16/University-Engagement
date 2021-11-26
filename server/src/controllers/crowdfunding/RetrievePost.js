const Crowdfunding = require("../../models/Crowdfunding");
const axios = require("axios");
const Student = require("../../models/Student");


 exports.getCrowdfundingPosts=async(req, res)=>{
    try {
       
      const Crowdfundings = await Crowdfunding.find({}).populate('userID');
      return res.status(200).json({ Crowdfundings });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  };

  

  exports.getPost=async(req, res)=>{
    try {
      const Crowdfunding = await Crowdfunding.findById(req.params.id).populate('userID');
      if (Crowdfunding) {
        return res.status(200).json(Crowdfunding);
      } else {
        return res.status(404).json({ error: "Invalid Crowdfunding ID" });
      }
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  };

  exports.getUserPosts=async(req, res)=> {
    try {
      console.log(req.params.id);
      const posts = await Crowdfunding.find({userID:req.params.id})
 console.log(posts);
      return res.status(200).json({ posts });
    } catch (e) {
      console.log(e.message);
      return res.status(500).json({ error: e.message });
    }
  };