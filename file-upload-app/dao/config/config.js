'use strict';
let env = 'dev';

let props = {
  dev: {
    port: 3002,
    mongodb: "mongodb://localhost:27017/eylotte-dev",
    rpc: "http://127.0.0.1:8545",
    //for docker-compose
    //mongodb: 'mongodb://mongo/eynode-dev',
    clienturl: 'http://localhost:3000',
    sendgridKey: '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',
    fromEmail: 'lottetest@ey.com',
    emailBody: 'Click here to register',
    emailSubject: 'Airdrop Promotion',
    twilioSid: 'AC4c71f2ed9a776212bda604d0b5eb7f26',
    twilioToken: 'b427d188fa20fbfec8248fe35a98f75b',
    fromSMS: '+13342924942',
    otpSubject: 'OTP for Verificarion in Lottecard',
    otpBody:'Your OTP for verification is'
  },
  prod: {
    port: 3002,
    mongodb: process.env.MONGO_DB || "mongodb://localhost:27017/eylotte-dev",
    mongodb_user: process.env.MONGODB_USER,
    mongodb_password: process.env.MONGODB_PASSWORD,
    rpc: process.env.QUORUM_RPC || "http://ganache:8545",
    //for docker-compose
    //mongodb: 'mongodb://mongo/eynode-dev',
    clienturl: process.env.CLIENT_URL || 'http://localhost:3000',
    sendgridKey: process.env.SEND_GRID_KEY || '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',
    fromEmail: process.env.FROM_EMAIL || 'lottetest@ey.com',
    emailBody: process.env.EMAIL_BODY || '클릭하여 가입하기',
    emailSubject: process.env.EMAIL_SUBJECT || '에어드랍 프로모션 ',
    twilioSid: process.env.TWILIO_SID || 'AC4c71f2ed9a776212bda604d0b5eb7f26',
    twilioToken: process.env.TWILIO_TOKEN || 'b427d188fa20fbfec8248fe35a98f75b',
    fromSMS: process.env.SMS_NUMBER || '+13342924942',
    otpSubject: process.env.OTP_SUBJECT || 'OTP for Verification in Lottecard',
    otpBody:process.env.OTP_BODY || 'Your OTP for verification is'
  }
};



let setEnv = environment => {
  if (props[environment]) {
    env = environment;
  }
};

let getProps = () => {
  return props[env];
};

let getSecret = () => {
  return "JWT TOKENS"
}

module.exports.setEnv = setEnv;
module.exports.getProps = getProps;
module.exports.getSecret = getSecret;
