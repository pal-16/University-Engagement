const Student = require("../../models/Student");
const Faculty = require("../../models/Faculty");
const Transaction = require("../../models/Transaction");
const Crowdfunding = require("../../models/Crowdfunding");
const axios = require("axios");

exports.donateCoins=async(req, res)=>{
    try {
        let post = await Crowdfunding.findById(req.body.postID);
        if (!post) {
          return res.status(404).json({ error: "Invalid Post ID" });
        }
    
        if (post.status !== "Pending")
          return res.status(404).json({ error: "Only pending posts can be donated coins" });

              let student = await Student.findById(req.body.senderID);
              if (!student) {
                return res.status(404).json({ error: "Invalid Student ID" });
              }
            
              var extra = "not exceeded";
              post.currentAmount=post.currentAmount+req.body.donateAmount;
              if(post.currentAmount>post.amountNeeded){
                post.status="Completed";
               
                extra="exceeded";
              }else if(post.currentAmount==post.amountNeeded)
              post.status="Completed";
               
              if(extra =="exceeded")
              student.coins=student.coins-req.body.donateAmount+(post.currentAmount-post.amountNeeded);
              else
              student.coins=student.coins-req.body.donateAmount;
              await post.save();
              await student.save();
      
              const newTransaction = new Transaction({
                senderID: req.body.senderID,
                senderType: "student",
                receiverID: req.body.receiverID,
                receiverType: "student",
                coins: req.body.donateAmount
              });
           
              await newTransaction.save();
              await Student.findByIdAndUpdate(req.body.senderID, {
                $push: { transfer: newTransaction._id }
              });
              await Student.findByIdAndUpdate(req.body.receiverID, {
                $push: { transfer: newTransaction._id }
              });
              if(extra == "exceeded")
              return res.status(200).json({ message: "You had contributed few additional coins as asked in the post, we have added remaining coins back to your wallet" });
              
              return res.status(200).json({ message: "Amount donated" });
              
      } catch (e) {

        return res.status(500).json({ error: e.message });

      }
  
  };
  
  