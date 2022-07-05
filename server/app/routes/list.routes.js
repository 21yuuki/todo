module.exports = app => {
    const list = require("../controllers/list.controller.js");
    let router = require("express").Router();
  
    // Create
    router.post("/", list.create);

    // View All
    router.get("/", list.findAll);

    // View One
    router.get("/:id", list.findOne);

    // Update
    router.put("/:id", list.update);

    // Delete All
    router.delete("/", list.deleteAll);

    // Delete One
    router.delete("/:id", list.delete);

    app.use("/api/list", router);
};