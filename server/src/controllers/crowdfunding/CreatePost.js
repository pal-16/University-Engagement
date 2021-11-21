const Student = require("../../models/Student");
const Faculty = require("../../models/Faculty");
const Crowdfunding = require("../../models/Crowdfunding");


exports.createPost=async(req, res)=>{
    try {

      const crowdfundingPost = await Crowdfunding.create({
        ...req.body
      });
        if(req.body.userType=="student"){
            await Student.findByIdAndUpdate(req.body.userID, {
                $push: { crowdfunding: crowdfundingPost }
            });
        }else{
        await Faculty.findByIdAndUpdate(req.body.userID, {
            $push: { crowdfunding: crowdfundingPost }
        });
        }
      return res.status(201).json({
        message: "Crowdfunding Post created"
      });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
}; 