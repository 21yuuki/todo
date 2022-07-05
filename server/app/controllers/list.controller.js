const db = require("../models");
const List = db.list;
const Op = db.Sequelize.Op;

// Create
exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({message: "Description cannot be empty!"});
        return;
    }

    const file = req.files.file;

    file.mv(`../client/public/uploads/${file.name}`, err => {
        if(err) console.error(err);
    });

    const list = {
        name: req.body.name,
        image: file.name
    }

    List.create(list)
    .then(data => res.status(data))
    .catch(err => res.status(500).send({message: err.message || "An error occured when creating a to do item."}));
};

// View All
exports.findAll = (req, res) => {
    const name = req.query.name;
    let condition = name ? {name: {[Op.like]: `%${name}%`}} : null;
    
    List.findAll({where: condition})
    .then(data => res.send(data))
    .catch(err => res.status(500).send({message: err.message || "An error occured while retrieving data."}));
};

// View One
exports.findOne = (req, res) => {
    const id = req.params.id;

    List.findByPk(id)
    .then(data => {
        if(data) res.send(data);
        else res.status(404).send({message: `Cannot find to do item with the id: ${id}.`});
    })
    .catch(err => 
        res.status(500).send({message: err.message || `An error occured while retrieving to do item with the id: ${id}.`})
    );
};

// Update
exports.update = (req, res) => {
    const id = req.params.id;
    const file = req.files.file;

    file.mv(`../client/public/uploads/${file.name}`, err => {
        if(err) console.error(err);
    });

    const list = {
        name: req.body.name,
        image: file.name
    }

    List.update(list, {where: {id:id}})
    .then(num => {
        if(num == 1) res.send({message: "List item successfully updated!"});
        else res.send({message: `Cannot update list item with the id: ${id}. The list item may not exist.`});
    })
    .catch(err => 
        res.status(500).send({message: err.message || `An error occured while updating list item with the id: ${id}.`})
    );
};

// Delete All
exports.deleteAll = (req, res) => {
    List.destroy({where: {}, truncate: false})
    .then(num => res.send({message: `${num} list items were successfully deleted!`}))
    .catch(err => res.send({message: "An error occured while deleting all the list items."}));
};

// Delete One
exports.delete = (req, res) => {
    const id = req.params.id;

    List.destroy({where: {id:id}})
    .then(num => {
        if(num == 1) res.send({message: "List item was deleted successfully!"});
        else res.status(500).send({message: `Cannot delete list item with the id: ${id}. The list item may not exist.`});
    })
    .catch(err => 
        req.status(500).send({message: `An error occured while deleting the list item with the id: ${id}.`})
    );
};