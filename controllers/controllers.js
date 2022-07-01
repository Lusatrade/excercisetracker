const User = require("../models/userModel");
const Excercise = require("../models/excerciseModel");

/*
    POST /api/users
*/
const addUser = async (req, res) => {
  console.log(req.body);
  const { username } = req.body;

  try {
    // Check if user already exists

    const userExists = await User.findOne({ username });

    if (userExists) {
      throw new Error("User already exists");
    }

    const newUser = await User.create({ username });

    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

/*
    GET /api/users
*/
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ username: 1 });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

/*
    GET /api/users/:_id/excercises
*/
const getExcercisesByUserId = async (req, res) => {
  res.json("User by Id");
};

/*
    POST /api/users/:_id/excercises
*/
const addExcerciseByUserId = async (req, res) => {
  const _id = req.params.id;
  let { description, duration, date } = req.body;
  date = new Date(date) || new Date();
  try {
    const user = await User.findOne({ _id });

    if (!user) {
      throw new Error("User does not exist");
    }

    const exercise = await Excercise.create({
      username: user.username,
      description: description,
      duration: duration,
      date: date
        .toString()
        .match(/^([a-z]{3}\s[a-z]{3}\s[0-9]{2}\s[0-9]{4})/i)[0],
    });

    res.status(200).json(exercise);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/*
    GET /api/users/:id/logs
    params(optional)    from<date> to<date> limit<number>
*/
const getLogsByUserId = async (req, res) => {
  const id = req.params.id;
  let { from, to, limit } = req.query;
  limit = limit || 10000;
  let timeRange = "";
  
  try {
    // Find User
    const user = await User.findOne({ _id: id });

    if (!user) throw new Error("User does not exist");

    const result = {
      username: user.username,
      count: 0,
      logs: [],
    };

    let logs = await Excercise.find({
      username: user.username
    }).limit(limit);

    if (from && to) {
    from = new Date(from).getTime()
    to = new Date(to).getTime()
    logs = logs.reduce((a,b)=>{
        // if(!a.date)return a
        if(new Date(b.date).getTime() >= from && new Date(b.date).getTime() <= to) {
            a.push(b)
        }
        console.log(a)
        return a
    },[])
    
  }
    result.count = logs.length;

    result.logs = logs;

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addUser,
  getAllUsers,
  getExcercisesByUserId,
  addExcerciseByUserId,
  getLogsByUserId,
};