(
  function(){
    angular
    .module("multiSigWeb")
    .controller("addOwnerCtrl", function($scope, Wallet, Utils, Transaction, wallet, $uibModalInstance){
      $scope.send = function () {
        Wallet.addOwner(wallet.address, $scope.owner, function(e, tx){
          if(e){
            Utils.dangerAlert(e);
          }
          else{
            // Update owners array
            Wallet.updateWallet(wallet);
            Utils.notification("Transaction sent, will be mined in next 20s");
            Transaction.add({txHash: tx, callback: function(){
              Utils.success("Add owner transaction mined, might require more wallet owner's confirmations");
            }});
            $uibModalInstance.close();
          }
        });
      };

      $scope.sign = function(){
        Wallet.addOwnerOffline(wallet.address, $scope.owner, function(e, tx){
          if(e){
            Utils.dangerAlert(e);
          }
          else{
            $uibModalInstance.close();
            Utils.signed(tx);
          }
        });
      }

      $scope.cancel = function () {
        $uibModalInstance.dismiss();
      };

    });
  }
)();
