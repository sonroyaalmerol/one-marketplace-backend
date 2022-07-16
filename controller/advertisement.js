let AddModel = require('../models/advertisement');

module.exports.AddList = function(req,re,next)
{
    AddModel.find((err, AddList) => 
    {
        if(err)
        {
            return console.error(err);
        }

        else
        {
            console.log(AddList);
            res.render('advertisement/list',
            {
                title : 'Advertisement',
                AddList : AddList
            })
        }
    });
}


//edit the advertisement for a product
module.exports.displayEditPage = (req, res, next) => {
    
    // ADD YOUR CODE HERE
    let id = req.params.id;

    AddModel.findById(id, (err,addToEdit) =>{

        if(err)
        {
            console.log(err);
            res.render(err);
        }
        else{
            //show edit page 
            res.render('addvertisement/add_edit', {
                title : 'Edit Advertisement', 
                Add : addToEdit
            })

        }

    });

}

//process the edit of advertisement
module.exports.processEditPage = (req, res, next) => {
    
    // ADD YOUR CODE HERE
    let id = req.params.id;

    let updatedItem = AddModel({
        _id : req.body.id ,
        title : req.body.title,
        location : req.body.location,
        price : req.body.price
    });

    console.log(updatedItem);

    AddModel.updateOne({_id :id},updatedItem, err =>{
        if(err)
        {
            console.log(err);
        }
        else 
        {
            res.redirect('/advertisement/list');
        }
    });

}

//adding new advertisement for product
module.exports.displayAddPage = (req, res, next) => {
    
    // ADD YOUR CODE HERE        
    
    let newAdd = AddModel();

    res.render('advertisement/add_edit', {
        title: 'Add new Advertisment of a Product',
        add : newAdd
    })          
}


//process the new advertisement added
module.exports.processAddPage = (req, res, next) => {

    // ADD YOUR CODE HERE
    let newAdd = AddModel({
        _id : req.body.id ,
        title : req.body.title,
        location : req.body.location,
        price : req.body.price
    });

    AddModel.create(newAdd, (err, add ) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            console.log(add);
            res.redirect('/advertisement/list');
        }
    });
}

//delete the advertisement

module.exports.performDelete = (req, res, next) => {
    
    // ADD YOUR CODE HERE
    let id = req.params.id;


    AddModel.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/advertisement/list');
        }
    });

}

//to view the advertisement
module.exports.details = (req, res, next) => {
    
    let id = req.params.id;

    AddModel.findById(id, (err, addToShow) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('advertisement/details', {
                title: 'Advertisement Product Details', 
                add: addToShow
                
            })
        }
    });
}
