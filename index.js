const express = require('express');
const alert = require('alert');
//const morgan = require('morgan');
//const { Prohairesis } = require('prohairesis')
const bodyParser = require('body-parser');

// config.js 
const mysql = require('mysql');
const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"byt",
    multipleStatements: true
});

con.connect((err)=>{
    if(err){
        console.log("error in connection");
    }
    else 
    {
        console.log("connection");
    }
})
module.exports = con;


const app = express();
const port = process.env.PORT || 8080;

// app.set('views',path.join(__dirname,'views'));
//app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine','ejs');
app.use(express.json());

app
    //.use(morgan('dev'))
    .use(express.static('public'))
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    
    .get('/',(req,res)=>{
        res.render('index2');    //login
     })
     .get('/signup',(req,res)=>{
        res.render('signup');        //SignUp form
     })
    
    .get('/login',(req,res)=>{
    res.render('login');         //login form
    })
    .get('/delete',(req,res)=>{
        res.render('delete');
    })
    .get('/gokarna',(req,res)=>{
            res.render('gokarna');
    })
    .get('/kumta',(req,res)=>{
            res.render('kumta');
    })
    .get('/narasimha',(req,res)=>{
             res.render('narasimha');
    })
    .get('/skandagiri',(req,res)=>{
        res.render('skandagiri');
            })
    .get('/wayanad',(req,res)=>{
            res.render('wayanad');
   })
   .get('/reviews',(req,res)=>{
    res.render('reviews');
    })
    .get('/index2', (req, res) => {
      res.render('index2');
   })
    .get('/update',(req,res)=>{
        res.render('update');
    })
    .get('/nethravathi',(req,res)=>{
        res.render('nethravathi');             //nethravathi
        })



    app.post('/signup',(req,res)=>{
   console.log(req.body);
   const First_name = req.body.First_name;
   const Last_name = req.body.Last_name;
   const Username = req.body.Username;
   const email_id = req.body.email_id;
   const Address = req.body.Address;
   const Phone = req.body.Phone;
   const password = req.body.Password;
 
   var sql = "INSERT INTO signup(First_name,Last_name,Username,email_id,Address,Phone,Password)VALUES('"+First_name+"','"+Last_name+"','"+Username+"','"+email_id+"','"+Address+"','"+Phone+"','"+password+"'); INSERT INTO login(email_id,Password)VALUES('"+email_id+"','"+password+"'); INSERT INTO users(First_name,Last_name,email_id,Address,Phone_no,Password)VALUES('"+First_name+"','"+Last_name+"','"+email_id+"','"+Address+"','"+Phone+"','"+password+"')";
   con.query(sql,function(err,result){
       if(err) throw err;
       //alert("Registration successfull");
       res.redirect("/login");
   }) 
   }) //post signup


   
   app.post('/delete', (req, res) => {
    console.log(req.body);
    const email_id = req.body.email_id;
    const password = req.body.Password;
  
    var checkSql = "SELECT * FROM signup WHERE email_id=? AND Password=?";
    con.query(checkSql, [email_id, password], function (err, result) {
      if (err) {
        console.log("Error Occurred: " + err);
        res.redirect("/index");
      } else {
        if (result.length === 0) {
          alert("Incorrect email or password!");
          res.redirect("/delete");
        } else {
          var deleteSql = "DELETE FROM signup WHERE email_id=?; DELETE FROM users WHERE email_id=?; DELETE FROM login WHERE email_id=?";
          con.query(deleteSql, [email_id, email_id, email_id], function (err, result) {
            if (err) {
              console.log("Error Occurred: " + err);
              res.redirect("/index2");
            } else {
              alert("Deleted Account Successfully!");
              res.redirect("/index2");
            }
          });
        }
      }
    });
  }); //post delete

    app.post('/reviews',(req,res)=>{
        console.log(req.body);
        const Dest_name = req.body.destination;
        const Ratings = req.body.ratings;
        const Feedback = req.body.feedback;
        const Suggestions = req.body.suggestions;
        const email_id = req.body.email_id
        
      
       var sql = "INSERT INTO reviews(email_id,Ratings,Feedback,Suggestions,Dest_name)VALUES('"+email_id+"','"+Ratings+"','"+Feedback+"','"+Suggestions+"','"+Dest_name+"')";
            con.query(sql,function(err,result){
                if(err) {throw err;}
                 res.redirect("/index2");
            })
        })//reviews


    // app.post('/update',(req,res)=>{
    //         console.log(req.body);
    //         const First_name = req.body.First_name;
    //         const Last_name = req.body.Last_name;
    //         const User_name = req.body.User_name;
    //         const email = req.body.email_id;
    //         const Address = req.body.Address;
    //         const Phone = req.body.Phone;
    //         const password1= req.body.password;
                    
            
    //         con.query('CALL update_user(?, ?, ?, ?, ?, ?, ?)',[email,First_name,Last_name,Address,Phone,password1,User_name], (error, results) => {
    //             if (results.length > 0) {
    //                 res.redirect('/index');
    //                 alert('Successfully Updated the Details!!');
    //             }
    //             else {
    //                 res.redirect('/index');
    //                 alert("Incorrect credentials entered");
    //             }
    //         });
    //         }) //update

            app.post('/update', (req, res) => {
                console.log(req.body);
                const First_name = req.body.First_name;
                const Last_name = req.body.Last_name;
                const User_name = req.body.Username;
                const email = req.body.email_id;
                const Address = req.body.Address;
                const Phone = req.body.Phone;
                const password1 = req.body.password;
              
                con.query("SELECT * FROM signup WHERE email_id = ? AND password = ?", [email, password1], (error, results) => {
                  if (error || results.length === 0) {
                    res.redirect('/update');
                    alert("Incorrect email or password");
                  } else {
                    con.query("CALL update_user(?, ?, ?, ?, ?, ?, ?)", [email, First_name, Last_name, Address, Phone, password1, User_name], (error, results) => {
                      if (error) {
                        // res.redirect('/update');
                        // alert("Error updating details");
                        throw(error);
                      } else {
                        res.redirect('/index2');
                        alert('Successfully Updated the Details!!');
                      }
                    });
                  }
                });
              });
               //update

            
            
            var email_id = '';
           var password = '';
           app.post("/login", function (req, resp) {
               email_id = req.body.email_id;
               password = req.body.Password;
               var sql = "SELECT email_id,password FROM login WHERE email_id = ? AND Password = ?";
               con.query(sql, [email_id, password], function (error, results) {
                   if (results.length > 0) {
                       resp.redirect('/index2');
                       alert('Successfully logged in!!');
                   }
                   else {
                       resp.redirect("/signup");
                       alert("Incorrect username or password! Please signup");
                   }
               })
           });

            app.post('/nethravathi',(req,res)=>{
                if(!email_id) {
                    res.redirect("/login");
                    alert("Please login for Booking your trek!")
                    return;
                }
                console.log(req.body);
                const Dest_name1 = req.body.Dest_name;
                const Trek_Distance= req.body.Trek_Distance;
                const Pickup_point = req.body.Pickup_point;
                const No_of_Members = req.body.No_of_Members;
                const Date= req.body.Date;
                const Mode_of_payment= req.body.Mode_of_payment;
                const Cost= req.body.Cost;
                const Coupons= req.body.Coupons;
                const totalcost=(No_of_Members*Cost);
                const discount=((No_of_Members*Cost)*Coupons);
                const finalcost=(totalcost-discount)
                var sql = "INSERT INTO destination(Dest_name,Trek_Distance,Pickup_point,email_id)VALUES(?,?,?,?); INSERT INTO booking(No_of_Members,Date,email_id)VALUES(?,?,?); INSERT INTO payment(Mode_of_payment,Cost,Coupons,email_id)VALUES(?,?,?,?)";
                con.query(sql, [Dest_name1, Trek_Distance, Pickup_point, email_id, No_of_Members, Date, email_id, Mode_of_payment, finalcost, Coupons, email_id], function(err,result){
                    if(err){
                        throw(err);
                        //res.redirect("/login");
                        //alert("Please login for Booking your trek!")
                    }
                    else{
                          email_id = '';
                          password = '';
                        alert("Booking Completed!!")
                        res.redirect("/index2");
                    }
                }) 
            });


            app.post('/gokarna',(req,res)=>{
                if(!email_id) {
                    res.redirect("/login");
                    alert("Please login for Booking your trek!")
                    return;
                }
                console.log(req.body);
                const Dest_name1 = req.body.Dest_name;
                const Trek_Distance= req.body.Trek_Distance;
                const Pickup_point = req.body.Pickup_point;
                const No_of_Members = req.body.No_of_Members;
                const Date= req.body.Date;
                const Mode_of_payment= req.body.Mode_of_payment;
                const Cost= req.body.Cost;
                const Coupons= req.body.Coupons;
                const totalcost=(No_of_Members*Cost);
                const discount=((No_of_Members*Cost)*Coupons);
                const finalcost=(totalcost-discount)
                var sql = "INSERT INTO destination(Dest_name,Trek_Distance,Pickup_point,email_id)VALUES(?,?,?,?); INSERT INTO booking(No_of_Members,Date,email_id)VALUES(?,?,?); INSERT INTO payment(Mode_of_payment,Cost,Coupons,email_id)VALUES(?,?,?,?)";
                con.query(sql, [Dest_name1, Trek_Distance, Pickup_point, email_id, No_of_Members, Date, email_id, Mode_of_payment, finalcost, Coupons, email_id], function(err,result){
                    if(err){
                        throw(err);
                        //res.redirect("/login");
                        //alert("Please login for Booking your trek!")
                    }
                    else{
                          email_id = '';
                          password = '';
                        alert("Booking Completed!!")
                        res.redirect("/index2");
                    }
                }) 
            });

            app.post('/narasimha',(req,res)=>{
                if(!email_id) {
                    res.redirect("/login");
                    alert("Please login for Booking your trek!")
                    return;
                }
                console.log(req.body);
                const Dest_name1 = req.body.Dest_name;
                const Trek_Distance= req.body.Trek_Distance;
                const Pickup_point = req.body.Pickup_point;
                const No_of_Members = req.body.No_of_Members;
                const Date= req.body.Date;
                const Mode_of_payment= req.body.Mode_of_payment;
                const Cost= req.body.Cost;
                const Coupons= req.body.Coupons;
                const totalcost=(No_of_Members*Cost);
                const discount=((No_of_Members*Cost)*Coupons);
                const finalcost=(totalcost-discount)
                var sql = "INSERT INTO destination(Dest_name,Trek_Distance,Pickup_point,email_id)VALUES(?,?,?,?); INSERT INTO booking(No_of_Members,Date,email_id)VALUES(?,?,?); INSERT INTO payment(Mode_of_payment,Cost,Coupons,email_id)VALUES(?,?,?,?)";
                con.query(sql, [Dest_name1, Trek_Distance, Pickup_point, email_id, No_of_Members, Date, email_id, Mode_of_payment, finalcost, Coupons, email_id], function(err,result){
                    if(err){
                        throw(err);
                        //res.redirect("/login");
                        //alert("Please login for Booking your trek!")
                    }
                    else{
                          email_id = '';
                          password = '';
                        alert("Booking Completed!!")
                        res.redirect("/index2");
                    }
                }) 
            });
                

            app.post('/skandagiri',(req,res)=>{
                if(!email_id) {
                    res.redirect("/login");
                    alert("Please login for Booking your trek!")
                    return;
                }
                console.log(req.body);
                const Dest_name1 = req.body.Dest_name;
                const Trek_Distance= req.body.Trek_Distance;
                const Pickup_point = req.body.Pickup_point;
                const No_of_Members = req.body.No_of_Members;
                const Date= req.body.Date;
                const Mode_of_payment= req.body.Mode_of_payment;
                const Cost= req.body.Cost;
                const Coupons= req.body.Coupons;
                const totalcost=(No_of_Members*Cost);
                const discount=((No_of_Members*Cost)*Coupons);
                const finalcost=(totalcost-discount)
                var sql = "INSERT INTO destination(Dest_name,Trek_Distance,Pickup_point,email_id)VALUES(?,?,?,?); INSERT INTO booking(No_of_Members,Date,email_id)VALUES(?,?,?); INSERT INTO payment(Mode_of_payment,Cost,Coupons,email_id)VALUES(?,?,?,?)";
                con.query(sql, [Dest_name1, Trek_Distance, Pickup_point, email_id, No_of_Members, Date, email_id, Mode_of_payment, finalcost, Coupons, email_id], function(err,result){
                    if(err){
                        throw(err);
                        //res.redirect("/login");
                        //alert("Please login for Booking your trek!")
                    }
                    else{
                          email_id = '';
                          password = '';
                        alert("Booking Completed!!")
                        res.redirect("/index2");
                    }
                }) 
            });

            app.post('/wayanad',(req,res)=>{
                if(!email_id) {
                    res.redirect("/login");
                    alert("Please login for Booking your trek!")
                    return;
                }
                console.log(req.body);
                const Dest_name1 = req.body.Dest_name;
                const Trek_Distance= req.body.Trek_Distance;
                const Pickup_point = req.body.Pickup_point;
                const No_of_Members = req.body.No_of_Members;
                const Date= req.body.Date;
                const Mode_of_payment= req.body.Mode_of_payment;
                const Cost= req.body.Cost;
                const Coupons= req.body.Coupons;
                const totalcost=(No_of_Members*Cost);
                const discount=((No_of_Members*Cost)*Coupons);
                const finalcost=(totalcost-discount)
                var sql = "INSERT INTO destination(Dest_name,Trek_Distance,Pickup_point,email_id)VALUES(?,?,?,?); INSERT INTO booking(No_of_Members,Date,email_id)VALUES(?,?,?); INSERT INTO payment(Mode_of_payment,Cost,Coupons,email_id)VALUES(?,?,?,?)";
                con.query(sql, [Dest_name1, Trek_Distance, Pickup_point, email_id, No_of_Members, Date, email_id, Mode_of_payment, finalcost, Coupons, email_id], function(err,result){
                    if(err){
                        throw(err);
                        //res.redirect("/login");
                        //alert("Please login for Booking your trek!")
                    }
                    else{
                          email_id = '';
                          password = '';
                        alert("Booking Completed!!")
                        res.redirect("/index2");
                    }
                }) 
            });

            app.post('/kumta',(req,res)=>{
                if(!email_id) {
                    res.redirect("/login");
                    alert("Please login for Booking your trek!")
                    return;
                }
                console.log(req.body);
                const Dest_name1 = req.body.Dest_name;
                const Trek_Distance= req.body.Trek_Distance;
                const Pickup_point = req.body.Pickup_point;
                const No_of_Members = req.body.No_of_Members;
                const Date= req.body.Date;
                const Mode_of_payment= req.body.Mode_of_payment;
                const Cost= req.body.Cost;
                const Coupons= req.body.Coupons;
                const totalcost=(No_of_Members*Cost);
                const discount=((No_of_Members*Cost)*Coupons);
                const finalcost=(totalcost-discount)
                var sql = "INSERT INTO destination(Dest_name,Trek_Distance,Pickup_point,email_id)VALUES(?,?,?,?); INSERT INTO booking(No_of_Members,Date,email_id)VALUES(?,?,?); INSERT INTO payment(Mode_of_payment,Cost,Coupons,email_id)VALUES(?,?,?,?)";
                con.query(sql, [Dest_name1, Trek_Distance, Pickup_point, email_id, No_of_Members, Date, email_id, Mode_of_payment, finalcost, Coupons, email_id], function(err,result){
                    if(err){
                        throw(err);
                        //res.redirect("/login");
                        //alert("Please login for Booking your trek!")
                    }
                    else{
                          email_id = '';
                          password = '';
                        alert("Booking Completed!!")
                        res.redirect("/index2");
                    }
                }) 
            });





                                    app.get('/bookings',(req,res)=>{
                                        res.render('bookings');
                                        })
                                
                                    app.post("/bookings",function(req,res){
                                        console.log(req.body);
                                        const email_id = req.body.email_id;
                                        var sql = "select Booking_id,Date,No_of_Members from booking where email_id = '"+email_id+"'";
                                        con.query(sql,function(err,result){
                                            if(err){console.log(err)};
                                            res.render("./display",{o:result});
                                        })
                                    })  //bookings
                                app.get('/display',(req,res)=>{
                                    res.render('display');
                                    })




.listen(port, () => console.log(`Server listening on port ${port}`));