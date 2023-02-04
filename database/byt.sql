CREATE DATABASE BYT;
USE BYT;

CREATE TABLE LOGIN(
email_id varchar(30) PRIMARY KEY,
User_name varchar(20) NOT NULL,
Password varchar(20) NOT NULL );


CREATE TABLE USER(
First_name varchar(20) NOT NULL,
Last_name varchar(20) NOT NULL,
User_id int,
email_id varchar(20) NOT NULL,
Address varchar(50),
Phone_no varchar(10),
Booking_id int,
PRIMARY KEY(User_id,Phone_no) );


CREATE TABLE BOOKING(
Booking_id int PRIMARY KEY,
Date date,
No_of_Members int,
User_id int,
FOREIGN KEY(User_id) REFERENCES USER(User_id) );

ALTER TABLE USER ADD CONSTRAINT FOREIGN KEY(Booking_id) REFERENCES BOOKING(Booking_id) ON UPDATE CASCADE;


CREATE TABLE DESTINATION(
Dest_name varchar(20),
Dest_id int PRIMARY KEY,
Trek_Distance int,
Pickup_point varchar(20) );


CREATE TABLE SELECTIONS(
Booking_id int,
Dest_id int,
FOREIGN KEY(Booking_id) REFERENCES BOOKING(Booking_id),
FOREIGN KEY(Dest_id) REFERENCES DESTINATION(Dest_id) );  



CREATE TABLE PAYMENT(
Mode_of_payment varchar(20),
Cost int,
Coupons varchar(20),
User_id int,
FOREIGN KEY(User_id) REFERENCES USER(User_id) );



CREATE TABLE REVIEWS(
Ratings int,
Feedback varchar(50),
Suggestions varchar(50),
User_id int,
Dest_name varchar(30),
FOREIGN KEY(User_id) REFERENCES USER(User_id) );

CREATE TABLE SIGNUP(
First_name varchar(20) NOT NULL,
Last_name varchar(20) NOT NULL,
Username varchar(20),
email_id varchar(20) NOT NULL,
Address varchar(50),
Phone varchar(10));



