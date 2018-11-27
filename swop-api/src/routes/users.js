import Express from "express";
import User from "../model/user";
import UserDetails from "../model/userDetails";
import bcrypt from "bcrypt";
import parseErrors from "../utils/errorParser";
import fetch from "node-fetch";
import authenticate from "../middlewares/authenticate";

const router = Express.Router();

router.post("/", (req, res) => {
  const { email, password } = req.body.userData;
  const user = new User({
    email
  });
  user.setPassword(password);
  user
    .save()
    .then(userRecord => res.json({ user: userRecord.toAuthJSON() }))
    .catch(err =>
      res.status(400).json({
        errors: parseErrors(err.errors)
      })
    );
});

router.use(authenticate);
router.post("/details", (req, res) => {
  const { firstName, lastName, address } = req.body.details;
  console.log(req.currentUser._id);
  UserDetails.findOne({ userId: req.currentUser._id }).then(userDetails => {
    if (userDetails) {
      (userDetails.firstName = firstName),
        (userDetails.lastName = lastName),
        (userDetails.address = address);
      userDetails
        .save()
        .then(userDetailsRecord => {
          res.json({ userDetails: userDetailsRecord });
          console.log(userDetails.country + " or " + country);
        })
        .catch(err =>
          res
            .status(400)
            .json({ errors: { global: "Error creating user details" } })
        );
    } else {
      console.log(req.body);
      UserDetails.create({
        ...req.body.details,
        userId: req.currentUser._id
      })
        .then(userDetailsRecord => {
          console.log(userDetailsRecord);
          res.json({ userDetails: userDetailsRecord });
        })
        .catch(err => {
          res
            .status(400)
            .json({ errors: { global: "Error creating user details" } });
        });
    }
  });
});

router.get("/fetch", (req, res) => {
  UserDetails.findOne({ userId: req.currentUser._id }).then(
    userDetailsRecord => {
      if (userDetailsRecord) {
        res.json({
          userDetails: userDetailsRecord
        });
      } else {
        res.json({ userDetails: {} });
        console.log("Did not find any user details");
      }
    }
  );
});

export default router;
