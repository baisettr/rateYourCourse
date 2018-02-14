const express = require('express');
router = express.Router();

var courses = require('../views/courses.json');
var Review = require('../schema/review');


router.get('/', function (req, res, next) {
    var courseId = req.query.courseId;
    var deptId = req.query.deptId;
    res.render('review.pug', { deptId: deptId, courseId: courseId });
});

router.get('/reviews', function (req, res, next) {
    Review.find({ courseId: req.query.courseId })
        .then((courseReviews) => {
            //console.log(courseReviews);
            res.send(JSON.stringify(courseReviews));
        });
});


router.post('/addReview', function (req, res, next) {
    console.log(req.body);
    var review = new Review({ courseId: req.body.courseId, courseTerm: req.body.courseTerm, coursePros: req.body.coursePros, courseCons: req.body.courseCons, courseLinks: req.body.courseLinks, courseTips: req.body.courseTips, courseFeedback: req.body.courseFeedback, courseRating: req.body.courseRating, courseOverall: req.body.courseOverall });
    console.log(review);
    review.save()
        .then(() => {
            console.log("save");
            //res.render('course.pug', { deptId: req.body.crsId.match('[a-zA-Z]*')[0] });
            res.redirect('/univ/dept');
            //res.json({ 'a': 1 });
        });
});

module.exports = router;