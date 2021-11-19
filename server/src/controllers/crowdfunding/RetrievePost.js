const Crowdfunding = require("../../models/Crowdfunding");
const axios = require("axios");


 exports.getCrowdfundingPosts=async(req, res)=>{
    try {
       
      const Crowdfundings = await Crowdfunding.find({});
      console.log(Crowdfundings);
      return res.status(200).json({ Crowdfundings });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  };

  

  exports.getPost=async(req, res)=>{
    try {
      const Crowdfunding = await Crowdfunding.findById(req.params.id)
        .populate("studentID")
        .exec();
      if (Crowdfunding) {
        return res.status(200).json(Crowdfunding);
      } else {
        return res.status(404).json({ error: "Invalid Crowdfunding ID" });
      }
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  };

 