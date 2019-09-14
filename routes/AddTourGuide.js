const express = require("express");
const router = express.Router();
const TourGuide = require("../sequelize").TourGuide;

router.get('/tour_guides', (req , res , next) => {
    TourGuide.findAll().then(tourguides =>{
        res.send(tourguides);
    }).catch(err => {
        res.send('error');
    }); 
});

router.post('/tour_guide', (req , res , next) => {
    const guideData = new TourGuide({
        name : req.body.name,
        nationality : req.body.nationality,
        passport_number : req.body.passport_number,
        national_id : req.body.national_id,
        fees : req.body.fees,
        licence_number : req.body.licence_number,
        phone : req.body.phone
    })
    guideData.save().then(() =>{
        res.send('New Tour Guide Saved Successfully');
    }).catch(err=>{
        res.send(err)
    })  
});

router.get('/:id' , (req , res ,next) => {
    TourGuide.findAll(req.params.id, function (err, tour_guide){
        if(!err){
            res.send(tour_guide);
        }
        else{
            res.send(err);
        }
        
    });
})

router.put('/:id', (req , res , next) => {
    TourGuide.update({ id: req.params.id }, { 
        $set: { 
            name : req.body.name,
            nationality : req.body.nationality,
            passport_number : req.body.passport_number,
            national_id : req.body.national_id,
            fees : req.body.fees,
            licence_number : req.body.licence_number,
            phone : req.body.phone
        } 
    }, (err) => {
        if (!err) 
            res.send('Tour Guide updated Successfully');
        else
            res.send('err');
   });
});

router.delete('/:id' , (req , res , next) => {
    TourGuide.destroy({ id: req.params.id }.then(() =>{
        res.send('Tour Guide deleted Successfully');
    }).catch(err=>{
        res.send(err)
    }));
});

module.exports = router;
