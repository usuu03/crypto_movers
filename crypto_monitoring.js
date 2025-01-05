require("dotenv").config();
const axios = require("axios");
const nodemailer = require("nodemailer");
const schedule = require("node-schedule");

// Filtering thresholds
const MIN_PRICE_CHANGE_PERCENT = 15;
const MIN_VOLUME_CHANGE = 1000000;

// Fetching cryptocurrency data
