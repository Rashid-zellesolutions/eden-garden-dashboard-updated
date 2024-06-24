const UserModel = require('../../Model/UserSchema')

const getAllUsers = async (req, res) => {
    try {
      const users = await UserModel.find({}, 'fullName userName email idNumber role lastLogin dateAdded profileImagePath');
  
      // Map through users to format data as needed
      const formattedUsers = users.map(user => ({
        _id: user._id,
        fullName: user.fullName,
        userName: user.userName,
        email: user.email,
        idNumber: user.idNumber,
        role: user.role,
        lastLogin: user.lastLogin,
        dateAdded: user.dateAdded,
        profileImagePath: user.profileImagePath // This assumes profileImagePath contains the path to the images
      }));
  
      res.status(200).json({ users: formattedUsers });
    } catch (error) {
      console.error("Error occurred while fetching users:", error);
      res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = getAllUsers;
  