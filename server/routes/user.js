const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer({ dest: 'uploads/' });

const {User, Student} = require("../models/User");
const {login, signup, sendotp, forgetPassword} = require("../controllers/Auth");
const {auth, isFaculty, isStudent, isAdmin} = require("../middlewares/auth");
const {getAllPerformanceForms, createPerformanceForm, pushPerformanceForm} = require("../controllers/formCreation");
const {addInfo} = require("../controllers/addInfo");
const {fillForm} = require("../controllers/fillForm");
const {sendPerformanceEmail} = require("../controllers/sendReport");
const {processExcelFile} = require("../controllers/processExcelFile");
const {allocateStudentsToFaculty} = require("../controllers/allocStuds");
const {getStudentsForFaculty} = require("../controllers/getTGgroup");

router.post("/login", login);
router.post("/signup", signup);
router.post("/sendotp",sendotp);
router.get("/getForms", getAllPerformanceForms);
router.post("/createform",auth, isFaculty, createPerformanceForm);
router.post("/fillform", auth, isFaculty, fillForm);
router.post("/forgetpassword",forgetPassword);
router.post("/infoForm", addInfo);
router.post("/sendreport", auth, isFaculty, sendPerformanceEmail);
router.post("/upload",auth, isFaculty, upload.single('file'), processExcelFile);
router.post("/allocstudents", isFaculty, allocateStudentsToFaculty);
router.get("/tggroup", isFaculty, getStudentsForFaculty);

router.get("/test",(req, res) => {
    res.json({
        success:true,
        message:'Welcome to the Protected route for TESTS',
    });
});

router.get("/faculty", auth, isFaculty, (req,res) => {
    res.json({
        success:true,
        message:'Welcome to the protected route for Faculty',
    });
});

router.get("/admin", auth, isAdmin, (req,res) => {
    res.json({
        success:true,
        message:'Welcome to the protected route for Admin',
    });
});

module.exports = router;