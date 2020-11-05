const Menu = require("../../model/menu");

function homeController() {
  return {
    async index(req, res) {
      const menu = await Menu.find();
      res.render("home", { menu: menu });
      // Menu.find().then((coffee) =>{
      //     console.log(coffee)
      //     res.render('home', {coffee:coffee})
      // })
    },

    contact(req, res) {
      res.render("contact");
    },
  };
}

module.exports = homeController;
