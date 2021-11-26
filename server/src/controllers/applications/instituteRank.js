const Student = require("../../models/Student");
const axios = require("axios");


 exports.getStudentRank=async(req, res)=>{
    try {
      const users = await Student.find({});
      users.sort((a, b) => b.totalCoinsAchieved - a.totalCoinsAchieved);

    for (let i = 0; i < users.length; i++) {
      let totalPoints = users[i].totalCoinsAchieved;
      let usersWithRank = users.filter(user => user.totalCoinsAchieved === totalPoints);
      for (let user of usersWithRank) {
        
        user.rank = i + 1;
        if(user._id==req.params.id){
          return res.status(200).json({ "message":user.rank});
        }
      }
      i += usersWithRank.length - 1;
    }
    await users.save();
    console.log(users);
      return res.status(200).json({ applications });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  };

