const nodemailer = require("nodemailer");
require("dotenv").config();

const EmailSubscribe = async (req, res) => {
    const { email } = req.body;
    try {
        if (!email) {
            return res.status(400).json({
                status: 400,
                message: "Required Booking parameters are missing",
            });
        }

        const transporter = nodemailer.createTransport({
            port: 465,
            service: "webmail", // Use lowercase "gmail" for the service
            secure: true,
            host: "mail.zameeransari.com.pk",
            tls: {
                rejectUnauthorized: false, // Allow less secure apps (not recommended)
            },
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        await new Promise((resolve, reject) => {
            // verify connection configuration
            transporter.verify(function (error, success) {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    console.log("Server is ready to take our messages");
                    resolve(success);
                }
            });
        });

        const template = `<!doctype html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <title>Simple Transactional Email</title>
            <style>
        
                @media only screen and (max-width: 480px) {
                  table.body .centerDiv{
                        width: 100% !important;
                    }
                    table.body .desktop_view{
                        display: none !important;
                    }
                    table.body .mobile_view{
                        display: block !important;
                    }
                    table.body  .td1pt{
                        padding-top: 0px !important;
                        text-align: center !important;
                    }
                    table.body .otherDiv{
                        width: 0% !important;
                    }
                    table.body .centerDiv{
                      height: 450px !important;
                      max-height: 500px !important;
                    }
                    table.body h3{
                      text-align: center !important;
                    }
                    
                }
            </style>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f4f4f4;">
          <div style="
          background-image: url('https://enviovista.com/wp-content/uploads/2023/09/Schedule-Demo-background-1.png');
          background-size:cover; 
          background-position:center;
          background-repeat: no-repeat;
          max-height: 1100px;
          
          height: 800px;
          width: 100%;  margin: 0 auto;
          /* height: 100%; */
          z-index: -1; 
          ">
            <table class="body" style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;width: 100%; max-width: 600px; margin: 0 auto; background-color: white; border-collapse: collapse;border: 0px solid black; border-radius: 10px 10px 10px 10px">
              <tr>
                <td style="padding: 20px;">
             
                    <h1 style="font-family: 'Montserrat', sans-serif; font-size: 24px;text-align: center; font-weight: bold; color: #353E49;">APPOINTMENT CONFIRMED</h1>
                
                  <table  style=" width: 100%;margin-top: 20px;">
                    <tr>
                      <td>
                        <img src="https://cdn-icons-png.flaticon.com/128/5610/5610944.png"  alt="Description of the image" width="70px" height="70px" style="display: block; margin: 0 auto;text-align: center;">
                      </td>
                    </tr>
                  </table>
              <table style="width: 100%;margin-top: 20px;">
                    <tr>
                      <td  style=" padding: 10px;width: 10%;">
         
                      </td>
                      <td  style=" padding: 10px;width: 80%;">
                        <h3 style="font-family: 'Montserrat', sans-serif;text-align: center;font-size: 18px; font-weight: bold; color: #353E49;">Name Of Person</h3>
                        <!-- <h3 style="font-family: 'Montserrat', sans-serif;text-align: center; font-size: 18px; font-weight: bold; color: #353E49;">{{$data['company_name']}}</h3>
                        <h3 style="font-family: 'Montserrat', sans-serif;text-align: center; font-size: 18px; font-weight: bold; color: #353E49;">{{$data['type']}}</h3> -->
                      </td>
                      <td  style=" padding: 10px;width: 10%;">
                      </td>
                    </tr>
                  </table>
                  <table  style="margin-top: 20px;">
                    <tr>
                      <td  style=" padding: 10px;width: 30.33%;">
                        <h3 style="font-family: 'Montserrat', sans-serif; text-align: center;font-size: 16px; font-weight: normal; color: grey;">Service</h3>
                        <h3 style="font-family: 'Montserrat', sans-serif; text-align: center;font-size: 16px; font-weight: bold; color: #B78953;">Appointment</h3>
                      </td>
                      <td  style=" padding: 10px;width: 39.33%;">
                        <h3 style="font-family: 'Montserrat', sans-serif; text-align: center;font-size: 16px; font-weight: normal; color: grey;">Date & Time</h3>
                        <h3 style="font-family: 'Montserrat', sans-serif;text-align: center; font-size: 16px; font-weight: bold; color: #B78953;">10 April 2024</h3>
                        <h3 style="font-family: 'Montserrat', sans-serif;text-align: center; font-size: 16px; font-weight: bold; color: #B78953;">10Am - 12Pm</h3>
                      </td>
                      <td  style=" padding: 10px;width: 30.33%;">
                        <h3 style="font-family: 'Montserrat', sans-serif;text-align: center; font-size: 16px; font-weight: normal; color: grey;">City</h3>
                        <h3 style="font-family: 'Montserrat', sans-serif;text-align: center; font-size: 16px; font-weight: bold; color: #B78953;">New York</h3>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px;text-align: center;">
                  <a href="{{ $data['calendarUrl'] }}" style="display: inline-block; padding: 10px 20px; background-color: #B78953; color: white; text-decoration: none; font-family: 'Montserrat', sans-serif; font-size: 16px; font-weight: bold;">Add To Calendar</a>
                </td>
              </tr>
              
              <tr >
                <td style="width: 100%;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;height: 100%;background-color: #353E49;border: 0px;border-collapse: collapse;border-radius: 0px 0px 0px 0px">
                        <tr class="desktop_view" >
                           
                            <td  style="padding-top: 18px;text-align: center;width: 33.33%; vertical-align: top;">
                                <a target="_blank" style="text-decoration: none;justify-content: center;  align-items: center;text-align: center;" href="https://enviovista.com">
                                    <img src="https://edengardensbanquet.com/wp-content/uploads/2024/01/EG-Logo-2.png" alt="" height="40px" width="100px" srcset="">
                                    
                                </a>
                               
                            </td>
                            <td  style="padding-top: 18px; text-align: center;width: 33.33%;vertical-align: top;">
                          
                              <div  style=" padding: 6px;text-align: center">
                                <a target="_blank" style="text-decoration: none; padding: 5px;" href="https://www.facebook.com/enviobyvista">
                                    <img src="https://firebasestorage.googleapis.com/v0/b/envio-a1866.appspot.com/o/facebook.png?alt=media&token=03a5efab-8696-4604-8390-f0723cf11519" alt="" height="20px" width="20px" srcset="">
                                </a>
                                <a target="_blank" style="text-decoration: none; padding: 5px;" href="https://www.instagram.com/enviobyvista/?igshid=MzRlODBiNWFlZA%3D%3D">
                                    <img src="https://firebasestorage.googleapis.com/v0/b/envio-a1866.appspot.com/o/instagram.png?alt=media&token=30c5df13-e847-45b3-aa05-2aa6c354ad61" alt="" height="20px" width="20px" srcset="">
                                </a>
                                <a target="_blank" style="text-decoration: none; padding: 5px;" href="https://www.youtube.com/channel/UCvk1qK5_ofvfjPFguwK1D0Q">
                                    <img src="https://firebasestorage.googleapis.com/v0/b/envio-a1866.appspot.com/o/yaotube.png?alt=media&token=7161e535-1f5a-4f2c-90e7-713b4122ac58" alt="" height="20px" width="20px" srcset="">
                                </a>
                                <a target="_blank" style="text-decoration: none; padding: 5px;" href="https://www.tiktok.com/@enviobyvista?_t=8ex2qmZjCkI&_r=1">
                                    <img src="https://firebasestorage.googleapis.com/v0/b/envio-a1866.appspot.com/o/tik-tok.png?alt=media&token=b91552e6-bcc1-41de-8e43-acf1559172e5" alt="" height="20px" width="20px" srcset="">
                                </a>
                                <a  style=" text-decoration: none;" href="">
                                    
                                    <h3 style="margin-left: 5px;font-family: 'Montserrat', sans-serif; text-align: center;font-size: 14px; font-weight: normal; color: white;">Follow Us</h3>
                                </a>
                             </div>
                            </td>
                            <td   style="padding-top: 10px; text-align: center;width: 33.33%;vertical-align: top;">
                             
                                <a  target="_blank" style=" height: 33px;  text-decoration: none;  align-items: center;justify-content: center;" href="https://enviovista.com">
                                   
                                    <h3 style="margin-left: 5px; font-family: 'Montserrat', sans-serif; text-align: start;font-size: 14px; font-weight: normal; color: white;"> <img src="https://firebasestorage.googleapis.com/v0/b/envio-a1866.appspot.com/o/web.png?alt=media&token=424096eb-7892-48f4-bf08-f71d20303d98" alt="" height="17px" width="17px" srcset="">&nbsp;&nbsp;&nbsp;https://enviovista.com</h3>
                                  </a>
                                    <a style="height: 33px; text-decoration: none;justify-content: center;  align-items: center;text-align: center;" href="">
                                     
                                      <h3 style="margin-left: 5px;font-family: 'Montserrat', sans-serif; text-align: start;font-size: 14px; font-weight: normal; color: white;"> <img src="https://firebasestorage.googleapis.com/v0/b/envio-a1866.appspot.com/o/email.png?alt=media&token=8ae0eed8-6e1b-4fb4-809e-4347a41d5138" alt="" height="17px" width="17px" srcset="">&nbsp;&nbsp;&nbsp;info@enviovista.com</h3>
                                  </a>
                                  <a style="height: 33px; text-decoration: none;justify-content: center;  align-items: center;text-align: center;" href="">
                                   
                                    <h3 style="margin-left: 5px;font-family: 'Montserrat', sans-serif; text-align: start;font-size: 14px; font-weight: normal; color: white;"> <img src="https://firebasestorage.googleapis.com/v0/b/envio-a1866.appspot.com/o/phone.png?alt=media&token=4de98f07-d0e0-4401-a8e7-e04b48b59d18" alt="" height="17px" width="17px" srcset="">&nbsp;&nbsp;&nbsp;1-833-888-2741</h3>
                                </a>
                            
                            </td>
                            
                          
                        </tr>
        
                        <tr class="mobile_view" style="display: none;">
                            <td  style="padding-top: 18px;text-align: center;width: 10.33%; vertical-align: top;">
                                <a target="_blank" style="text-decoration: none;justify-content: center;  align-items: center;text-align: center;" href="https://enviovista.com">
                                    <img src="https://edengardensbanquet.com/wp-content/uploads/2024/01/EG-Logo-2.png" alt="" height="40px" width="100px" srcset="">
                                    
                                </a>
                                <div style="height: 1px; width: 100%; background-color: white; margin-top: 10px;"></div>
                               
                            </td>
                        </tr>
                        <tr class="mobile_view" style="display: none;">
                            <td  style="padding-top: 18px; text-align: center;width: 10.33%;vertical-align: top;">
                                
                                <div  style=" padding: 6px;text-align: center">
                                  <a target="_blank" style="text-decoration: none; padding: 5px;" href="https://www.facebook.com/enviobyvista">
                                      <img src="https://firebasestorage.googleapis.com/v0/b/envio-a1866.appspot.com/o/facebook.png?alt=media&token=03a5efab-8696-4604-8390-f0723cf11519" alt="" height="20px" width="20px" srcset="">
                                  </a>
                                  <a target="_blank" style="text-decoration: none; padding: 5px;" href="https://www.instagram.com/enviobyvista/?igshid=MzRlODBiNWFlZA%3D%3D">
                                      <img src="https://firebasestorage.googleapis.com/v0/b/envio-a1866.appspot.com/o/instagram.png?alt=media&token=30c5df13-e847-45b3-aa05-2aa6c354ad61" alt="" height="20px" width="20px" srcset="">
                                  </a>
                                  <a target="_blank" style="text-decoration: none; padding: 5px;" href="https://www.youtube.com/channel/UCvk1qK5_ofvfjPFguwK1D0Q">
                                      <img src="https://firebasestorage.googleapis.com/v0/b/envio-a1866.appspot.com/o/yaotube.png?alt=media&token=7161e535-1f5a-4f2c-90e7-713b4122ac58" alt="" height="20px" width="20px" srcset="">
                                  </a>
                                  <a target="_blank" style="text-decoration: none; padding: 5px;" href="https://www.tiktok.com/@enviobyvista?_t=8ex2qmZjCkI&_r=1">
                                      <img src="https://firebasestorage.googleapis.com/v0/b/envio-a1866.appspot.com/o/tik-tok.png?alt=media&token=b91552e6-bcc1-41de-8e43-acf1559172e5" alt="" height="20px" width="20px" srcset="">
                                  </a>
                                  <a  style=" text-decoration: none;" href="">
                                      
                                      <h3 style="margin-left: 5px;font-family: 'Montserrat', sans-serif; text-align: center;font-size: 14px; font-weight: normal; color: white;">Follow Us</h3>
                                  </a>
                               </div>
                              </td>
                        </tr>
                        
                        <tr class="mobile_view" style="display: none;">
                            <td class="td1pt"  style=" text-align: center;width: 10.33%;vertical-align: top;">
                                 <div style="height: 1px; width: 100%; background-color: white;"></div>
                                 <div style="height: 5px;"></div>
                                <a  target="_blank" style=" height: 20px;  text-decoration: none;  align-items: center;justify-content: center;" href="https://enviovista.com">
                                   
                                    <h3 style="margin-left: 5px; font-family: 'Montserrat', sans-serif; text-align: center;font-size: 14px; font-weight: normal; color: white;"> <img src="https://firebasestorage.googleapis.com/v0/b/envio-a1866.appspot.com/o/web.png?alt=media&token=424096eb-7892-48f4-bf08-f71d20303d98" alt="" height="17px" width="17px" srcset="">&nbsp;&nbsp;&nbsp;https://enviovista.com</h3>
                                  </a>
                                    <a style="height: 33px; text-decoration: none;justify-content: center;  align-items: center;text-align: center;" href="">
                                     
                                      <h3 style="margin-left: 5px;font-family: 'Montserrat', sans-serif; text-align: center;font-size: 14px; font-weight: normal; color: white;"> <img src="https://firebasestorage.googleapis.com/v0/b/envio-a1866.appspot.com/o/email.png?alt=media&token=8ae0eed8-6e1b-4fb4-809e-4347a41d5138" alt="" height="17px" width="17px" srcset="">&nbsp;&nbsp;&nbsp;info@enviovista.com</h3>
                                  </a>
                                  <a style="height: 33px; text-decoration: none;justify-content: center;  align-items: center;text-align: center;" href="">
                                   
                                    <h3 style="margin-left: 5px;font-family: 'Montserrat', sans-serif; text-align: center;font-size: 14px; font-weight: normal; color: white;"> <img src="https://firebasestorage.googleapis.com/v0/b/envio-a1866.appspot.com/o/phone.png?alt=media&token=4de98f07-d0e0-4401-a8e7-e04b48b59d18" alt="" height="17px" width="17px" srcset="">&nbsp;&nbsp;&nbsp;1-833-888-2741</h3>
                                </a>
                            
                            </td>
                        </tr>
                        <tr>
                          <td colspan="3" style="background-color: #B78953; text-align: center; padding: 10px;border-radius: 0px 0px 0px 0px">
                            <h3 style="margin: 0; font-family: 'Montserrat', sans-serif;text-align: center; font-size: 12px; font-weight: semi-bold; color: #FFF;">Envio by Vista - Tracking Every Second of Every Delivery Mile</h3>
                          </td>
                      </tr>
                        
                      </table>
                </td>
                
              </tr>
            </table>
          </div>
        </body>
        </html>`;

        const UserEmailOptions = {
            from: `${process.env.EMAIL_USERNAME} <${process.env.EMAIL}>`,
            // bcc: [
            //   "osama.zellesolutions@gmail.com",
            // ],
            to: `${email}`,
            subject: "Your Email Subscribe",
            html: template,
        };

        await new Promise((resolve, reject) => {
            // send mail
            transporter.sendMail(UserEmailOptions, (err, info) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    console.log(info);
                    resolve(info);
                }
            });
        });

        res.status(200).json({
            status: 200,
            message: "Email Subscribe Successfully",
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
    }
};

module.exports = EmailSubscribe;
