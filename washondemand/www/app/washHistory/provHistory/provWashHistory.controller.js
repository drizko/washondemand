angular.module('wod.provWashHistCtrl', []).controller('provWashHistCtrl', provWashHistCtrl);

function provWashHistCtrl(washHistFactory) {
  var vm = this;

  vm.history = [
    {
      custName: 'Kasra Jahani',
      custRating: '0 stars',
      price: 100,
      date: '4/2/1882',
      washType: 'custom',
      vehicleType: 'car',
      options: [
        {
          info: 'balsamic vinegar',
          price: 5
        },
        {
          info: 'extra virgin olive oil',
          price: 5
        }
      ]
    }
  ];

  vm.toggleExpand = function(wash) {
    wash.expanded = !wash.expanded;
  };

  var init = function() {
    washHistFactory.getHistory()
    .then(function(history) {
      console.log(history);
      // vm.history = history; // uncomment this when linked with back end
    });
  };
  init();
};
