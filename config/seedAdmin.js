const User = require('../models/User');
const bcrypt = require('bcrypt');

const defaultUsers = [
  {
    username: 'admin',
    email: 'admin@procarport.com',
    password: 'ProCarportBuildings2025!',
    role: 'admin'
  },
  {
    username: 'staff',
    email: 'staff@procarport.com',
    password: 'ProCarportBuildings2025!',
    role: 'staff'
  }
];

const seedAdminUser = async () => {
  try {
    console.log('🔍 Checking for default users...');
    
    for (const userData of defaultUsers) {
      const userExists = await User.findOne({ username: userData.username });
      
      if (!userExists) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        const newUser = new User({
          username: userData.username,
          email: userData.email,
          password: hashedPassword,
          role: userData.role,
          isActive: true
        });

        await newUser.save();
        console.log(`✅ Created user: ${userData.username} (${userData.role})`);
      } else {
        console.log(`✓ User exists: ${userData.username}`);
      }
    }
    
    console.log('\n========================================');
    console.log('🔑 DEFAULT LOGIN CREDENTIALS:');
    console.log('========================================');
    defaultUsers.forEach(user => {
      console.log(`   👤 ${user.username.toUpperCase()}`);
      console.log(`      Username: ${user.username}`);
      console.log(`      Password: ${user.password}`);
      console.log(`      Role: ${user.role}`);
      console.log('   ---');
    });
    console.log('⚠️  CHANGE PASSWORDS AFTER FIRST LOGIN!');
    console.log('========================================\n');
    
  } catch (error) {
    console.error('❌ Error seeding users:', error);
  }
};

module.exports = seedAdminUser;