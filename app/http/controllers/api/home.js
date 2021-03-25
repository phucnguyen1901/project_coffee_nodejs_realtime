const Menu = require("../../../model/menu");

function apiHome() {
  return {
    async home(req, res) {
        try{
            const menu = await Menu.find();
            res.json(menu);
        }catch(e){
            console.log(e);
        }
    },

  };
}

module.exports = apiHome;