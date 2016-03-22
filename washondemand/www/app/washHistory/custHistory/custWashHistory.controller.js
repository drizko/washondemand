angular.module('wod.custWashHistCtrl', []).controller('custWashHistCtrl', custWashHistCtrl);

function custWashHistCtrl(washHistFactory) {
  var vm = this;

  vm.history = [
    {
      provName: 'bob\'s wash service',
      provRating: '5 stars',
      price: 30,
      date: '3/20/16',
      washType: 'basic',
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
